## 基座配置说明文档

#### 一. 说明

> 默认阅读本文档的前端开发人员掌握按照 《前端 vue 项目构建流程指导规范》搭建 vue 项目的能力，搭建过程省略，详细步骤请阅读对应文档。
> 
> 文档描述的配置，模板中已经配置完成，只需根据实际情况修改 mock 等配置即可。

#### 二. 配置

##### 1. 安装依赖

```
// 安装qiankun
npm install qiankun -s
// 安装mockjs
npm install mockjs
```

##### 2. 固定本地开发时项目运行端口（可选）、配置代理（必选）

```js
module.exports = defineConfig({
    devServer: {
        port: 9080,
        proxy: {
            // 代理本地开发时子应用运行地址
            '/child/heaven-sub-app1': {
                target: 'http://localhost:9081',
                changeOrigin: true
            },
            '/child/heaven-sub-app2': {
                target: 'http://localhost:9082',
                changeOrigin: true
            }
        }
    }
});
```

> 固定基座和微应用的端口可以避免后续频繁修改 mock 数据

##### 3. 配置 mock 数据

基座应用需要模拟两个接口，用于获取用户信息和用户可访问的微应用资源

```js
// login 接口
{
    data: {
        'operName': '@cname',
        'operId': '@uuid',
        'orgNo': '41101',
        'orgName': '国网河南省电力公司',
        'deptNo': '0000005403',
        'deptName': '',
        'token': '@uuid'
    },
    code: 200
}

// getMicroApps 接口
{
    "data": [
        {
            "microAppId": "heaven-sub-app1",
            "microAppName": "微应用1",
            "microAppEntry": "/child/heaven-sub-app1/",
            "microAppBaseRoute": "heaven-sub-app1",
            "menus": [
                {
                    "resourceName": "微应用1-菜单组A",
                    "resourceUrl": "/heaven-sub-app1/example-a",
                    "componentName": "App1ExampleA",
                    "resourceIcon": "el-icon-s-order",
                    "resourceId": "/heaven-sub-app1/example-a",
                    "pResourceId": ""
                },
                ...
            ]
        }
        ...
    ],
    code: 200
}
```

##### 4. 配置 Vuex

在 `store/modules`目录中新建`common.js` 。`state` 中存储以下数据

```js
function initState() {
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

const state = initState();
```

`mutations` `actions` `getters` 部分代码省略

##### 5. 配置 qiankun

在`qiankun/index.js`中导出 `registerApps`方法，用于注册、启动微应用。

```js
import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from 'qiankun';
import Vue from 'vue';

const microHandler = {
    beforeLoad: [
        (app) => {
            console.log('%c before load', 'background:#3a5ab0 ; padding: 1px; border-radius: 3px;  color: #fff', app);
        }
    ], // 预加载
    beforeMount: [
        (app) => {
            console.log('%c before mount', 'background:#7d9553 ; padding: 1px; border-radius: 3px;  color: #fff', app);
        }
    ], // 挂载前回调
    afterMount: [
        (app) => {
            console.log('%c after mount', 'background:#7d7453 ; padding: 1px; border-radius: 3px;  color: #fff', app);
        }
    ], // 挂载后回调
    beforeUnmount: [
        (app) => {
            console.log(
                '%c before unmount',
                'background:#7dd253 ; padding: 1px; border-radius: 3px;  color: #fff',
                app
            );
        }
    ], // 卸载前回调
    afterUnmount: [
        (app) => {
            console.log('%c after unmount', 'background:#d2525c ; padding: 1px; border-radius: 3px;  color: #fff', app);
        }
    ] // 卸载后回调
};

addGlobalUncaughtErrorHandler((event) => {
    Vue.prototype.$loading({}).close();
    const { message } = event;
    if (message && message.includes('died in status')) {
        Vue.prototype.$loading({}).close();
        Vue.prototype.$notify({
            title: '微应用触发异常',
            message: event.message,
            type: 'error'
        });
    }
});

// 微应用注册并启动
export const registerApps = (apps) => {
    registerMicroApps(apps, microHandler);
    start({
        // 是否开启预加载
        prefetch: 'none'
    });
};
```

