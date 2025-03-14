<template>
  <div class="custom-card card w-100 h-100 animate__animated animate__fadeInUp animate__delay-1s" style="width: 18rem">
    <div class="custom-img">
      <img
        :src="product.imageUrl"
        class="card-img-top cover-fit"
        alt="rot1"
      />
      <span class="custom-text d-flex justify-content-center align-items-center text-white">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="px-1" />
          查看更多
      </span>
    </div>

    <div class="card-body p-3">
      <h5 class="card-title fw-bolder mb-3">{{ product.title }}</h5>
      <div class="d-flex justify-content-between align-items-center">
        <p class="text-gray text-decoration-line-through">
          NT$ {{ product.origin_price }}/件
        </p>
        <p class="fs-5 fw-bolder">NT$ {{ product.price }}/件</p>
      </div>
      <div class="text-center m-auto">
        <button type="button" class="btn btn-primary" @click.prevent="emitAddToCart">
          <font-awesome-icon :icon="['fas', 'cart-plus']" class="px-1" />
            加入購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      quantity: 1,
      isFavorite: false, // 初始為未收藏
    };
  },
  props: ['product'],
  methods: {
    emitAddToCart() {
      this.$emit('add-to-cart', this.product.id, this.product.imageUrl);
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite; // 切換狀態
    },
  },
};
</script>
