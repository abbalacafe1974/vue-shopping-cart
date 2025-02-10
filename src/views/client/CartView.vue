<template>
  <FrontNavbar />

  <Loading :active="isLoading" />
  <section class="mb-5" style="padding-top: 80px;">
  <div class="container">
    <template v-if="carts.length">
      <!-- 清空購物車區域 -->
      <div class="d-flex p-3 justify-content-between align-items-center">
        <button
          type="button"
          class="btn btn-danger px-4 py-2 shadow-sm"
          @click="deleteAllCarts"
        >
          清空購物車
        </button>
      </div>

      <!-- 購物車商品清單 -->
      <div class="p-3">
        <div class="table-responsive">
          <table class="table table-striped table-bordered text-center">
            <thead class="table-dark">
              <tr>
                <th class="py-3">圖片</th>
                <th class="py-3">名稱</th>
                <th class="py-3">數量</th>
                <th class="py-3">單價</th>
                <th class="py-3">小計</th>
                <th class="py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in carts" :key="item.id">
                <td>
                  <div
                    class="product-image"
                    :style="`
                      background-image: url(${item.product.imageUrl});
                      width: 80px;
                      height: 80px;
                      background-size: cover;
                      background-position: center;
                      border-radius: 8px;
                    `"
                  ></div>
                </td>
                <td class="fw-bold text-truncate" style="max-width: 140px;">{{ item.product.title }}</td>
                <td>
                  <div class="quantity-control d-flex justify-content-center align-items-center">
                    <button
                      class="btn btn-outline-secondary btn-sm"
                      :disabled="item.qty === 1"
                      @click="item.qty--, updateCart(item)"
                    >
                      -
                    </button>
                    <label></label>
                    <input
                      type="number"
                      class="form-control text-center mx-2"
                      v-model.number="item.qty"
                      min="1"
                      disabled
                    />
                    <button
                      class="btn btn-outline-secondary btn-sm"
                      @click="item.qty++, updateCart(item)"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>NT$ {{ item.product.price }}</td>
                <td>NT$ {{ item.total }}</td>
                <td>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="deleteCart(item.id)"
                  >
                    <font-awesome-icon :icon="['far', 'trash-can']" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 總計區域 -->
        <div class="bg-light text-end py-3 px-4">
          <h4 class="text-success">總計: NT$ {{ total }}</h4>
        </div>
      </div>

      <!-- 操作按鈕區域 -->
      <div class="d-flex justify-content-between p-3">
        <router-link class="btn btn-outline-primary px-4 py-2" to="/products">
          <font-awesome-icon :icon="['fas', 'arrow-left']" /> 繼續選購
        </router-link>
        <router-link class="btn btn-success px-4 py-2" to="/checkout/order">
          前往結帳 <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </router-link>
      </div>
    </template>

    <!-- 空購物車頁面 -->
    <template v-else>
      <div class="text-center py-5">
        <div class="bg-light py-4 px-3 px-sm-5 rounded-3 shadow-sm">
          <h2 class="fw-bold mb-4" style="padding-top: 30px;">尚未有商品加入購物車</h2>
          <router-link class="btn btn-primary btn-lg fw-bolder" to="/products">
            把喜歡的商品加入購物車吧 !
          </router-link>
        </div>
      </div>
    </template>
  </div>
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
      isLoading: false,
      carts: [],
      total: 0,
    };
  },
  inject: ['mitt'],
  methods: {
    getCarts() {
      this.isLoading = true;
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.isLoading = false;
          const { carts, total } = res.data.data;
          this.carts = carts;
          this.total = total;
          console.log(carts, total);
        })
        .catch((err) => {
          const { message, success } = err.response.data;
        });
    },
    updateCart(product) {
      this.isLoading = true;
      const { qty, id } = product;
      const para = {
        data: {
          product_id: product.product_id,
          qty,
        },
      };
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`, para)
        .then((res) => {
          this.isLoading = false;
          this.getCarts();
        })
        .catch((err) => {
          const { message, success } = err.response.data;
        });
    },
    deleteCart(id) {
      this.isLoading = true;
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((res) => {
          this.isLoading = false;
          this.getCarts();
        })
        .catch((err) => {
          const { message, success } = err.response.data;
        });
    },
    deleteAllCarts() {
      this.isLoading = true;
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          this.isLoading = false;
          this.getCarts();
        })
        .catch((err) => {
          const { message, success } = err.response.data;
        });
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>
