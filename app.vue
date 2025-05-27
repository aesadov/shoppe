<template>
  <div class="app-container">
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <TestComponent/>
  </div>
</template>

<style lang="scss">
  @use "~/assets/scss/mixins/container" as *;
  .app-container {
    @include app-container;
  }
</style>