在`qiankun/actions.js`中导出 `qiankunActions`和`qiankunEventBus`用于基座与微应用间进行通讯

```js
import Vue from 'vue';
import { initGlobalState } from 'qiankun';

export const qiankunActions = initGlobalState({
    // 事件触发来源
    eventFrom: '',
    // 事件的标识
    eventCode: '',
    // 事件传递的参数
    eventData: {}
});

export const qiankunEventBus = new Vue();
```

##### 6. 配置路由

修改`router/routes.js`

由于我们的微应用都是在 index.vue 中挂载的，所以我们需要添加以下的路由地址

```js
{
    path: '/*',
    component: () => import('@/views/index.vue')
}
```

`router/index.js`

我们需要在这里使用路由守卫，判断要前往的页面用户是否有访问权限。

```js
...

const beforeEach = function (to, from, next) {
    if (['Login'].includes(to.name)) {
        next();
    } else {
        if (store.state.common.token) {
            if (['Login', 'Index', 'Welcome', 'NotFound'].includes(to.name)) {
                next();
            } else {
                const allMenus = store.getters['common/getUserAllMicroAppMenus'];
                let hasPermission = allMenus.find((i) => i.resourceUrl === to.path);
                // 如果跳转的路由有权限那么添加到tabs列表里面
                if (hasPermission) {
                    next();
                    // eslint-disable-next-line max-depth
                    if (!hasPermission.resourceIsHidden){
                        store.dispatch('common/addCurrentTab', { ...hasPermission, query: to.query});
                    }
                } else {
                    next({ name: 'NotFound' });
                    // next()
                }
            }
        } else {
            next({ name: 'Login', replace: true });
        }
    }
};

router.beforeEach((to, from, next) => {
    beforeEach(to, from, next);
});

...
```

##### 7. 配置 login.vue

在登录成功后保存用户信息和用户可访问的微应用资源到 vuex 中

```js
submit(){
    login(this.form).then((res) => {
        if (res.data.code === 200) {
            // 保存用户信息
            this.setLogin(res.data.data);
            this.getMicroApps();
        }
    });
},
getMicroApps () {
    getMicroApps().then((res) => {
        if (res.data.code === 200) {
            // 保存用户可访问的微应用资源并跳转到首页
            this.setUserMicroApps(res.data.data.filter((i) => i.menus.length));
            this.$router.replace('/');
        }
    });
}
```

##### 8. 配置 index.vue

