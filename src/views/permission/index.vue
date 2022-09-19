<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPermission(1, '0')"
            >添加权限</el-button
          >
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table border :data="list" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button
              type="text"
              v-if="row.type == 1"
              @click="addPermission(2, row.id)"
              >添加</el-button
            >
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible="showDialog" :title="showText"  @close="btnCancel">
      <el-form ref="per" label-width="120px" :model="formData" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input style="width: 90%" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="标识"  prop="code">
          <el-input style="width: 90%" v-model="formData.code"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            style="width: 90%"
            v-model="formData.description"
          ></el-input>
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            style="width: 90%"
            active-value="1"
            inactive-value="0"
            v-model="formData.enVisible"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissionList,
  delPermission,
  addPermission,
  updatePermission,
  getPermissionDetail,
} from "@/api/permission";

import { tranListToTreeDate } from "@/utils";
export default {
  data() {
    return {
      list: [],
      showDialog: false,
      title: "11",
      formData: {
        name: "", // 名称
        code: "", // 标识
        description: "", // 描述
        type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: "", // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: "0", // 开启
      },
      rules: {
        name: [
          { required: true, message: "权限名称不能为空", trigger: "blur" },
        ],
        code: [
          { required: true, message: "权限标识不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getPermissionList();
  },
    computed: {
    showText() {
      return this.formData.id ? '编辑权限' : '新增权限'
    }
  },
  methods: {
    async getPermissionList() {
      this.list = tranListToTreeDate(await getPermissionList(), "0");
    },
    delPermission(id) {
      this.$confirm("确认删除该权限点吗")
        .then(() => {
          return delPermission(id);
        })
        .then(() => {
          this.$message.success("删除成功");
          // 重新拉取数据
          this.getPermissionList();
        });
    },
    addPermission(type, pid) {
      // type1 表示 访问权限 2 表示炒作按钮权限
      // pid表示数据的父节点
      this.formData.type = type;
      this.formData.pid = pid;
      // this.formData.type=type;
      this.showDialog = true;
    },
    async  editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    btnOK(){
      this.$refs.per.validate().then(()=>{
        return  addPermission(this.formData);

      }).then(()=>{
        this.$message.success('操作成功');
        this.getPermissionList();
        this.showDialog=false
      })
    },
        btnCancel() {
      // 重置数据
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      // 移除校验
      this.$refs.per.resetFields() // 移除校验
      this.showDialog = false
    },
  },
};
</script>

<style>
</style>
