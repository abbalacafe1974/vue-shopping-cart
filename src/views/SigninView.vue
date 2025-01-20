<template>
  <div class="container mt-5">
    <form class="row justify-content-center"
      @submit.prevent="signIn"
    >
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" >Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" >Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
console.log(process.env.VUE_APP_API);
  export default {
    data() {
      return {
        user: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
      signIn() {
        const api = `${process.env.VUE_APP_API}v2/admin/signin`;
        // console.log('API URL:', api);
        // 應用Axios的post方法
        this.$http.post(api, this.user)
          .then((res) => {
            if (res.data.success) {
              const { token, expired } = res.data;
              // console.log(token, expired);
              document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
              console.log(res, res.data);
              // 若登入成功，轉回dashboard頁面
              this.$router.push('/dashboard/products');
            }
          })
          .catch((err) => {
            console.error('Login failed:', err.response?.data || err.message);
          });
      },
    },
  };
</script>
