<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <el-form :model="formData" :rules="rules" label-width="120px" ref="addEmp"
    
    >
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <!-- {{employeeEnum}} -->
          <el-option
            v-for="item in employeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          @focus="getDepartments"
          v-loading="loading"
        />
        <el-tree
          :data="treeDate"
          :props="{
            label: 'name',
          }"
          :default-expand-all="true"
          v-if="showTree"
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template> 
<script>
import { getDepartments } from "@/api/departments";
import { tranListToTreeDate } from "@/utils";
import employeeEnum from "@/api/constant/employees";
import { addEmployee } from "@/api/employees";

export default {
  name: "addEmployee",
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      employeeEnum,
      formData: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      },
      rules: {
        username: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" },
          {
            min: 1,
            max: 4,
            message: "用户姓名为1-4位",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "change" },
        ],
        timeOfEntry: [{ required: true, message: "入职时间", trigger: "blur" }],
      },
      treeDate: [],
      showTree: false,
      loading: false,
    };
  },
  methods: {
    async getDepartments() {
      this.loading = true;
      let { depts } = await getDepartments();
      this.treeDate = tranListToTreeDate(depts, "");
      this.showTree = true;
      this.loading = false;
    },
    selectNode(node) {
      //   console.log(arguments);
      this.formData.departmentName = node.name;
      this.showTree = false;
    },
    btnCancel() {
      this.formData = {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      };
      this.$refs.addEmp.resetFields();
      this.$emit('update:showDialog',false)
    },
    async btnOK() {
      try {
        await this.$refs.addEmp.validate();
        await addEmployee(this.formData);
        // this.success
        // 更新数据
        this.$parent?.getEmployeeList();
        this.$parent.showDialog = false;
        this.$message.success("添加成功");
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
</style>
