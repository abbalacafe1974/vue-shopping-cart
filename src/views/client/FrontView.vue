<template>
  <FrontNavbar />
  <main>
    <router-view /> <!-- 嵌套路由在這裡渲染 -->
  </main>
  <FrontFooter />
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue';
import FrontFooter from '@/components/FrontFooter.vue';

export default {
  components: {
    FrontNavbar,
    FrontFooter,
  }
};
</script>
