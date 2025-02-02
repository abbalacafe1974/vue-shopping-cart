<template>
  <Loading :active="isLoading" />

  <section class="py-5">
  <div class="container-lg">
    <div class="row justify-content-between align-items-center">
      <!-- 圖片區域（回復原本設計） -->
      <div class="col-md-6 col-lg-5 mb-4 mb-md-0">
        <div class="row row-cols-1 d-flex justify-content-center">
          <div class="col text-center">
            <img :src="mainImg" alt="顯示產品圖片" class="img-fluid bg-cover" style="max-height: 70vh;" />
          </div>
        </div>
      </div>

      <!-- 右半部區域（保留我之前給的設計） -->
      <div class="col-md-6 col-lg-6 offset-lg-1">
        <div class="d-flex flex-column justify-content-between h-100">
          <!-- 類別標籤 -->
          <p class="badge bg-gradient bg-info text-light mb-3 shadow-lg p-1 rounded-pill" style="width: 8rem">
            {{ product.category }}
          </p>

          <!-- 產品標題和收藏按鈕 -->
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h2 class="text-dark fw-bold fs-2" style="font-family: 'Poppins', sans-serif;">
              {{ product.title }}
            </h2>
            <span class="heart-icon fs-3" style="cursor: pointer;">
              <font-awesome-icon
                :icon="[isFavorite ? 'fa' : 'far', 'heart']"
                class="text-danger transition-heart"
                @click="toggleFavorite"
              />
            </span>
          </div>

          <!-- 產品描述 -->
          <div class="border-start border-5 border-info ps-3 mb-4 text-muted" style="font-size: 1.1rem;">
            {{ product.description }}
          </div>

          <!-- 價格區塊 -->
          <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-4">
            <div>
              <span class="text-decoration-line-through text-muted fs-5 mb-2 d-block">NT$ {{ product.origin_price }} /件</span>
              <span class="fs-3 fw-bold text-danger d-block">NT$ {{ product.price }} /件</span>
            </div>
            <button class="btn btn-outline-dark mt-4 mt-lg-0 px-4 py-2 rounded-pill" @click="addToCart">
              <font-awesome-icon :icon="['fas', 'cart-plus']" class="px-2" />
              加入購物車
            </button>
          </div>

          <!-- 數量調整區域 -->
          <div class="d-flex align-items-center mb-5">
            <button type="button" class="btn btn-outline-dark fs-5" :disabled="quantity === 1" @click="quantity--">-</button>
            <label for=""></label>
            <input type="number" class="form-control text-center fs-4 mx-3" v-model.number="quantity" min="1" max="99" />
            <button type="button" class="btn btn-outline-dark fs-5" @click="quantity++">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      isLoading: false,
      product: {},
      mainImg: '',
      isFavorite: false, // 初始為未收藏
      quantity: 1,
    };
  },
  watch: {
    quantity() {
      if (this.quantity <= 0) {
        this.quantity = 1;
      }
    },
    $route() {
      if (this.$route.params.id !== undefined) {
        this.getProduct();
      }
    },
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const { id } = this.$route.params;

      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.isLoading = false;
          const { product } = res.data;
          this.product = product;
          this.mainImg = this.product.imageUrl;
        })
        .catch((err) => {
          const { message, success } = err.response.data;
          console.log(message, success);
        });
    },
    addToCart() {
      this.isLoading = true;
      const para = {
        data: {
          product_id: this.product.id,
          qty: this.quantity,
        },
      };
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, para)
        .then((res) => {
          this.isLoading = false;
          const { message, success } = res.data;
          const { title } = res.data.data.product;
          this.quantity = 1;
        })
        .catch((err) => {
          const { message, success } = err.response.data;
        });
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite; // 切換狀態
    },
  },
  mounted() {
    this.getProduct();
  }
};
</script>
<style>
/* 讓愛心有動畫效果 */
.heart-icon:hover .transition-heart {
  transform: scale(1.2);
  transition: transform 0.3s ease-in-out;
}
</style>
