import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载
let Layout = ()=> import('@/pages/Layout');
let Login = ()=> import('@/pages/Login');
let Index = ()=> import('@/pages/index');
let Reg = ()=>import('@/pages/Register');
let Menu = ()=>import('@/pages/MenuSetting');
//路由懒加载<END>
//2021-01-29
Vue.use(Router);
export default new Router({
    routes:[
        {
            path:"/login",  
            component:Login,
        },
        {
            path:"/register",
            component:Reg,
        },
        {
            path:"/",   
            component:Layout,
            children:[
                {
                    path:"index",
                    component:Index,
                },
                {
                    path:"menu",
                    component:Menu,
                },
                {
                    path:"role",
                    component:()=>import('@/pages/Role'),
                },
                {
                    path: "user",
                    component: ()=>import('@/pages/User')
                },
                {
                    path:"",
                    redirect:"/index"
                },
            ]
        },
    ]
});