/* eslint-disable import/no-unresolved */
<template>
  <Loading :active="isLoading" />
  <div class="container">
    <div class="row flex-row-reverse">
      <div class="col-md-6 p-2">
        <div class="table-responsive bg-light px-4 pt-4">
          <h4 class="text-center fw-bolder mb-4">訂單內容</h4>
          <table class="table text-center align-middle m-0">
            <thead>
              <tr>
                <th class="py-2 px-0" scope="col">圖片</th>
                <th class="py-2 px-0" scope="col">名稱</th>
                <th class="py-2 px-0" scope="col">數量</th>
                <th class="py-2 px-0" scope="col">小計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in carts" :key="item.id">
                <td>
                  <div
                    class="m-auto"
                    :style="`
                      width: 6rem;
                      height: 5rem;
                      background-size: cover;
                      background-position: center center;
                      background-image: url(${item.product.imageUrl});
                    `"
                  ></div>
                </td>
                <td class="text-nowrap fw-bolder">{{ item.product.title }}</td>
                <td>{{item.qty}}</td>
                <td class="text-nowrap">NT$ {{ item.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bg-light text-end px-4 pb-4">
          <div class="border-bottom">
            <div class="p-2">總計 : NT$ {{ total }}</div>
            <div class="p-2" v-if="total !== finalTotal">
              折扣 : NT$ {{ this.total - this.finalTotal }}
            </div>
          </div>
          <div class="fs-5 fw-bold p-2 mb-0">總金額 : NT$ {{ finalTotal }}</div>
          <div
            class="input-group d-flex justify-content-end align-items-center"
            :style="{
              cursor: couponCode.length === 0 || couponCode === '' ?
              'not-allowed' : 'pointer'
            }"
          >
            <label for="coupon">
              <input
                type="text"
                name="coupon"
                :placeholder="total - finalTotal !== 0 ? '已成功套用折扣碼!!' : '輸入折扣碼'"
                :disabled="total - finalTotal !== 0 ? true : false"
                id="coupon" class="form-control"
                v-model="couponCode"
              />
            </label>
            <button
              type="button"
              class="btn btn-primary px-2"
              :disabled="couponCode.length === 0 || couponCode === '' ?
                true : false"
              @click="getDiscount"
            >
              套用
            </button>
          </div>
        </div>
        <Vue3Marquee
          class="fs-5 my-3"
          :pauseOnHover="true"
          :pauseOnClick="true"
        >
          <span style="margin: 0 30px;">
            現在只要輸入折扣碼"<span class="fs-4 fw-bolder text-danger">SuperPrice80</span>"，即可享有折扣喔 !
          </span>
          <span style="margin: 0 30px;">
            現在只要輸入折扣碼"<span class="fs-4 fw-bolder text-danger">SuperPrice80</span>"，即可享有折扣喔 !
          </span>
        </Vue3Marquee>
      </div>
      <div class="col-md-6 p-2">
        <div class="bg-light p-4">
          <h4 class="text-center fw-bolder mb-4">填寫訂單資料</h4>
          <Form ref="form" v-slot="{ errors }" @submit="createOrder">
        <!-- {{ errors }} {{errors['email']}} {{errors['姓名']}} {{errors['電話']}} {{errors['地址']}} -->
          <div class="mb-4">
            <label for="email" class="form-label">
              E-mail<span class="text-danger px-2">*</span>
            </label>
            <!-- Field 綁定 rules 和 v-model，並且使用正確的 class 綁定 -->
            <Field
              id="email"
              name="email"
              type="email"
              class="form-control"
              :rules="{ email: true, required: true }"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              v-model="user.email"
            />

            <!-- ErrorMessage 用於顯示校驗錯誤信息 -->
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-4">
            <label for="name" class="form-label">
              收件人姓名<span class="text-danger px-2">*</span>
            </label>
            <Field
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="user.name"
            />
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-4">
            <label for="tel" class="form-label">
              收件人電話<span class="text-danger px-2">*</span>
            </label>
            <Field
              id="tel"
              name="電話"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              :rules="isPhone"
              v-model="user.tel"
            />
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-4">
            <label for="address" class="form-label">
              收件人地址<span class="text-danger px-2">*</span>
            </label>
            <Field
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="user.address"
            />
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-4">
            <label for="message" class="form-label">
              留言
            </label>
            <textarea
              id="message"
              class="form-control"
              cols="30" rows="5"
              v-model="message"
              placeholder="給我們一些建議或提醒吧"
            />
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-primary">
              送出訂單
            </button>
          </div>
        </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3Marquee from 'vue3-marquee';
// import 'vue3-marquee/dist/style.css';

export default {
  components: {
    Vue3Marquee,
  },
  data() {
    return {
      isLoading: false,
      carts: [],
      finalTotal: 0,
      total: 0,
      couponCode: '',
      user: {},
      message: '',
    };
  },
  watch: {
    // 已經折扣後，input欄位就不會出現優惠碼
    total() {
      if (this.total - this.finalTotal !== 0) {
        this.couponCode = '';
      }
    },
  },
  methods: {
    getCarts() {
      this.isLoading = true;
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.isLoading = false;
          const { carts, total } = res.data.data;
          if (carts.length === 0) {
            this.$router.push('/cart');
          } else {
            this.carts = carts;
            this.total = total;
            this.finalTotal = res.data.data.final_total;
          }
        })
        .catch((err) => {
          const { message, success } = err.response.data;
        });
    },
    getDiscount() {
      this.isLoading = true;
      const para = {
        data: {
          code: this.couponCode,
        },
      };
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`, para)
        .then((res) => {
          this.isLoading = false;
          this.finalTotal = res.data.data.final_total;
          this.couponCode = '';
        })
        .catch((err) => {
          this.couponCode = '';
        });
    },
    createOrder() {
      this.isLoading = true;
      const para = {
        data: {
          user: this.user,
          message: this.message,
        },
      };
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, para)
        .then((res) => {
          this.isLoading = false;
          this.$refs.form.resetForm();
          const { orderId } = res.data;
          this.$router.push(`/checkout/pay/${orderId}`);
        })
        .catch((err) => {
          const { message, success } = err.response.data;
        });
    },
    isPhone(value) {
      const phoneRule = /^(09)[0-9]{8}$/;
      return phoneRule.test(value) ? true : '請輸入正確的電話號碼';
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>
