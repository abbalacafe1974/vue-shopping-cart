<template>
  
  <Loading :active="isLoading" />
  <section class="mb-5">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-lg-9">
          <div class="row row-cols-2 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
            <div
              class="col px-3 mt-3 mt-md-3 mt-lg-0 mb-lg-4"
              v-for="item in products"
              :key="item.id"
            >
            <RouterLink
              class="d-flex
              justify-content-center
              align-items-stretch
              text-decoration-none
              h-100"
              :to="`/product/${item.id}`"
              >
                <ProductCard
                  :product="item"
                  @add-to-cart="addToCart"
                  @toggle-favorite="toggleFavorite"
                />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      isLoading: false,
      products: [],
      pagination: {},
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const apiPath = `?page=${page}`; // 不過濾，只取所有商品

      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all${apiPath}`)
        .then((res) => {
          this.isLoading = false;
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
        });
    },
  },
  mounted() {
    this.getProducts(); // 只調用 getProducts 方法來載入商品資料
  },
};
</script>
