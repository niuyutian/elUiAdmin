import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import {getTimeStamp} from '@/utils/auth'
import router from '@/router'

const TimeOut= 3600 //定义超时时间
// create an axios instance
const service = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000
})
//请求拦截
service.interceptors.request.use(
    config=>{
        if(store.getters.token){
            // 只有有token的必要性在检测时间戳是否超时
            if(isCheckTimeOut()){
                store.dispatch('user/logout');   //退出操作
                router.push('/login');
                return Promise.reject(new Error('登录已经超时了'));
            }
            config.headers['Authorization'] =`Bearer ${store.getters.token}`
            
        }
         // config 是请求的配置信息 所以最好必须返回 
        return config //必须返回
    },
    error=>{
        return Promise.reject(error)
    }
);
service.interceptors.response.use((response)=>{
    const{success,message,data}= response.data;
    // 要根据success的成功与否决定下面的操作
    if(success){
        return data
    }else{
        Message.error(message) //提示错误信息
        return Promise.reject(new Error(message)) //返回执行错误, 让当前的执行链跳转成功,直接进catch
    }
},
(error)=>{
    if(error.response&& error.response.data&& error.response.data.code===10002){
        // 表示后端告诉你超时
        store.dispatch('user/logout');
        router.push('/login')
    }else{
        Message.error(error.message) //提示错误信息
    }
    return Promise.reject(error) //返回执行错误, 让当前的执行链跳转成功,直接进catch
 }
);
// 是否超时
// 当前时间-缓存时间 是否大于 时间差  超时/不超时
function isCheckTimeOut(){
    var currentTime =Date.now();
    var timeStamp=getTimeStamp();
    return (currentTime-timeStamp)/1000 > TimeOut
}
export default service
