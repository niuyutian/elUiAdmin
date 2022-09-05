// 用路由守卫建立权限
import router from '@/router';
import store from '@/store'
//由于这个文件在main.js引入了所以不需要导出

// 引入进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

// 白名单页面
const whiteList=['/login','/404']
//前置守卫
router.beforeEach(async(to,from,next)=>{
    // 开启进度条
    nprogress.start();
    // 是否有token
    if(store.getters.token){
        // 如果是登录页则免登录
        if(to.path=="/login"){
            next('/')
        }else{
            // 如果不是登录页
            // 如果vuex有用的id,就不用获取,没有则获取
            if(!store.getters.userInfo.userId){
                await store.dispatch('user/getUserInfo')
                // 这里是异步, 如果后续需要根据用户资料获取数据的话必须改成同步代码
            }
            next()
        }
    }else {
        // 如果是白名单放行,否则就调到登录页
        if(whiteList.indexOf(to.path>-1)){
            next()
        }else{
            next('/login')
        }
    }
    // 解决手动切换地址不更新的问题
    nprogress.done();
})

//后置守卫
router.afterEach(()=>{
    // 关闭进度条
    nprogress.done();
})