// 负责全局自定义组件的注册
import PageTools from "./PageTools"
export default {
    // 这里vue 是全局对象
    install(vue){
        // vue.
        vue.component('PageTools',PageTools)
    }
}