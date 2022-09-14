<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构 -->
      <el-card class="tree-card" @addDepts="addDepts">
        <treeTools :treeNode="company" :isRoot="true" />
        <el-tree
          :data="departs"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
        >
          <treeTools
            slot-scope="{ data }"
            :treeNode="data"
            @addDepts="addDepts"
            @delDepts="getDepartments"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <addDept
      :showDialog.sync="showDialog"
      :treeNode="node"
      @addDepts="getDepartments"
      ref="addDept"
    />
  </div>
</template>

<script>
import treeTools from "./components/tree-tools.vue";
import addDept from "./components/addDept.vue";
import { getDepartments } from "@/api/departments";
import { tranListToTreeDate } from "@/utils/index";
export default {
  components: {
    treeTools,
    addDept,
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      company: {},
      showDialog: false,
      node: null, //记录当前点击的node节点
    };
  },
  created() {
    this.getDepartments();
  },
  methods: {
    async getDepartments() {
      let res = await getDepartments();
      this.company = {
        name: res.companyName,
        manager: "负责人",
        id: "",
      };
      console.log(res.depts);
      this.departs = tranListToTreeDate(res.depts, "");
    },
    addDepts(node) {
      this.showDialog = true;
      this.node = node;
    },
    editDepts(node) {
      this.showDialog = true;
      this.node = node;
      this.$refs.addDept.getDepartDetail(node.id)
    },
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 150px;
  font-size: 14px;
}
</style>
