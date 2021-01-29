<template>
	<div>
		<el-breadcumb separator></el-breadcumb>


		<!-- 添加修改对话框 -->
		<el-dialog :title="tip+isAdd?'添加':'修改'">
			<el-form :model="ruleForm" label-width="auto	">
				<el-form-item label="上级菜单">
					<el-select v-model="ruleForm.id" placeholder="">

					</el-select>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
export default {
	created(){

	},
	methods:{
		changeMenu(id){
			
		}
	},

}
</script>
<style lang="stylus" scoped>

</style>