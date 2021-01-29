<template>
  <div class="bg">
    <div class="loginWrap">
        <h2>滑头鬼</h2>
        <br>
        <hr/>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="auto"
            class="ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username" placeholder="请输入用户名" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn" type="primary" @click="loginFn"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
    </div>
    
  </div>
</template>
<script>
import { http } from "../utils/https";
export default {
  created() {
    // alert("进入登录页");
  },
  data() {
    var checkPwd = (rule,val,callback)=>{
      if(!val){
        return callback(new Error("密码不能为空!"));
      }
      if(!/^[a-zA-Z0-9]*$/.test(val)){
        return callback(new Error("密码只能包含英文数字"));
      }
      if(val.toString().length>12){
        return callback(new Error("密码长度不能大于12"));
      }
      callback();
    }
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" }, //验证是否为空
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password:[
          {required:true,message:"请输入密码",trigger:"blur"},
          {validator:checkPwd,trigger:"blur"}
        ]
      },
    };
  },
  methods: {
     loginFn() {
        this.$refs.ruleForm.validate(async valid=>{
            if(valid){
              console.log(valid);
               let data = await this.$api.login(this.ruleForm);
               if(data.success){
                  this.$router.replace("/index");
               }else{
                  this.$message.error(data.msg);
               }
            }
            return false;
        })
    },
  },
};
</script>
<style lang="" scoped>
.bg {
  overflow: hidden;
  height: 100%;
  background: url('../assets/bg.jpg') no-repeat ;
  background-size:cover;
  padding-top:1px;
}
.bg h2 {
  color: red;
  text-align: center;
  margin: 70px auto 0; 
}
.bg .loginWrap{
  position: fixed;
  left: 50%;
  top: 50%;
  width:400px;
  height: 500px;
  transform: translate(-50%, -50%);
  background-color: aliceblue;
  border-radius: 5px;
}
.bg .loginWrap .ruleForm {
  width: 90%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.bg .ruleForm .login-btn {
  width: 100%;
}
</style>