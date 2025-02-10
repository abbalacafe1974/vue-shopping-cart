<template>
  <div class="container my-5" style="padding-top: 40px;">
    <!-- Hero Section with Animation -->
    <section class="hero text-center animate__animated animate__fadeInUp">
      <h2 class="hero-title">擁抱未來的時尚</h2>
      <p class="hero-subtitle">發現前所未有的新風格與趨勢</p>
      <a 
        href="#products" 
        class="btn btn-primary btn-lg hero-btn animate__animated animate__fadeInUp animate__delay-1s" 
        to="/products" 
        @click="emitRoutePath">
        現在探索
      </a>
    </section>

    <!-- Animated Image Gallery -->
    <section id="explore" class="gallery py-5">
      <div class="row">
        <div class="col-md-4 mb-4 animate__animated animate__zoomIn">
          <div class="image-box">
            <img :src="imageSrc1" alt="Image 1" class="img-fluid">
            <div class="overlay">
              <p class="overlay-text">時尚與現代感</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4 animate__animated animate__zoomIn animate__delay-1s">
          <div class="image-box">
            <img :src="imageSrc2" alt="Image 2" class="img-fluid">
            <div class="overlay">
              <p class="overlay-text">潮流與大膽</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4 animate__animated animate__zoomIn animate__delay-2s">
          <div class="image-box">
            <img :src="imageSrc3" alt="Image 3" class="img-fluid">
            <div class="overlay">
              <p class="overlay-text">新鮮與創新</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action with Animation -->
    <section class="cta text-center py-5 animate__animated animate__fadeInUp">
      <h3 class="cta-title">準備好提升你的風格了嗎？</h3>
      <p class="cta-subtitle">加入我們，重新定義你的時尚感</p>
      <a href="#" class="btn btn-danger btn-lg animate__animated animate__fadeInUp animate__delay-1s">立即加入</a>
    </section>
  </div>
</template>

<script>
import '@/assets/stylesheets/hero.css';
import image1 from '@/assets/Fresh and New.jpg';
import image2 from '@/assets/Stylish and Modern.jpg';
import image3 from '@/assets/fresh.jpg';

export default {
  data() {
    return {
      imageSrc1: image1,
      imageSrc2: image2,
      imageSrc3: image3,
    };
  },
};
</script>
