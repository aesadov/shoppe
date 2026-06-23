<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import 'swiper/css'
  import 'swiper/css/pagination'
  import { Pagination, Autoplay } from 'swiper/modules'

  const modules = [Pagination, Autoplay]

  const images = [
    { id: 1, src: generateSrc(1) },
    { id: 2, src: generateSrc(2) },
    { id: 3, src: generateSrc(3) },
    { id: 4, src: generateSrc(4) },
    { id: 5, src: generateSrc(5) },
  ]

  function generateSrc(id: number) {
    const base = 'https://via.assets.so/watch.webp'
    const params = (w: number, h: number) => `?id=${id}&q=80&w=${w}&h=${h}&fit=contain`

    return {
      desktop: `${base}${params(1240, 620)}`,
      mobile: `${base}${params(1362, 708)}`,
    }
  }
</script>

<template>
  <Swiper
    :loop="true"
    :autoplay="{ delay: 10000 }"
    :pagination="true"
    :modules="modules"
    class="my-swiper"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <div class="image-container">
        <picture>
          <source media="(max-width: 856px)" :srcset="image.src.mobile" type="image/webp" />
          <img :src="image.src.desktop" alt="Slide" class="slide-image" loading="lazy" />
        </picture>
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
    margin-bottom: 64px;
    border-radius: 16px;

    @media (max-width: $breakpoints-mobile) {
      height: 354px;
      margin-bottom: 21px;
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

    @media (max-width: $breakpoints-mobile) {
      padding: 0;
    }
  }

  .slide-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;

    @media (max-width: $breakpoints-mobile) {
      max-width: 100%;
      max-height: 100%;
    }
  }

  :deep(.swiper-pagination-bullet-active) {
    width: 16px;
    height: 16px;
    border: 2px solid #fff;
    transform: translateY(4px);

    @media (max-width: $breakpoints-mobile) {
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

    @media (max-width: $breakpoints-mobile) {
      top: auto;
      bottom: 26px;
      left: 8px;
      transform: none;
    }

    &__title {
      font-size: 33px;
      font-weight: 500;

      @media (max-width: $breakpoints-mobile) {
        font-size: 20px;
      }
    }

    &__price {
      margin: 16px 0 48px;
      font-size: 26px;
      font-weight: 400;

      @media (max-width: $breakpoints-mobile) {
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

      @media (max-width: $breakpoints-mobile) {
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
