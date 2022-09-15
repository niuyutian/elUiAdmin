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
          if (
            userRelations[key] === "correctionTime" ||
            userRelations[key] === "timeOfEntry"
          ) {
            userInfo[userRelations[key]] = new Date(
              this.formatDate(item[key], "/")
            );
          }else{
            userInfo[userRelations[key]] = item[key];

          }
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
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      const year = time.getFullYear() + "";
      const month = time.getMonth() + 1 + "";
      const date = time.getDate() - 1 + "";
      if (format && format.length === 1) {
        return year + format + month + format + date;
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
</style>
