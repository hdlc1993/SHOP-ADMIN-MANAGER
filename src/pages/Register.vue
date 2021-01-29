<template>
  <div class="bg">
    <div class="regWrap">
        
        <h2 class="title">用户注册</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
        class="ruleForm"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules:{
          username:[
              {required:true,message:'请输入用户名',trigger:'blur'},
          ],
          password:[
              {required:true,message:'请输入密码',trigger:'blur'},
          ],
      },
    };
  },
  methods:{
      async submit(){
          let res = await this.$api.register(this.ruleForm);
          console.log(res);
          if(res.code==200){
              alert("注册成功!");
              this.$router.replace("/login");
          }else{
              if(res.msg){
                this.$message.error(res.msg);    
              }else{
                this.$message.error("注册失败");
              }
          }
      }
  }
};
</script>

<style>
    .bg .regWrap .el-form-item__label{
    float:left !important;
    text-align:left !important;
}
</style>
<style lang="" scoped>

.bg {
  height: 100%;
  background-color: #e6e6e6;
  padding-top: 1px;
}
.regWrap {
  width: 786px;
  height: 531px;
  background-color: white;
  margin: 30px auto 0;
  padding-top:1px;
}
.regWrap .title{
    margin:50px auto;
}
/* 设置表单宽度 */
.regWrap .ruleForm{
    width: 50%;
    margin:auto;
}
.login-btn{
    width: 100%;
}
</style>