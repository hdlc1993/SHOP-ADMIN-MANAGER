<template>
    <div class="ct-main">
        <!-- 面包屑菜单 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户</el-breadcrumb-item>
        </el-breadcrumb><!-- 面包屑结束 -->

        <el-table :data="tableData" :key-node="id" >

        </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            tableData:[],
            ruleForm:{
                
            },
            
        }
    },
    methods:{

    },
    
}
</script>