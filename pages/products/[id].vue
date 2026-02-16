<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'nuxt/app'
  import type { Product, Review } from '~/types/api'
  import { useGetProduct } from '~/composables/api/products/useGetProduct'
  import ProductGalery from '~/components/productCard/ProductGalery.vue'
  import ProductInfo from '~/components/productCard/ProductInfo.vue'
  import { useNotification } from '~/composables/notification/useNotification'
  import BaseTabs from '~/components/BaseTabs.vue'
  import ProductDescription from '~/components/productCard/ProductDescription.vue'
  import AdditionalInformation from '~/components/productCard/AdditionalInformation.vue'
  import Reviews from '~/components/productCard/Reviews.vue'

  const route = useRoute()
  const { getProduct } = useGetProduct()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { showError } = useNotification()

  const product = ref<Product | null>(null)

  const productImages = computed(() => {
    if (!product.value?.image) return []
    return Array(4).fill(product.value.image)
  })

  const tabs = computed(() => [
    { name: 'description', label: 'Description' },
    { name: 'additional', label: 'Additional information' },
    { name: 'reviews', label: 'Reviews' },
  ])

  const mockedReviews = [
    {
      date: '6 may, 2020',
      name: 'Scarlett whithch',
      review:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.',
      rate: 3,
    },
    {
      date: '7 jul, 2025',
      name: 'Dmitry chel',
      review:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat',
      rate: 4,
    },
  ] as Review[]

  const reviewsCount = computed(() => mockedReviews.length)

  onMounted(async () => {
    loading.value = true
    try {
      const productId = route.params.id as string
      const id = parseInt(productId)
      product.value = await getProduct(id)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Не удалось загрузить товар'
      error.value = errorMessage
      showError(errorMessage)
    } finally {
      loading.value = false
    }
  })
</script>

<template>
  <div v-if="product" class="product">
    <div class="product__top">
      <ProductGalery :images="productImages" :loading="loading" />
      <ProductInfo :product="product" :loading="loading" />
    </div>

    <BaseTabs :tabs="tabs" :reviews-count="reviewsCount" class="product__tabs">
      <template #description>
        <ProductDescription :description="product.description" />
      </template>

      <template #additional>
        <AdditionalInformation
          :id="product.id"
          :title="product.title"
          :price="product.price"
          :category="product.category"
        />
      </template>

      <template #reviews>
        <Reviews v-if="product.rating" :reviews="mockedReviews" :product="product" />
        <div v-else>Нет отзывов</div>
      </template>
    </BaseTabs>

    <hr />

    <BaseAccordeon
      :items="tabs"
      :reviews-count="reviewsCount"
      mode="single"
      class="product__accordeon"
    >
      <template #description>
        <ProductDescription :description="product.description" />
      </template>

      <template #additional>
        <AdditionalInformation
          :id="product.id"
          :title="product.title"
          :price="product.price"
          :category="product.category"
        />
      </template>

      <template #reviews>
        <Reviews v-if="product.rating" :reviews="mockedReviews" :product="product" />
        <div v-else>Нет отзывов</div>
      </template>
    </BaseAccordeon>

    <hr />
  </div>
</template>

<style lang="scss" scoped>
  .product {
    width: 100%;
    overflow: hidden;

    hr {
      display: none;

      @media (max-width: $breakpoints-mobile) {
        display: block;
        width: 100%;
        margin-top: 18px;
        border: none;
        border-top: 1px solid $divider-color;
      }
    }

    &__top {
      display: flex;
      gap: 62px;
      width: 100%;

      @media (width <= $breakpoints-tablet) {
        flex-wrap: wrap;
        gap: 40px;
      }

      @media (max-width: $breakpoints-mobile) {
        flex-direction: column;
        gap: 24px;
      }
    }

    &__tabs {
      margin-top: 100px;

      @media (width <= $breakpoints-tablet) {
        margin-top: 32px;
      }

      @media (max-width: $breakpoints-mobile) {
        display: none;
      }
    }

    &__accordeon {
      display: none;

      @media (max-width: $breakpoints-mobile) {
        display: block;
        margin-top: 16px;
      }
    }
  }
</style>
