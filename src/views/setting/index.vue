<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height: 60px">
              <el-button icon="el-icon-plus" size="small" type="primary"
              @click="showDialog=true"
              >
                新增角色
              </el-button>
            </el-row>
            <el-table border :data="list">
              <el-table-column
                label="序号"
                width="120"
                type="index"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="名称"
                width="120"
                prop="name"
                header-align="center"
              >
              </el-table-column>
              <el-table-column
                label="描述"
                prop="description"
                header-align="center"
              >
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="{ row }">
                  <el-button size="small" type="success"> 分配权限 </el-button>
                  <el-button size="small" type="primary" @click="editRole(row)">
                    编辑
                  </el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(row)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                layout="prev,pager,next"
                :total="page.total"
                :page-size="page.pagesize"
                :current-page="page.page"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.name"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.companyAddress"
                />
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.companyPhone"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.mailbox"
                />
              </el-form-item>
              <el-form-item label="备注" v-model="formData.remarks">
                <el-input
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

    <!-- 弹出层 -->
    <el-dialog title="编辑部门" :visible="showDialog" @close="btnCancle">
      <el-form
        label-width="120px"
        :model="roleForm"
        :rules="rules"
        ref="roleForm"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name"> </el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description"> </el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-button size="small" @click="btnCancle"> 取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">
            确定</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getCompanyInfo,
  deleteRole,
  getRoleDetail,
  updateRole,
  addRole
} from "@/api/setting";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 2,
        total: 0,
      },
      showDialog: false,
      formData: {},
      roleForm: {
        name: "",
        description: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "角色名称不能为空",
          },
        ],
      },
    };
  },
  created() {
    this.getRoleList();
    this.getCompanyInfo();
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async getRoleList() {
      let { total, rows } = await getRoleList(this.page);
      this.page.total = total;
      this.list = rows;
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.userInfo.companyId);
    },
    changePage(newPage) {
      this.page.page = newPage;
      this.getRoleList();
    },
    async deleteRole(row) {
      try {
        await this.$confirm("确认删除该角色吗?");
        const res = await deleteRole(row.id);
        this.getRoleList();
        this.$message.success("删除成功");
      } catch (error) {
        console.log(error);
      }
    },
    async editRole(row) {
      this.roleForm = await getRoleDetail(row.id);
      this.showDialog = true;
    },
    btnCancle() {
      this.roleForm={
        name:'',
        description:''
      }
      // 移除校验
      this.$refs.roleForm.resetFields();
      this.showDialog=false
    },
    async btnOK() {
      try {
        await this.$refs.roleForm.validate();
        if (this.roleForm.id) {
          let res = await updateRole(this.roleForm);
        } else {
          await addRole(this.roleForm)
        }
        this.getRoleList();
        this.$message.success("操作成功");
        this.showDialog = false;
        //  校验通过
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>
