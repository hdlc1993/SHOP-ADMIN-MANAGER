<template>
  <div class="ct-main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ tip }}管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <el-table :data="tableData" row-key="id" border>
      <!-- 角色名列 -->
      <el-table-column
        prop="rolename"
        label="角色名称"
        width="180"
      ></el-table-column>
      <!-- 状态列 -->
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" type="success" effect="dark"
            >启用</el-tag
          >
          <el-tag v-else type="success" effect="dark">启用</el-tag>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editFn(scope.row.id)" type="primary"
            >编辑</el-button
          >
          <el-button @click="delFn(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- beforeopen open opened -->
    <!-- 窗口 -->
    <el-dialog
      :title="`编辑${tip}`"
      :visible.sync="dialogFormVisble"
      @opened="openFn"
      @close="closeFn"
    >
      <!-- 表单 -->
      <el-form
        :rules="rules"
        ref="ruleForm"
        :model="ruleForm"
        label-width="auto"
      >
        <!-- 表单-角色名 -->
        <el-form-item label="角色名" style="width: 300px" prop="rolename">
          <el-input v-model="ruleForm.rolename"></el-input>
        </el-form-item>
        <!-- 表单-状态 -->
        <el-form-item label="状态">
          <!-- 显示 启用/禁用 -->
          <el-switch
            v-model="ruleForm.status"
            :active-text="ruleForm.status ? '启用' : '禁用'"
          ></el-switch>
        </el-form-item>
        <!-- 角色权限 -->
        <el-form-item label="角色权限">
          <el-tree
            :data="treeData"
            ref="tree"
            show-checkbox
            :check-strictly="true"
            node-key="id"
            title="title"
            :default-expanded-keys="chioseMenus"
            :props="{ children: 'children', label: 'title' }"
          ></el-tree>
        </el-form-item>
      </el-form>
      <!-- 按钮区域· -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitFn">修改</el-button>
        <el-button type="danger" @click="closeDiag">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { httpAuth } from "../utils/https";
let defForm = {
  rolename: "",
  menus: "",
  status: true,
};
export default {
  created() {
    this.getRoleList();
  },
  data() {
    return {
      tip: "角色",
      tableData: [],
      ruleForm: {
        ...defForm,
      },
      isAdd: true,
      treeData: [],
      chioseMenus: [],
      dialogFormVisble: false,
      rules: {
        rulename: [
          { required: true, message: "请输入角色名", trigger: "blur" },
        ],
      },
      dialog: {},
    };
  },
  // 函数属性
  methods: {
    async getRoleList() {
      this.tableData = await this.$api.getRoleList();
    },
    //编辑
    async editFn(id) {
      // 1.先请求列表
      let [tree, info] = await Promise.all([
        this.$api.getMenus(),
        this.$api.getRoleInfo(id),
      ]);
      this.treeData = tree;

      this.isAdd = false;
      //   2.获得选中的列表

      this.dialogFormVisble = true;
      let status = info.status == 1 ? true : false;
      this.ruleForm = { ...info, status, id };

      // 3.将选中的列表设置到checkbok里让她展开
      // this.$nextTick(()=>{
      //     this.$refs.tree.setCurrentKey(sel);
      // });
    },
    //提交 新增/修改
    submitFn() {
      //验证
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let subForm = { ...this.ruleForm };
          let url = this.isAdd ? "/roleadd" : "/roleedit";
          //获取提交菜单
          subForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          //获取status状态
          subForm.status = this.ruleForm.status ? 1 : 2;

          httpAuth.post(url, subForm).then((res, err) => {
            if (res.code == 200) {
              this.dialogFormVisble = false;
              this.getRoleList();
              this.$message.success(`${this.getTip()}成功`);
              return;
            } else {
              this.$message.error(`${this.getTip()}失败`);
            }
            alert(err);
          });
        }
      });
    },
    closeDiag() {
      this.dialogFormVisble = false;
    },
    //打开窗口时，加载数据
    async openFn() {
      let sel = this.ruleForm.menus.split(",");
      this.$refs.tree.setCheckedKeys(sel);
      this.chioseMenus = sel;

      // sel.forEach((val) => {
      //   let node = this.$refs.tree.store.nodesMap[val];
      //   if (node) {
      //     node.expanded = true;
      //   } else {
      //     console.log("有一个不存在的节点:" + val);
      //   }
      // });
    },
    closeFn() {
      //   this.treeData = [];
      console.log("清理");
      this.ruleForm = { ...defForm };
      this.chioseMenus = [];
      this.$refs.tree.setCheckedKeys([]);
      this.treeData = [...this.treeData];
      this.isAdd = true;
    },
    getTip() {
      return this.isAdd ? "添加" : "修改";
    },
  },
};
</script>
<style lang="" scoped>
</style>