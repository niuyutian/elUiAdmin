<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :showBefore="true">
        <span slot="before">{{ page.total }}</span>
        <template v-slot:after>
          <el-button size="small" type="success" @click="$router.push('import')"
            >excel导入</el-button
          >
          <el-button size="small" type="danger" @click="exportData"
            >excel导出</el-button
          >
          <el-button size="small" type="primary" @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </PageTools>
      <el-table border v-loading="loading" :data="list">
        <el-table-column label="序号" type="index" sortable="" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column
          label="聘用形式"
          sortable=""
          prop="formOfEmployment"
          :formatter="formatEmployment"
        />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <!-- 作用域插槽 +事件格式化 去做 -->

        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <!-- <template slot-scop="obj">
            <div>
              
            </div>
          </template> 或 -->
          <!-- <template v-slot="obj">
              {{obj.row.timeOfEntry}}
          </template> 或-->
          <template v-slot="{ row }">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" sortable="" prop="enableState">
          <template v-slot="{ row }">
            <el-switch :value="row.enableState === 1"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template v-slot="{ row }">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="delEmployee(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next"
          @current-change="changePage"
          :page-size="page.size"
          :total="page.total"
          :current-page="page.page"
        />
      </el-row>
      <addEmployee :showDialog.sync="showDialog" />
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from "@/api/employees";
// 引入枚举对象
import employees from "@/api/constant/employees";
import addEmployee from "./commponents/addEmployee.vue";
import { formatDate } from "@/filters/index.js";

export default {
  components: {
    addEmployee,
  },
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0,
      },
      loading: false,
      showDialog: false,
    };
  },
  created() {
    this.getEmployeeList();
  },
  methods: {
    async getEmployeeList() {
      this.loading = true;
      const { total, rows } = await getEmployeeList(this.page);
      this.page.total = total;
      this.list = rows;
      this.loading = false;
    },
    changePage(newPage) {
      this.page.page = newPage;
      this.getEmployeeList();
    },
    formatEmployment(row, column, cellValue, index) {
      const obj = employees.hireType.find((item) => item.id === cellValue);
      return obj ? obj.value : "未知";

      //  聘用形式的格式化
      return "111";
    },
    async delEmployee(id) {
      try {
        await this.$confirm("确定删除该员工?");
        await delEmployee(id);
        this.$message.success("删除员工成功");
        this.getEmployeeList();
      } catch (error) {
        console.log(error);
      }
    },
    exportData() {
      const headers = {
        手机号: "mobile",
        姓名: "username",
        入职日期: "timeOfEntry",
        聘用形式: "formOfEmployment",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
      };
      import("@/vendor/Export2Excel").then(async (excel) => {
        try {
          const { rows } = await getEmployeeList({
            page: 1,
            size: this.page.total,
          });
          let data = this.formatJson(headers, rows);
          const mutiHeadet =[['姓名','主要信息','','','','','部门']];
          const merges =['A1:A2',"B1:F1","G1:G2"]
          excel.export_json_to_excel({
            header: Object.keys(headers),
            data,
            filename: "员工工资表",
            mutiHeadet,
            merges
          });
        } catch (error) {
          console.log(error);
        }
        // excel.export_json_to_excel({
        //   header: ["姓名", "工资"],
        //   data: [
        //     ["张三", "100350"],
        //     ["李四", "150530"],
        //   ],
        //   filename: "员工工资表",
        //   // bookType:'txt'
        // });
      });
    },
    formatJson(headers, rows) {
      return rows.map((item) => {
        return Object.keys(headers).map((key) => {
          if (
            headers[key] == "timeOfEntry" ||
            headers[key] == "correctionTime"
          ) {
            return formatDate(item[headers[key]]);
          } else if (headers[key] === "formOfEmployment") {
            // return
            const obj = employees.hireType.find(
              (obj) => obj.id === item[headers[key]]
            );
            return obj ? obj.value : "未知";
          }
          return item[headers[key]];
        });
      });
      // return;
    },
  },
};
</script>

<style>
</style>
