<template>
  <el-card class="page-tooles">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <!-- 有名字叫具名插槽 ,没有的叫匿名插槽-->
        <div v-if="showBefore" class="before">
          <i class="el-icon-info"></i>
          <slot name="before" />
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: "PageTools",
  props: {
    showBefore: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang='scss'>
.page-tools {
  margin: 10px 0;
  .before {
    line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
}
</style>