<template>
  <FrontNavbar />
  <Loading :active="isLoading" />

  <section class="py-5">
  <div class="container-lg" style="padding-top: 50px;">
    <div class="row justify-content-between align-items-center">
      <!-- 圖片區域 -->
      <div class="col-md-6 col-lg-5 mb-4 mb-md-0">
        <div class="row row-cols-1 d-flex justify-content-center">
          <div class="col text-center">
            <img :src="mainImg" alt="顯示產品圖片" class="img-fluid bg-cover" style="max-height: 70vh;" />
          </div>
        </div>
      </div>

      <!-- 右半部區域 -->
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
import FrontNavbar from '@/components/FrontNavbar.vue';
import productsData from '@/assets/data';

export default {
  components: {
    FrontNavbar,
  },
  data() {
    return {
      isLoading: false,
      products: productsData,
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

      const product = this.products.find((item) => item.id === id); // 在靜態資料中查找對應的商品
      if (product) {
        this.product = product;
        this.mainImg = product.imageUrl;
        console.log('Product details:', product); // 確認 product 是否正確
        console.log(product.imageUrl);
        this.isLoading = false;
      } else {
        console.log('找不到該商品');
      }
    },
    addToCart() {
      this.isLoading = true;
      console.log('Product in addToCart:', this.product);
      console.log('Product Image URL:', this.product.imageUrl);
      // 此部分不變，這裡你可以自行模擬加入購物車的操作
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartItem = cart.find((item) => item.product_id === this.product.id);

      if (cartItem) {
        cartItem.qty += this.quantity;
      } else {
        const cartItemToAdd = {
        product_id: this.product.id,
        qty: this.quantity,
        image_url: this.product.imageUrl, // 確保這裡正確加入 imageUrl
        };
        console.log('Cart item to add:', cartItemToAdd); // 打印即將加入購物車的項目
        cart.push(cartItemToAdd);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      
      this.isLoading = false;
      console.log('🛒 商品已加入購物車:', cart);
      this.quantity = 1; // 重置數量
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
