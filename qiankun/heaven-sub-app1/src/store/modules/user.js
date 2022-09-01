/*
 * @description:
 * @author: 王浩
 * @Date: 2022-09-01 09:46:10
 * @Modified By:
 * @version: 1.0.0
 */
//导入axios
import axios from 'axios'
export default {
    //开启命名空间一定要写这个
    namespaced: true,
    //state数据状态定义
    state (){
        return {
            //用户信息
            profile: {
                user: '小明', //用户名
                token: null //用户的token
            }
        }
    },
    //vuex方法
    // mutations 定义方法
    mutations: {
        setUser (state, profile){
            state.profile = profile //profile 是外界传的参数
        }
    },
    //请求数据的地方 如果要请求一个数据可以这样来写这个是补充的
    // actions 定义方法
    actions: {
    //调用axios的请求函数
        async getUserInfo (context){
            const { data: data} = await axios.get('请求的路径地址', {context})
            console.log(data) //服务器返回的数据
            context.commit('setUser', data)
        }
    }
}