```vue
<template>
    ...
    <!-- 循环 userMicroApps 展示当前可访问的微应用的名字 -->
    <el-button
        v-for="(item, index) in userMicroApps"
        :key="index"
        type="text"
        :class="{
            'micro-app-list-item-active': currentMicroApp && currentMicroApp.microAppId === item.microAppId
        }"
        class="micro-app-list-item"
        @click="setCurrentMicroApp({ ...item, notClearTabs: true })"
    >
        <span>{{ item.microAppName }}</span>
    </el-button>

    ...
    <!-- 将当前高亮的微应用的菜单列表 currentMicroAppMenus 传给左侧菜单组件，用于展示当前微应用的菜单 -->
    <aside-menu :menus="currentMicroAppMenus" :is-collapse="isCollapse"></aside-menu>

    ...
    <!-- 判断当前页面路由的name是否是基座应用，如果不是则展示一个空div用于挂载微应用 -->
    <div v-show="!mainAppRoutes.includes($route.name)" id="main-app-micro-container-box"></div>
    <router-view v-show="mainAppRoutes.includes($route.name)"></router-view>

    ...
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { registerApps } from '@/qiankun/index.js';
import { qiankunActions, qiankunEventBus } from '@/qiankun/actions';
import qiankunCommonStore from '@/store/modules/common';

export default {
    data () {
        return {
            // 主应用的路由
            mainAppRoutes: ['Login', 'Index', 'Welcome', 'NotFound'],
            // 左侧菜单是否折叠
            isCollapse: false,
        };
    },
    computed: {
        ...mapGetters('common', {
            // 获取用户信息
            userInfo: 'getUserInfo',
            // 获取用户可访问的微应用信息
            userMicroApps: 'getUserMicroApps',
            // 获取用户当前选中的微应用
            currentMicroApp: 'getCurrentMicroApp',
            // 获取用户当前选中的微应用的菜单
            currentMicroAppMenus: 'getCurrentMicroAppMenus'
        })
    },
    mounted () {
        // 在mounted生命周期注册微应用，保证微应用挂载的容器已经渲染
        this.registerApps();
        // 启动 globalState 监听
        this.startGlobalStateListener();
        // 启动 eventBus 监听
        this.startEventBusListener();
    },
    beforeDestroy () {
        // 销毁事件监听
        qiankunActions.offGlobalStateChange();
        qiankunEventBus.$off();
    },
    methods () {
        ...mapActions('common', {
            // 设置当前打开的微应用
            setCurrentMicroApp: 'setCurrentMicroApp',
            // 退出登录
            logout: 'logout'
        }),
            // 注册微应用
        registerApps () {
            this.setCurrentMicroApp(null);
            // 确保容器存在
            this.$nextTick(() => {
                const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);
                let apps = this.userMicroApps.map((i) => {
                    return {
                        // 微应用的名称，微应用之间必须确保唯一
                        name: i.microAppId,
                        // 微应用的入口，指向入口html
                        entry: i.microAppEntry,
                        // 微应用激活规则
                        activeRule: getActiveRule('#/' + i.microAppBaseRoute),
                        // 微应用模的挂载节点
                        container: '#main-app-micro-container-box',
                        // 主应用需要传递给微应用的数据
                        props: {
                            qiankunEventBus,
                            qiankunCommonStore,
                            qiankunStore: this.$store
                        },
                        loader: (loading) => {
                            if (loading) {
                                this.$loading({
                                    lock: true,
                                    text: '加载中...',
                                    background: 'rgba(255, 255, 255, 0.7)'
                                });
                            } else {
                                this.$loading({}).close();
                            }
                        }
                    };
                });
                registerApps(apps);
            });
        },
        startGlobalStateListener () {
            qiankunActions.onGlobalStateChange((state) => {
                console.log('基座监听到全局状态发生改变', state);
                let { eventCode, eventFrom } = state;
                // eslint-disable-next-line default-case
                switch (eventCode) {
                case 'logout':
                    if (eventFrom === 'microApp') {
                        this.logout();
                    }
                    break;
                }
            });
        },
        //  EventBus 监听
        startEventBusListener () {
            qiankunEventBus.$on('logout', () => {
                console.log('基座EventBus监听到logout事件');
                this.logout();
            });
        },
    }
}
</script>
```

#### 三. Q&A

1. 路由模式应如何选择？

    为了方便集成和部署，基座应用以及微应用的路由都要求使用 `hash` 模式。

2. `getMicroApps` 接口获取到的菜单数据中的`microAppBaseRoute` 参数的作用?

    `microAppBaseRoute`代表对应的微应用的路由地址的前缀。每个微应用的路由地址都需要一个不重复的路由前缀，用于让 qiankun 根据当前路由匹配并启动对应的微应用。

3. `getMicroApps` 接口获取到的菜单数据中的`componentName` 参数的作用?

    `componentName` 参数应与该菜单对应的`vue`文件的`name`相同，这是为了保证当前已经打开的同一个微应用下的页面可以正确的被 `keep-alive`组件缓存。

4. 如何修改定义的`qiankunActions`的`globalState`?

    ```js
    qiankunActions.setGlobalState({
        token: 'new token'
    });
    ```

    需要注意的是 ，微应用中只能修改已存在的一级属性，基座应用不受该限制。

5. qiankunActions.onGlobalStateChange 事件监听被覆盖

    `onGlobalStateChange`只能同时创建一个监听，新创建的事件监听会覆盖上一个事件监听。推荐在 i`ndex.vue`、`main.js` 等仅创建一次监听，根据`eventCode`做不同的动作
