<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构 -->
      <el-card class="tree-card">
          <el-row type="flex" justify="space-between" align="middle" style="height:40px">
            <el-col >
              <span>江苏江南水务股份有限公司 </span>
            </el-col>
            <el-col  :span="4">
                <el-row  type="flex" justify="end">
                  <el-col>负责人</el-col>
                  <el-col>
                    <el-dropdown>
                        <span>操作 <i class="el-icon-arrow-down"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                              添加子部门
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
            </el-col>
          </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .tree-card{
    padding: 30px 150px;
    font-size:14px
  }
</style>
