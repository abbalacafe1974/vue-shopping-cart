<template>
  
  <Loading :active="isLoading" />
  <section class="mb-5 mt-12 ">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-lg-9" style="padding-top: 100px;">
          <div class="row row-cols-2 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
            <div
              class="col px-3 mt-3 mt-md-3 mt-lg-0 mb-lg-4"
              v-for="item in clothes"
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
import productsData from '@/assets/data';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      clothes: productsData,
      isLoading: false,
    };
  },
  methods: {
    addToCart(id, imageUrl, quantity = 1) {
      this.isLoading = true;
      console.log('Received imageUrl in addToCart:', imageUrl); // 應該能看到圖片URL
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartItem = cart.find((item) => item.product_id === id);

      if (cartItem) {
        cartItem.qty += quantity;
      } else {
        cart.push({
          product_id: id,
          qty: quantity,
          image_url: imageUrl
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
      
      console.log('🛒 商品已加入購物車:', updatedCart);
      this.isLoading = false;
    },
  },
  mounted() {
  },
};
</script>
