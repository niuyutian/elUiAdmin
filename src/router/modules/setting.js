// 员工的路由规则
import Layout from '@/layout'
export default {
    path:"/setting",
    component:Layout,
    name:'settings', //后面权限会用到
    children:[{
        path:'', //这里不用写,表示/employees 不但有布局layout 还有用主页
        //二级路由什么都不用写的时候,表示二级路由的默认路由
        component:()=> import ('@/views/setting'),
        meta:{
            // 路由元信息, 可以放任何内容
            title:'公司设置',
            icon:'setting'
        }
    }]
}