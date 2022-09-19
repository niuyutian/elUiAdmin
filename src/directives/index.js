// 负责管理所有的自定义指令

import { imgHandle } from "@/filters"

export const imagerror={
    // 指令对象堆在当前dom 元素插入节点后执行

    inserted(dom,options){
        // dom 是当前指令作用的dom 元素
        // 当图片有地址但是地址没有加载成功会,调用onerror事件
        dom.src= dom.src|| options.value
        dom.onerror=function(){
            // 这里不能写死
            dom.src=options.value
        }
    },
    componentUpdated(dom,options){
        // 值得是当前指令所在组件 更新数据完毕后执行
        // created(){
        //     img.src=null
        // }
        dom.src= dom.src|| options.value

    }
}
