<template>
  <upLoadExcel :on-success="success" />
</template>
<script>
import { importEmployee } from "@/api/employees";
export default {
  name: "import",
  data() {
    return {};
  },
  methods: {
    async success({ header, results }) {
      const userRelations = {
        入职时间: "timeOfEntry",
        手机号: "mobile",
        姓名: "username",
        转正日期: "correctionTime",
        工号: "workNumber",
      };
      // results.forEach(item => {
      //   var userInfo={}
      //    Object.keys(item).forEach(keys=>{
      //       userInfo[userRelations[key]]=item[key]
      //    })
      // });
      console.log(results);
      let newArr = results.map((item) => {
        var userInfo = {};
        Object.keys(item).forEach((key) => {
          userInfo[userRelations[key]] = item[key];
        });
        return userInfo;
      });
      try {
        await importEmployee(newArr);
        this.$message.success("导入excel成功");
        this.$router.back();
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
