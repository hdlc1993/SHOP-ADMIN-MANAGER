<template>
  <div class="side">
    <!-- 
          :default-active : 默认激活地址
          active-text-color:激活样式
          router:是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
          unique-opened	是否只保持一个子菜单的展开
       
       -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="el-menu-vertical-demo"
          router
        >
          
          <h2>后台管理系统</h2>
          <el-submenu v-for="(submenu,index) in menus" :index="index.toString()" :key="index">
            <template slot="title">
              <i :class="submenu.icon"></i>
              <span>{{submenu.title}}</span>
            </template>
            <el-menu-item v-for="(item,index) in submenu.children" :index="item.url" :key="index">{{item.title}}</el-menu-item>
          </el-submenu>
        </el-menu>
  </div>
</template>
<script>
export default {
    data(){
        return{
            menus:[],
        }
    },
    created(){
        let userinfo = JSON.parse(localStorage.getItem("userinfo"));
        console.log(userinfo)
        this.menus = userinfo.menus;
    }
};
</script>
<style>
    /* 取消分组的自动缩进 */
    .el-menu-item-group__title{
        padding-left:0px !important;
    }
</style>
<style lang="" scoped>
.side {
  height: 100%;
  background-color: rgb(84, 92, 100);
}
.side h2 {
  color: #fff;
  text-align: center;
  font-size: 25px;
  margin: 20px 0;
}
/* 设置左侧导航缩进 */
.el-submenu .el-menu-item{
    text-indent:6px ;
}
</style>