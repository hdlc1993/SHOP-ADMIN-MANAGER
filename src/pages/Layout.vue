<template>
    <div class="layout">
        <el-container class="container">
            <el-aside width="200px">
                   <side-bar></side-bar>
            </el-aside> 
            <el-container class="rt-main">
                <el-header class="header">
                    {{username}}
                </el-header>
                <el-main class="bt-main">
                    
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import SideBar from '@/components/SideBar'
export default {
    components:{
        SideBar,
    },
    created(){
        let userinfo = JSON.parse(localStorage.getItem("userinfo"));
        console.log(userinfo)
        if(!userinfo){
             alert("请先登录");
             this.$router.replace("/login");
        }else{
            this.username = userinfo.username;
        }
    },
    data(){
        return{
            username:"",
        }
    }
}
</script>
<style lang="" scoped>
    .layout,.container{
        height:100%;
    }
    .rt-main{
        background-color: #ffff;
    }
    .rt-main .header{
        height: 60px;
        text-align: right;
        line-height: 60px;
        background-color: #B3C0D1;
    }
</style>