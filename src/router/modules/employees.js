// 员工的路由规则
import Layout from '@/layout'
export default {
    path:"/employees",
    component:Layout,
    name:'employees', //后面权限会用到
    children:[{
        path:'', //这里不用写,表示/employees 不但有布局layout 还有用主页
        //二级路由什么都不用写的时候,表示二级路由的默认路由
        component:()=> import ('@/views/employees'),
        meta:{
            // 路由元信息, 可以放任何内容
            title:'员工管理',
            icon:'people'
        }
    },{
        path:'detail/:id?', //动态路由参数 这里如果不写这个? 那就是 只能穿了id 才能访问  加了? 是有没有id 都可以
        component:()=> import ('@/views/employees/detail'),
        hidden:true,
        meta:{
            // 路由元信息, 可以放任何内容
            title:'员工详情',
            // icon:'people'
        }
    }]
}