import router from '@/router';
import Vue from 'vue';
// import { qiankunActions } from '@/qiankun/actions';

function initState () {
    return {
        // token
        token: sessionStorage.getItem('token') || '',
        // 用户信息
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},
        // 用户可访问微应用信息
        userMicroApps: JSON.parse(sessionStorage.getItem('userMicroApps')) || [],
        // 当前选中的微应用
        currentMicroApp: null,
        // 当前已经打开的页签列表
        currentTabsList: [],
        // 当前选中的页签
        currentTab: {
            // 默认是home页
            resourceId: 'HOME'
        }
    };
}

const state = initState(),
    mutations = {
        /**
         * @description 清除所有数据
         * @return {void}
         * @example
         * this.$store.commit('common/clearAllStore')
         */
        clearAllStore (state) {
            sessionStorage.clear();
            const initStateObj = initState();
            for (let initStateObjKey in initStateObj) {
                state[initStateObjKey] = initStateObj[initStateObjKey];
            }
            // qiankunActions.setGlobalState({
            //     eventFrom: '',
            //     token: '',
            //     userInfo: {}
            // })
        },
        /**
         * @description 用户登录成功后保存用户信息及token
         * @return {void}
         * @example
         * this.$store.commit('common/setLogin', {
         *  userName: '张三',
         *  deptName: '国网河南省电力公司',
         *  deptNo: '41101',
         *  token: 'bearer yJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJXXXXXXXX'
         *  })
         */
        setLogin (state, payload) {
            sessionStorage.setItem('token', payload.token);
            sessionStorage.setItem('userInfo', JSON.stringify(payload));
            state.token = payload.token;
            state.userInfo = payload;
            // qiankunActions.setGlobalState({
            //     eventFrom: 'main',
            //     token: payload.token,
            //     userInfo: payload
            // })
        },
        /**
         * @description 保存用户可访问微应用信息
         * @return {void}
         * @example
         * this.$store.commit('common/setUserMicroApps', [])
         */
        setUserMicroApps (state, payload) {
            if (Array.isArray(payload)) {
                sessionStorage.setItem('userMicroApps', JSON.stringify(payload));
                state.userMicroApps = payload;
            }
        },
        /**
         * @description 设置当前选中的微应用
         * @return {void}
         * @example
         * this.$store.commit('common/setCurrentMicroApp')
         */
        setCurrentMicroApp (state, payload) {
            if (payload && state.currentMicroApp && payload.microAppId === state.currentMicroApp.microAppId) {
                return;
            }
            // 传 null 时判断当前是否打开了微应用，如果没有打开高亮第一个微应用
            if (!payload && !state.currentTabsList.length) {
                state.currentMicroApp = state.userMicroApps[0];
                return;
            }
            if (payload) {
                state.currentMicroApp = payload;
                // // 切换微应用时清空tabs
                // state.currentTabsList = [];
            }
        },
        /**
         * @description 监听到路由发生改变时调用，传入当前路由匹配到的菜单数据
         * @return {void}
         * @example
         * this.$store.commit('common/addCurrentTab', {})
         */
        addCurrentTab (state, payload) {
            const { resourceId, query } = payload;
            let obj = state.currentTabsList.find((i) => i.resourceId === resourceId)
            if (!obj) {
                state.currentTabsList.push(payload);
            } else {
                // 如果当前已经打开了该页签，则更新query
                obj.query = query
            }
            // 新打开页签时，如果打开的页面不是当前微应用，则切换高亮的微应用
            let currentMicroApp = state.userMicroApps.find((i) => i.menus.find((j) => j.resourceId === payload.resourceId)
            );
            if (
                currentMicroApp &&
                (!state.currentMicroApp ||
                    (currentMicroApp && currentMicroApp.microAppId !== state.currentMicroApp.microAppId))
            ) {
                // state.currentTabsList = [payload];
                state.currentMicroApp = currentMicroApp;
            }
            state.currentTab = payload;
        },
        setCurrentTabsList (state, payload) {
            state.currentTabsList = payload;
        },
        /**
         * @description 设置当前打开的页签，传入当前页签匹配到的菜单数据
         * @return {void}
         * @example
         * this.$store.commit('common/setCurrentTab', {})
         */
        setCurrentTab (state, payload) {
            state.currentTab = payload;
        },
        /**
         * @description 关闭一个或多个页签
         * @return {void}
         * @example
         * this.$store.commit('common/removeCurrentTab', {removeType:1})
         * this.$store.commit('common/removeCurrentTab', {removeType:4, resourceId: '123'})
         * 1 关闭当前
         * 2 关闭其他标签
         * 3 关闭所有
         * 4 关闭一个（不确定哪一个）
         */
        removeCurrentTabs (state, payload) {
            /**
             * @description 关闭一个tab后判断跳转到哪一个tab
             * @param removeIndex {number} 被关闭的tab的索引
             * @return {void}
             */
            function jumpNextTab (removeIndex) {
                if (state.currentTabsList.length > 0) {
                    if (removeIndex === 0) {
                        state.currentTab = state.currentTabsList[0];
                    } else {
                        state.currentTab = state.currentTabsList[removeIndex - 1];
                    }
                    router.push(state.currentTab.resourceUrl);
                } else {
                    state.currentTab = initState().currentTab;
                    router.push('/');
                }
            }

            /**
             * @description 根据resourceId查找对应的索引
             * @param resourceId {string} 菜单id
             * @return {number}
             */
            function getRemoveIndex (resourceId) {
                return state.currentTabsList.findIndex((i) => i.resourceId === resourceId);
            }

            const { removeType, resourceId } = payload;
            if (removeType === 1) {
                let removeIndex = getRemoveIndex(state.currentTab.resourceId);
                if (removeIndex > -1) {
                    state.currentTabsList.splice(removeIndex, 1);
                    state.currentTabsList = state.currentTabsList.slice(0);
                    jumpNextTab(removeIndex);
                }
            } else if (removeType === 2) {
                // 仅保留当前页签
                let saveIndex = getRemoveIndex(state.currentTab.resourceId);
                if (saveIndex > -1) {
                    state.currentTabsList = [state.currentTabsList[saveIndex]];
                }
            } else if (removeType === 3) {
                state.currentTabsList = [];
                state.currentTab = initState().currentTab;
                router.push('/');
            } else if (removeType === 4) {
                let removeIndex = getRemoveIndex(resourceId);
                if (removeIndex > -1) {
                    let removeTabObj = state.currentTabsList.splice(removeIndex, 1);
                    state.currentTabsList = state.currentTabsList.slice(0);
                    // 如果删除的页签是当前的页签，设置一下需要高亮的页签
                    if (removeTabObj[0].resourceId === state.currentTab.resourceId) {
                        jumpNextTab(removeIndex);
                    }
                }
            }
        },
        /**
         * @description 点击去home页的图标
         * @return {void}
         * @example
         * this.$store.commit('common/goHome')
         */
        goHome (state) {
            state.currentTab = initState().currentTab;
            router.push('/');
        }
    },
    actions = {
        /**
         * @description 退出登录
         * @return {void}
         * @example
         * this.$store.dispatch('common/logout')
         */
        logout ({ commit }) {
            router
                .replace({
                    name: 'Login'
                })
                .then(() => {
                    Vue.nextTick(() => {
                        location.reload();
                    });
                });
        },
        /**
         * @description 清除所有数据
         * @return {void}
         * @example
         * this.$store.dispatch('common/clearAllStore')
         */
        clearAllStore ({ commit }) {
            commit('clearAllStore');
        },
        /**
         * @description 用户登录成功后保存用户信息及token
         * @return {void}
         * @example
         * this.$store.dispatch('common/setLogin', {
         *  userName: '张三',
         *  deptName: '国网河南省电力公司',
         *  deptNo: '41101',
         *  token: 'bearer yJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJXXXXXXXX'
         *  })
         */
        setLogin ({ commit }, payload) {
            commit('setLogin', payload);
        },
        /**
         * @description 保存用户可访问微应用信息
         * @return {void}
         * @example
         * this.$store.dispatch('common/setMenus', [])
         */
        setUserMicroApps ({ commit }, payload) {
            commit('setUserMicroApps', payload);
        },
        /**
         * @description 设置当前选中的微应用
         * @return {void}
         * @example
         * this.$store.dispatch('common/setCurrentMicroApp')
         */
        setCurrentMicroApp ({ commit }, payload) {
            commit('setCurrentMicroApp', payload);
        },
        /**
         * @description 监听到路由发生改变时调用,传入当前路由匹配到的菜单数据
         * @return {void}
         * @example
         * this.$store.dispatch('common/addCurrentTab', {})
         */
        addCurrentTab ({ commit }, payload) {
            commit('addCurrentTab', payload);
        },
        /**
         * @description 设置当前打开的页签，传入当前页签匹配到的菜单数据
         * @return {void}
         * @example
         * this.$store.dispatch('common/setCurrentTab', {})
         */
        setCurrentTab ({ commit }, payload) {
            commit('setCurrentTab', payload);
        },
        /**
         * @description 关闭一个或多个页签
         * @return {void}
         * @example
         * this.$store.dispatch('common/removeCurrentTab', {removeType:1})
         * this.$store.dispatch('common/removeCurrentTab', {removeType:4, resourceId: '123'})
         * 1 关闭当前
         * 2 关闭其他标签
         * 3 关闭所有
         * 4 关闭一个（不确定哪一个）
         */
        removeCurrentTabs ({ commit }, payload) {
            commit('removeCurrentTabs', payload);
        },
        /**
         * @description 点击去home页的图标
         * @return {void}
         * @example
         * this.$store.dispatch('common/goHome')
         */
        goHome ({ commit }) {
            commit('goHome');
        }
    },
    getters = {
        /**
         * @description 获取token
         * @return {string}
         * @example
         *  this.$store.getters['common/getToken']
         *  // => 'bearer yJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJXXXXXXXX'
         */
        getToken (state) {
            return state.token;
        },
        /**
         * @description 获取用户信息
         * @param state
         * @return {object}
         * @example
         * this.$store.getters['common/getUserInfo']
         */
        getUserInfo (state) {
            return state.userInfo;
        },
        /**
         * @description 获取用户可访问微应用信息
         * @return {array}
         * @example
         * this.$store.getters['common/getUserMicroApps']
         */
        getUserMicroApps (state) {
            return state.userMicroApps;
        },
        /**
         * @description 获取当前选中的微应用
         * @return {object}
         * @example
         * this.$store.getters['common/getCurrentMicroApp']
         */
        getCurrentMicroApp (state) {
            return state.currentMicroApp;
        },
        /**
         * @description 获取当前选中的微应用的菜单
         * @return {object}
         * @example
         * this.$store.getters['common/getCurrentMicroAppMenus']
         */
        getCurrentMicroAppMenus (state) {
            return state.currentMicroApp ? state.currentMicroApp.menus : [];
        },
        /**
         * @description 获取用户所有微应用的菜单
         * @return {object}
         * @example
         * this.$store.getters['common/getUserAllMicroAppMenus']
         */
        getUserAllMicroAppMenus (state) {
            let menus = [];
            state.userMicroApps.map((i) => {
                menus.push(...i.menus);
            });
            return menus;
        },
        /**
         * @description 获取当前打开的页签列表
         * @return {array}
         * @example
         * this.$store.getters['common/getCurrentTabsList']
         */
        getCurrentTabsList (state) {
            return state.currentTabsList;
        },
        /**
         * @description 获取当前打开的页签
         * @return {object}
         * @example
         * this.$store.getters['common/getCurrentTab']
         */
        getCurrentTab (state) {
            return state.currentTab;
        },
        /**
         * @description 获取当前选中的微应用的打开的tabs列表
         * @return {object}
         * @example
         * this.$store.getters['common/getCurrentMicroAppTabs']
         */
        getCurrentMicroAppTabs (state) {
            return state.currentMicroApp
                ? state.currentTabsList.filter((item) => item.resourceUrl.startsWith('/' + state.currentMicroApp.microAppBaseRoute + '/')
                )
                : [];
        },
        /**
         * @description 获取当前打开的页签的菜单name 用于keep-alive
         * @return {array}
         * @example
         * this.$store.getters['common/getCachePages']
         */
        getCachePages (state) {
            return state.currentTabsList.map((item) => item.componentName);
        }
    };

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};
