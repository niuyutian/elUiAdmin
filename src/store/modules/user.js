import {getToken,setToken,removeToken,setTimeStamp} from '@/utils/auth'
import {login,getUserInfo,getUserDetailById} from '@/api/user'
import {resetRouter} from '@/router'
const state={
  token:getToken(),  //设置token为共享状态 一初始化vuex就从缓存中读
  userInfo:{}   //这里为什么定义空对象而不是null,
                //因为会在getter 中引用userinfo的变量如果设置为null则会报错
}
const mutations={
  //
  setToken(state,payload){
    state.token=payload //将数据设置给vuex
    //同步给缓存
    setToken(payload);
  },
  removeToken(state){
    state.token=null //将vuex的数据置空
    //置空缓存
    removeToken();
  },
  setUserInfo(state,payload){
    // 更新一个对象
    state.userInfo=payload;  //注意:这里 用对象附上一个对象还是响应式的
    // state.userInfo ={...payload}  //这样也是响应式,属于浅拷贝
  },
  removeUserInfo(state){
    state.userInfo = {}
  }
}
const actions={
  async login(context,data){
    const res= await login(data);
    // 这里一定成功因为在request的响应处理了
      context.commit("setToken",res);
      // 设置时间戳
      setTimeStamp()
  },
  // 用户信息
  async getUserInfo(context){
   const res= await getUserInfo();
       // 这里肯定拿到了id 所以可以在这里获取用户详情
   const detailRes= await getUserDetailById(res.userId);
   context.commit("setUserInfo",{...res,...detailRes});
   return res  //这里为什么要写return,是后期做权限的时候使用
  },
  // 登出操作
  logout(context){  
    // 删除token 删除用户资料
    context.commit('removeToken');
    context.commit('removeUserInfo');
    resetRouter();
    //设置权限下的路由是空
    context.commit('permission/setRoutes',[],{root:true})
  }
}
export default{
  namespaced:true,
  state,
  mutations,
  actions
}