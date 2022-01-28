<!-- 客群管理 -->
<template>
  <div class="holder">not open yet</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    //跳路由
    gotoPage(path) {
      console.log("path", path);
      this.$router.push({ path: `${path}` }).catch((err) => err);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.holder {
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>
