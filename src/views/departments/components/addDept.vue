<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancle">
    <!-- 表单数据 -->
    <el-form
      :model="formData"
      :rules="rules"
      label-width="120px"
      ref="deptForm"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          style="width: 80%"
          v-model="formData.code"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 80%"
          placeholder="请选择"
          v-model="formData.manager"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
          v-model="formData.introduce"
        />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancle">取消</el-button>
      </el-col>
      <el-col :span="6">
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import {
  getDepartments,
  addDepartment,
  getDepartDetail,
  updateDepartments,
} from "@/api/departments";
import { getEmployeeSimple } from "@/api/employees";

export default {
  name: "addDept",
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
    treeNode: {
      type: Object,
      default: null,
    },
  },
  data() {
    // 检查部门名称是否重复
    const checkNameRepeat = async (rule, value, callback) => {
      // value 是部门名称 ,要去和同级部门下去比较, 有相同的 不能过, 不相同则校验成功
      const { depts } = await getDepartments();
      // 去找同级部门下, 有没有和value 相同的数据
      let isRepeat;
      if (this.formData.id) {
        isRepeat = depts.filter(
          (item) =>
            item.pid === this.treeNode.pid && item.id !== this.treeNode.id
        );
      } else {
        isRepeat = depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value);
      }
      isRepeat
        ? callback(new Error(`同级部门下已经存在'${value}'这个部门了`))
        : callback();
    };
    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments();
      let isRepeat;
      if (this.formData.id) {
        isRepeat = depts.filter(item=> item.id !== this.treeNode.id).some((item) => item.code === value && value);
      } else {
        isRepeat = depts.some((item) => item.code === value && value);
      }
      isRepeat
        ? callback(new Error(`组织架构下已经存在'${value}'这个编码了`))
        : callback();
    };
    return {
      formData: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      },
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门名称长度为1-50个字符",
            trigger: "blur",
          },
          { trigger: "blur", validator: checkNameRepeat },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门编码长度为1-50个字符",
            trigger: "blur",
          },
          { trigger: "blur", validator: checkCodeRepeat },
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "部门介绍长度为1-300个字符",
            trigger: "blur",
          },
        ],
      },
      peoples: [],
    };
  },
  computed: {
    showTitle() {
      return this.formData.id ? "编辑部门" : "新增子部门";
    },
  },
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple();
    },
    btnOK() {
      this.$refs.deptForm.validate(async (isOK) => {
        // 表单校验通过
        if (isOK) {
          // 通过
          if (this.formData.id) {
            // 编辑
            const res = await updateDepartments(this.formData);
            this.$message.success("修改成功");
          } else {
            const res = await addDepartment({
              ...this.formData,
              pid: this.treeNode.id,
            });
            this.$message.success("添加成功");
          }
          this.$emit("addDepts");
          this.$emit("update:showDialog", false);
        }
      });
    },
    btnCancle() {
      this.formData = {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      };
      this.$emit("update:showDialog", false);
      // 清除之前的校验
      this.$refs.deptForm.resetFields();
    },
    async getDepartDetail(id) {
      // 这个id 是可以用treeNode.id 的但是 props传递参数也是异步的
      // 所以这里不能直接用
      this.formData = await getDepartDetail(id);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style  scoped>
</style>
