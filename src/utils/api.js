import Vue from 'vue';
import { http, httpAuth } from '@/utils/https'
import { Message } from 'element-ui'
import { cat } from 'shelljs';


export default {

  async login(form) {
    let data = { success: false, msg: '执行失败' }
    await http.post("/userlogin", form).then(res => {
      if (res.data.code == 200) {
        // 登录成功
        // 将数据存放到 localStorage
        localStorage.setItem("userinfo", JSON.stringify(res.data.list));
        console.log("登录成功", res);
        data.success = true;
        data.msg = res.data.msg;

      } else {
        // console.log(res);
        // 错误出现弹框提示
        console.log("登录失败", res.data);
        data.success = false;
        data.msg = res.data.msg;
      }
    });
    return data;
  },

  // 注册功能
  async register(user) {
    let form = { ...user, roleid: 3, status: 1 };
    console.log("注册提交的字段", form);
    let data = await http.post("/useradd", form);
    return data;
  },

  async getTableData() {
    console.log("进入getTableData");
    let res = await httpAuth.get("/menulist", {
      params: {
        istree: true
      }
    });
    if(res.code==200){
      return res.list
    }else{
      return [];
    }
  },

  // 获取顶级菜单数据
  async getTopMenu() {
    let res = await httpAuth.get("/menulist", {
      params: {
        pid: 0
      }
    });
    if (res.code == 200) {
      return res.list ? res.list : [];
    } else {
      Message.error("获取数据失败:" + res.code);
      return [];
    }
  },

  async getMenuInfo(id) {
    //   向后台获取修改的数据
    let res = await httpAuth.get("/menuinfo", {
      params: {
        id
      }
    });
    console.log("api/getMenuInfo数据=", res);
    if (res.code == 200) {
      return res.list;
    } else {
      Message.error("请求失败:" + res.data.code);
    }

  },
  async deleteMenu(id){
    let res = await httpAuth.post("/menudelete",{id});
    if(res.code==200){
      Message.success("删除成功!");
      return res.list;
    }else{
      Message.error("删除失败:"+res.msg);
    }
  },
  async getRoleList(){
    let res = await httpAuth.get("/rolelist");
    console.log("[api.js]打印角色列表",res);
    if(res.code==200){
      return res.list;
    }else{
      Message.error("获取角色失败");
      return [];
    }
  },
  //根据id获取角色
  async getRoleInfo(id){
    let res = await httpAuth.get("roleinfo",{params:{
      id
    }});
    console.log("[api.js]getRoleInfo获取角色",res);
    if(res.code==200 && res.list){
      res.list.status = res.list.status == 1 ? true: false;
      return res.list;
    }else{
      Message.error("获取角色id:"+id+"失败");
    }
  },
  //获取菜单列表
  async getMenus(){

    let res= await httpAuth.get("/menulist",{
      params:{
        istree:true
      }
    });
    console.log("[api.js]getMenus",res);
    if(res.code==200){
      return res.list?res.list:[];
    }else{
      return [];
    }
  }

}