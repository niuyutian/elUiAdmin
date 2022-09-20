//混入
import store from '@/store'
export default{
    //混入对象是组件的选项对象
    methods: {
        //key就是要检查的点
        checkPermission(key){
            //用户信息里找 points 有没有key 有则有权限 没有则没有权限 
            const {userInfo} = store.state.user
            if(userInfo?.roles?.points){
               return userInfo.roles.points.some(item=> item ===key)
            }
            return false
        }
    },  
}