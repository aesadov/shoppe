<script setup lang="ts">
  import { ref } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import type { Swiper as SwiperType } from 'swiper'
  import SkeletonImg from '~/components/skeletons/SkeletonImg.vue'

  import 'swiper/css'
  import 'swiper/css/free-mode'
  import 'swiper/css/navigation'
  import 'swiper/css/thumbs'

  import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

  interface Props {
    images: string[]
    loading: boolean
  }

  const props = defineProps<Props>()

  const thumbsSwiper = ref<SwiperType | null>(null)
  const mainSwiper = ref<SwiperType | null>(null)
  const progress = ref(0)

  const modules = [FreeMode, Navigation, Thumbs]

  const onThumbsSwiper = (swiper: SwiperType) => {
    thumbsSwiper.value = swiper
  }

  const onMainSwiper = (swiper: SwiperType) => {
    mainSwiper.value = swiper
    progress.value = (swiper.activeIndex + 1) / swiper.slides.length
  }

  const onSlideChange = (swiper: SwiperType) => {
    progress.value = (swiper.activeIndex + 1) / swiper.slides.length
  }

  watch(
    () => props.images,
    (newImages) => {
      if (newImages.length > 0) {
        progress.value = 1 / newImages.length
      } else {
        progress.value = 0
      }
    },
    { immediate: true },
  )
</script>

<template>
  <div v-if="loading" class="galery-sceleton">
    <SkeletonImg />
  </div>
  <div v-if="images.length > 0 && loading === false" class="galery">
    <div class="galery__container">
      <Swiper
        :modules="modules"
        direction="vertical"
        :spaceBetween="40"
        :slidesPerView="4"
        :freeMode="true"
        :watchSlidesProgress="true"
        class="galery__thumbs"
        @swiper="onThumbsSwiper"
      >
        <SwiperSlide v-for="(img, i) in images" :key="i">
          <div class="galery__thumb-wrapper">
            <img :src="img" :alt="`Thumb ${i + 1}`" class="galery__thumb-img" />
          </div>
        </SwiperSlide>
      </Swiper>

      <Swiper
        :modules="modules"
        :thumbs="{ swiper: thumbsSwiper }"
        class="galery__main"
        @swiper="onMainSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="(img, i) in images" :key="i">
          <div class="galery__main-image">
            <img :src="img" :alt="`Image ${i + 1}`" class="galery__main-img" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="galery__progress">
      <div class="galery__progress-fill" :style="{ width: `${progress * 100}%` }" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .galery-sceleton {
    width: 700px;
    height: 600px;

    @media (max-width: $breakpoints-mobile) {
      max-width: 100%;
      height: 374px;
    }
  }

  .galery {
    max-width: 700px;

    @media (max-width: $breakpoints-mobile) {
      max-width: 100%;
    }

    &__container {
      display: flex;
      gap: 39px;
    }

    &__thumbs {
      width: 120px;
      height: 600px;

      @media (max-width: $breakpoints-mobile) {
        display: none;
      }
    }

    &__thumb-wrapper {
      width: 100%;
      height: 100%;
      overflow: hidden;
      cursor: pointer;
      border-radius: 8px;
    }

    &__thumb-img {
      width: 100%;
      height: 120px;
      object-fit: contain;
      background-color: $product-card-background;
      border-radius: 6px;
      opacity: 0.6;
    }

    &__main {
      position: relative;
      flex: 1;
      height: 600px;

      @media (max-width: $breakpoints-mobile) {
        height: 374px;
      }
    }

    &__main-image {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: $product-card-background;
      border-radius: 12px;
    }

    &__main-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &__progress {
      max-width: 540px;
      height: 2px;
      margin-top: 24px;
      margin-left: auto;
      background-color: $divider-color;
      border-radius: 2px;

      @media (max-width: $breakpoints-mobile) {
        margin-top: 16px;
      }
    }

    &__progress-fill {
      height: 100%;
      background-color: $main-text-color;
      transition: width 0.3s ease;
    }

    &_no-images {
      padding: 40px;
      text-align: center;
    }
  }

  :deep(.swiper-slide-thumb-active) .galery__thumb-img {
    box-shadow: 0 0 0 2px $accent-color;
    opacity: 1;
  }
</style>
