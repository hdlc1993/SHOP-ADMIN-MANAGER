import axios from 'axios';
import router from '@/router';

let http = axios.create({
    baseURL:"/api",
    timeout:6000,
});
let httpAuth = axios.create({
    baseURL:"/api",
    timeout:6000,
});

//授权工具-请求拦截器
httpAuth.interceptors.request.use(config=>{
    let token = localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")).token : "";
    config.headers={
        ...config.headers,
        "Authorization": token,
    }
    return config;
},err=>{
    return Promise.reject(err);
});
//授权通信工具-响应拦截器
httpAuth.interceptors.response.use(res=>{

    //token过期判断
    if(res.data.code===403){
        //清理登录信息
        alert("登录过期或访问权限受限");
        localStorage.clear();
        router.replace("/login");
        //提示
    }
    return res.data;
},err=>{
    return Promise.reject(err);
});
export {http,httpAuth};