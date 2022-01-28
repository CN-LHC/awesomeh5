<!-- 外层 -->
<template>
  <div class="layout-wrapper">
    <keep-alive>
      <Header></Header>
    </keep-alive>
    <div class="body">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footter from "@/components/Footter";

export default {
  components: {
    Header,
    Footter
  },
  methods: {},
};
</script>

<style scoped>
@import "./layout.css";
</style>
