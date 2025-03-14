<template>
  <Loading :active="isLoading" />

  <nav class="navbar fixed-top navbar-expand-lg navbar-dark" 
  style="background: linear-gradient(45deg, #1e3c72, #2a5298);" ref="nav">
    <div class="container-lg">
      <router-link
        class="navbar-brand me-auto d-flex align-items-center"
        to="/home" @click="emitRoutePath"
      >
        <img
          class="img-fluid"
          src="../assets/logo.jpg"
          alt="logo_img" style="width: 40px;"
        >
        <h1
          class="logo text-white fs-2 mb-0 px-2"
          v-if="innerWidth"
        >
          Vue Ecommerce
        </h1>
      </router-link>

      <button
        class="navbar-toggler order-lg-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        ref="buger-menu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end order-lg-1" id="navbarNav">
        <ul class="navbar-nav text-center">
          <li class="nav-item">
            <router-link class="nav-link px-3" to="/products" @click="emitRoutePath">
              商品列表
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  components: {

  },
};
</script>
