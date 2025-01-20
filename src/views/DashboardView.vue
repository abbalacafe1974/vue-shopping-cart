<template>
  <Navbar></Navbar>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
  </div>
</template>

<script>
  import emitter from '@/methods/emitter';
  import ToastMessages from '@/components/ToastMessages.vue';
  import Navbar from '../components/Navbar.vue';

  export default {
    components: {
      Navbar,
      ToastMessages,
    },
    // 吐司(toast)訊息回饋
    provide() {
      return {
        emitter,
      };
    },
    created() {
      // 將存在cookie裡面的token取出來，並透過headers發送，還有驗證與轉址
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      console.log(token);
      this.$http.defaults.headers.common.Authorization = `${token}`;
      const api = `${process.env.VUE_APP_API}v2/api/user/check`;
        // console.log('API URL:', api);
        // 應用Axios的post方法
      this.$http.post(api, this.user)
        .then((res) => {
          console.log(res);
          // 若登入失敗，轉回登入頁面
          if (!res.data.success) {
            this.$router.push('/login');
          }
        },
      );
    },
  };
</script>
