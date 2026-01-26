<script setup lang="ts">
  import IconStarBlack from '~/assets/icons/Icon-star-black.svg'
  import IconStarWhite from '~/assets/icons/Icon-star-white.svg'

  interface Props {
    blackStars: number
    whiteStars: number
  }

  const { blackStars, whiteStars } = defineProps<Props>()
</script>
<template>
  <IconStarBlack v-for="value in blackStars" :key="value" class="stars" />
  <IconStarWhite v-for="value in whiteStars" :key="value" class="stars" />
</template>

<style lang="scss" scoped>
  .stars {
    margin-right: 10px;
  }
</style>
