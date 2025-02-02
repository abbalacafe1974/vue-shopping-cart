<template>
  <Loading :active="isLoading" />
  <div class="container">
    <div class="row flex-row-reverse">
      <div class="col-md-6 p-2">
        <div class="bg-light">
          <h4 class="text-center fw-bolder p-4 m-0">購買景點明細</h4>
        </div>
        <div class="table-responsive bg-light px-4">
          <table class="table text-center align-middle m-0">
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
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
                <td class="text-nowrap">{{ item.product.title }}</td>
                <td>{{`x ${item.qty}`}}</td>
                <td class="text-nowrap">NT$ {{ item.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-end bg-light p-4">
          <div class="h5 fw-bold p-2 mb-0">總金額 : NT$ {{ order.total }}</div>
        </div>
      </div>
      <div class="col-md-6 p-2">
        <div class="bg-light">
          <h4 class="text-center fw-bolder p-4 m-0">訂單資訊</h4>
          <ul class="list-group px-4">
            <li class="list-group-item border-0 d-flex justify-content-between align-items-center">
              <span>訂購時間 : </span><span>{{ order.create_at }}</span>
            </li>
            <li class="list-group-item border-0 d-flex justify-content-between align-items-center">
              <span>訂單編號 : </span><span>{{ order.id }}</span>
            </li>
            <li class="list-group-item border-0 d-flex justify-content-between align-items-center">
              <span>付款狀態 : </span>
              <span :class="{ 'text-danger' : !order.is_paid }">
                {{ order.is_paid ? '已付款' : '尚未付款' }}
              </span>
            </li>
          </ul>
          <h4 class="text-center fw-bolder p-4 m-0">購買人資料</h4>
          <ul class="list-group px-4 pb-4">
            <li class="list-group-item border-0 d-flex justify-content-between align-items-center">
              <span>姓名 : </span><span>{{ user.name }}</span>
            </li>
            <li class="list-group-item border-0 d-flex justify-content-between align-items-center">
              <span>地址 : </span><span>{{ user.address }}</span>
            </li>
            <li class="list-group-item border-0 d-flex justify-content-between align-items-center">
              <span>電話 : </span><span>{{ user.tel }}</span>
            </li>
            <li class="list-group-item border-0 d-flex justify-content-between align-items-center">
              <span>Email : </span><span>{{ user.email }}</span>
            </li>
            <li class="list-group-item border-0">
              <span>留言 : </span>
              <p class="text-break mb-0">{{ order.message }}</p>
            </li>
          </ul>
          <div class="text-center px-4 pb-4">
            <button type="button" class="btn btn-primary" style="width: 100%;" @click="payOrder">
              馬上付款
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isLoading: false,
      order: {},
      user: {},
    };
  },
  methods: {
    getOrder() {
      this.isLoading = true;
      const { id } = this.$route.params;
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`)
        .then((res) => {
          this.isLoading = false;
          const { order } = res.data;
          if (order.is_paid === true) {
            this.$router.push(`/checkout/payed/${order.id}`);
          } else {
            this.order = order;
            this.user = order.user;
          }
        })
        .catch((err) => {
          const { message, success } = err.response.data;
        });
    },
    payOrder() {
      this.isLoading = true;
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.order.id}`)
        .then((res) => {
          this.isLoading = false;
          const { message, success } = res.data;
          this.$router.push(`/checkout/payed/${this.order.id}`);
        })
        .catch((err) => {
          const { message, success } = err.response.data;
        });
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>
