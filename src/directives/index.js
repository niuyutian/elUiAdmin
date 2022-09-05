// 负责管理所有的自定义指令

export const imagerror={
    // 指令对象堆在当前dom 元素插入节点后执行

    inserted(dom,options){
        // dom 是当前指令作用的dom 元素
        // 当图片有地址但是地址没有加载成功会,调用onerror事件
        dom.onerror=function(){
            // 这里不能写死
            dom.src=options.value
        }
    }
}
