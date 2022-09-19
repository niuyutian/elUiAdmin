// 负责全局自定义组件的注册
import PageTools from "./PageTools"
import upLoadExcel from "./upLoadExcel"
import ImgUpload from "./ImgUpload"

export default {
    // 这里vue 是全局对象
    install(vue){
        // vue.
        vue.component('PageTools',PageTools)
        vue.component('upLoadExcel',upLoadExcel)
        vue.component('ImgUpload',ImgUpload)
    }
}