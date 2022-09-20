const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,//token的快捷访问
  name:state=> state.user.userInfo.username,  //建立对于用户名的快捷访问
  userInfo:state=> state.user.userInfo,
  routes:state => state.permission.routes 
}
export default getters
