<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import 'swiper/css'
  import 'swiper/css/pagination'
  import { Pagination, Autoplay } from 'swiper/modules'

  const modules = [Pagination, Autoplay]

  const images = [
    'https://via.assets.so/watch.png?id=1&q=95&w=1248&h=648&fit=contain',
    'https://via.assets.so/watch.png?id=2&q=95&w=1248&h=648&fit=contain',
    'https://via.assets.so/watch.png?id=3&q=95&w=1248&h=648&fit=contain',
    'https://via.assets.so/watch.png?id=4&q=95&w=1248&h=648&fit=contain',
    'https://via.assets.so/watch.png?id=5&q=95&w=1248&h=648&fit=contain',
  ]
</script>

<template>
  <Swiper
    :loop="true"
    :autoplay="{ delay: 50000 }"
    :pagination="true"
    :modules="modules"
    class="my-swiper"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <div class="image-container">
        <img :src="image" alt="Slide" class="slide-image" />
      </div>
      <article class="product-card">
        <h2 class="product-card__title">Gold big hoops</h2>
        <p class="product-card__price">$ 68,00</p>
        <a class="product-card__link">View Product</a>
      </article>
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss" scoped>
  .my-swiper {
    --swiper-pagination-color: #ccc;
    --swiper-pagination-bullet-inactive-color: #fff;
    --swiper-pagination-bullet-inactive-opacity: 100%;
    --swiper-pagination-bottom: 24px;
    --swiper-pagination-bullet-size: 9px;
    --swiper-pagination-bullet-horizontal-gap: 13px;

    width: 100%;
    height: 100%;
    border-radius: 16px;

    @media (max-width: $breakpoints-xxl) {
      height: 354px;
      border-radius: 8px;

      --swiper-pagination-bullet-size: 4px;
      --swiper-pagination-bullet-horizontal-gap: 6px;
      --swiper-pagination-bottom: 8px;
    }
  }

  .image-container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 20px;

    @media (max-width: $breakpoints-xxl) {
      padding: 0;
    }
  }

  .slide-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;

    @media (max-width: $breakpoints-xxl) {
      max-width: 100%;
      max-height: 100%;
    }
  }

  :deep(.swiper-pagination-bullet-active) {
    width: 16px;
    height: 16px;
    border: 2px solid #fff;
    transform: translateY(4px);

    @media (max-width: $breakpoints-xxl) {
      width: 7px;
      height: 7px;
      transform: translateY(3px);
    }
  }

  .swiper-slide {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(0 0 0);
  }

  .product-card {
    position: absolute;
    top: 50%;
    left: 39px;
    color: white;
    transform: translateY(-50%);

    @media (max-width: $breakpoints-xxl) {
      top: auto;
      bottom: 26px;
      left: 8px;
      transform: none;
    }

    &__title {
      font-size: 33px;
      font-weight: 500;

      @media (max-width: $breakpoints-xxl) {
        font-size: 20px;
      }
    }

    &__price {
      margin: 16px 0 48px;
      font-size: 26px;
      font-weight: 400;

      @media (max-width: $breakpoints-xxl) {
        margin: 3px 0 10px;
        font-size: 14px;
      }
    }

    &__link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 193px;
      height: 53px;
      font-size: 20px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      border: 2px solid white;
      border-radius: 6px;

      @media (max-width: $breakpoints-xxl) {
        width: 92px;
        height: 32px;
        font-size: 12px;
        font-weight: 400;
        border: 1px solid white;
        border-radius: 4px;
      }
    }
  }
</style>
