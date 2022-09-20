//专门用来处理权限路由
import {constantRoutes,asyncRoutes} from '@/router';

const state={
    routes: constantRoutes   //路由表 表示当前用户拥有的所有路由数组, 包含静态路由
}
const mutations = {
    // 定义修改routes的mutation
    setRoutes(state,payload){
        state.routes=[...constantRoutes, ...payload]
    }
};
const actions={
    fulterRouters(context,menus){
        const routes=[]
        menus.forEach(key => {
            // key就是标识
            // asyncRoutes 找 有没有对象中的name属性等于 key的 如果找不到就没权限 如果找到了 要筛选出来
            routes.push(...asyncRoutes.filter(item => item.name === key)) // 得到一个数组 有可能 有元素 也有可能是空数组
          })
        context.commit('setRoutes',routes);
        return routes  //
    }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}