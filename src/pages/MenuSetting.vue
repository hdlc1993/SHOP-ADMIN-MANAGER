<template>
	<div class="container">
		<el-breadcrumb separator="/"><!-- 这里是面包屑菜单 -->

			<!-- 这里是面包屑第一个项目 -->
			<el-breadcrumb-item :to="{path:'/'}">
				首页
			</el-breadcrumb-item>
			
			<!-- 这里是面包屑第二个项目-->
			<el-breadcrumb-item>				
				菜单管理
			</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 这里是面包屑菜单 -->
		
						<!-- 添加按钮 -->
		<el-button type="primary" @click="addFn">添加</el-button>


		<!-- 菜单展示/表格menulist -->
		<el-table :data="tableData" style="width:100%;margin-bottom:20px;text-align:center" row-key="id" border :tree-props="{children:'children',hasChildren:'hasChildren'}">
			<!-- 列《名称》 -->
			<el-table-column
				prop="title"
				label="名称"
				width="180">
			</el-table-column>
			<!-- 列《图标》 -->
			<el-table-column
				label="图标"
				width="180"
				>
				<template slot-scope="scope">
					<i :class="scope.row.icon"></i>
					<span>{{scope.row.icon}}</span>
				</template>
			</el-table-column>
			<!-- 列 类型 -->
			<el-table-column
				prop="icon"
				label="类型"
				width="180">
				<template slot-scope="scope">
                <!-- scope.row : 每一行的数据对象 -->
                <!-- <span>{{scope.row.type}}</span> -->
					<el-tag v-if="scope.row.type==1">目录</el-tag>
					<el-tag  v-else type="success">菜单</el-tag>
            	</template>
			</el-table-column>
			<!-- 当前列:URL -->
			<el-table-column prop="url" label="菜单URL" width="80"></el-table-column>
			<!-- 当前列:操作按钮 -->
			<el-table-column
				label="操作">
				<template slot-scope="scope">
					<el-button @click="editFn(scope.row.id)">编辑</el-button>
					<el-button type="danger" @click="deleteFn(scope.row.id)">删除</el-button>
            	</template>
			</el-table-column>
		</el-table>



		<!-- 添加修改对话框 -->
		<el-dialog :title="tip+(isAdd?'添加':'修改')"  :visible.sync="dialogFormVisible" @opened="loadTopMenu" @close="closeDialog">
			<!-- 对话框>表单 -->
			<el-form :model="ruleForm" label-width="auto" :rules="rules" ref="ruleForm">

				<el-form-item label="上级菜单" prop="pid">
					<!-- 对话框-下拉容器 -->
					<el-select v-model="ruleForm.pid" placeholder>
						<el-option label="顶级菜单" :value="0"></el-option>
						<!-- 对话框-下拉选项 -->
						<el-option v-for="item in topMenus" :key="item.id" :value="item.id" :label="item.title"></el-option>
						<!-- el-option必须值:value :label -->

					</el-select>
				</el-form-item>
				<!-- 菜单名称 -->
				<el-form-item label="菜单名称" prop="title">
					<el-input v-model="ruleForm.title" ></el-input>
				</el-form-item>

				<!-- 图标 -->
				<el-form-item label="图标" prop="icon">
					<el-input v-model="ruleForm.icon" ></el-input>
				</el-form-item>

				<!-- 菜单url -->
				<el-form-item label="菜单url" prop="url">
					<el-input v-model="ruleForm.url"></el-input>
				</el-form-item>

				<!-- 类型 -->
				<el-form-item label="类型">
					<el-radio :disabled="ruleForm.type==2">目录</el-radio>
					<el-radio :disabled="ruleForm.type==1">图标</el-radio>
				</el-form-item>

				<!-- 状态 -->
				<el-form-item label="状态">
					<el-switch v-model="ruleForm.status" :active-text="ruleForm.status?'启用':'禁用'"></el-switch>
				</el-form-item>
				
			</el-form><!-- 对话框>表单《结束》 -->
			
			<!-- 底部按钮 提交 取消 -->
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeDialog">取 消</el-button>
				<el-button type="primary" @click="submitFn">确 定</el-button>
     		</div>
		</el-dialog>
	</div>
</template>
<script>

//初始表单数据
let baseData = {
	pid:0,		//默认父级id
	status: true, //默认状态
	type: 1,	//默认类型
	url: "", //访问url
	icon: "", //图标名		
	title: "", //标题
	id:0,	
}


export default { 
	created(){
		this.getTableData();
    },
	data(){
		return{
			tip:"菜单",//菜单提示
			isAdd:true,//添加开关
			ruleForm: {//添加修改用的表单对象
				...baseData
			},
			topMenus:[],//顶级菜单list
			tableData:[],//表格数据
			dialogFormVisible:false,//决定是否显示对话框
			rules: {//验证规则
				pid:[
					{required:true,message:'请选择父级菜单',trigger:'blur'},
				],
				title:[
					{required:true,message:'请输入菜单名',trigger:'blur'},
				]
			}
		}
	},
    methods:{
		
		changeMenu(id){
			
		},
		//关闭提示框
		closeDialog(){
			this.dialogFormVisible = false;
			this.resetForm();
			this.isAdd = true;
			this.$refs.ruleForm.clearValidate();
		},
		//重置表单对象
		resetForm(){
			this.ruleForm = {...baseData};
		},
		//提交表单
		submitFn(){
			//先验证表单
			this.$refs.ruleForm.validate(valid=>{
				if(valid){
					let url = this.isAdd ? "/menuadd" : "/menuedit";
					//切换status
					this.ruleForm.status = this.ruleForm.status ? 1 : 2;
					this.$http.post(url,this.ruleForm).then(res=>{
						console.log("提交结果",res);
						if(res.data.code===200){
							//关闭窗口
							this.dialogFormVisible = false;
							//更新表格
							this.getTableData();

							this.$message.success("提交成功");


						}else{
							this.$message.error("提交失败!"+res.data.code);
						}
					});
				}
			});
		},
		//加载顶级菜单
		async loadTopMenu(){
			this.topMenus = await this.$api.getTopMenu();
			
		},
		// 获取menulist
        async getTableData(){
			 let res = await this.$api.getTableData();
			 if(res){
				 this.tableData = res;
			 }
		},
		//点击添加按钮,打开添加界面
		addFn(){
			this.dialogFormVisible = true;
			this.ruleForm.pid = 0;
		},
		//进入编辑界面
		async editFn(id){
			console.log("进入编辑");
			this.isAdd = false;
			let res = await this.$api.getMenuInfo(id);
			let status = res.status == 1 ? true : false;
			console.log("[editfn]返回",res);
			this.ruleForm = {
				...res,
				status,
				id
			};
			this.dialogFormVisible = true;
		},
		//打开表单的钩子
        async openFn() {
            // 显示菜单
            this.dialogFormVisible = true;
            //  获取顶级菜单数据
			let list = await this.$api.getTopMenu();
			
		},
		//删除事件
		async deleteFn(id){
			try{
				let confirm = await this.$confirm(
					"此操作将永久删除该菜单,是否继续?",
					"提示",
					{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}

				);
				if(confirm==='confirm'){
					let res = await this.$api.deleteMenu(id);
					if(res)this.tableData = res;
				}
			}catch(err){
				console.log(err);
			}
		}
		
    }
	
}
</script>
<style lang="" scoped>
</style>