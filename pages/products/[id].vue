<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'nuxt/app'
  import type { Product } from '~/types/api'
  import { useGetProduct } from '~/composables/api/products/useGetProduct'
  import ProductGalery from '@/components/productCard/ProductGalery.vue'
  import ProductInfo from '@/components/productCard/ProductInfo.vue'

  const route = useRoute()
  const { getProduct } = useGetProduct()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const product = ref<Product | null>(null)

  const productImages = computed(() => {
    if (!product.value?.image) return []

    return Array(4).fill(product.value.image)
  })

  onMounted(async () => {
    loading.value = true
    try {
      const productId = route.params.id as string
      const id = parseInt(productId)
      product.value = await getProduct(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Failed to fetch product:', err)
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
  </div>
</template>

<style lang="scss" scoped>
  .product {
    width: 100%;
    overflow: hidden;

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
  }
</style>
