<template>
  <FrontNavbar />
  <section class="my-4 my-sm-5" style="padding-top: 80px;">
    <div class="container">
      <div class="row">
        <div class="col-sm-4 text-center p-2">
          <div
            class="
              badge
              rounded-pill
              px-5 px-sm-4 px-md-5 py-3
            "
            :class="
              barPrecent === 0
              ? 'bg-primary'
              : 'bg-graylight'
            "
          >
            <span class="fs-5">1. 建立訂單</span>
          </div>
        </div>
        <div class="col-sm-4 text-center p-2">
          <div
            class="
              badge
              rounded-pill
              px-5 px-sm-4 px-md-5 py-3
            "
            :class="
              barPrecent === 50
              ? 'bg-primary'
              : 'bg-graylight'
            "
          >
            <span class="fs-5">2. 確認付款</span>
          </div>
        </div>
        <div class="col-sm-4 text-center p-2">
          <div
            class="
              badge
              rounded-pill
              px-5 px-sm-4 px-md-5 py-3
            "
            :class="barPrecent === 100 ? 'bg-primary' : 'bg-graylight'"
          >
            <span class="fs-5">3. 付款完成</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="mb-5">
    <router-view />
  </section>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue';

export default {
  components: {
    FrontNavbar,
  },
  data() {
    return {
      barPrecent: 0,
    };
  },
  watch: {
    $route() {
      this.getRoute();
    },
  },
  methods: {
    getRoute() {
      const { fullPath } = this.$route;
      const { id } = this.$route.params;
      if (fullPath === '/checkout/order') {
        this.barPrecent = 0;
        return;
      }
      if (fullPath === `/checkout/pay/${id}`) {
        this.barPrecent = 50;
        return;
      }
      if (fullPath === `/checkout/payed/${id}`) {
        this.barPrecent = 100;
      }
    },
  },
  mounted() {
    this.getRoute();
  },
};
</script>
