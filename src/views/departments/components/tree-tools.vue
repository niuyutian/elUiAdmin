<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col :span="24">
      <span> <i class="el-icon-s-custom" v-if="treeNode.name!=='江苏传智播客教育科技股份有限公司'"></i> <i class="el-icon-menu" v-else></i> {{ treeNode.name }} </span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>操作 <i class="el-icon-arrow-down"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add"> 添加子部门 </el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">
                编辑部门
              </el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">
                删除子部门
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { delDepartment } from "@/api/departments";

export default {
  name: "treeTools",
  props: {
    // 定义属性
    treeNode: {
      requored: true,
      type: Object,
    },
    isRoot: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    //
    operateDepts(type) {
      if (type == "add") {
        this.$emit('addDepts',this.treeNode);
      } else if (type == "edit") {
        this.$emit('editDepts',this.treeNode);
      } else {
        this.$confirm("您确定要删除该组织部门吗?")
          .then(() => {
            return delDepartment(this.treeNode.id);
          })
          .then(() => {
            this.$emit("delDepts");
            this.$message.success("删除部门成功");
          });
      }
    },
  },
  created() {
  },
  mounted() {},
};
</script>
<style  scoped>
</style>
