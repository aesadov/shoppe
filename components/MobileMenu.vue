<script setup lang="ts">
import IconPerson from "~/assets/icons/Icon-person.svg";
import IconExit from "~/assets/icons/Icon-exit.svg"
</script>

<template>
  <nav class="menu">
    <a>Shop</a>
    <a>Blog</a>
    <a>Our Story</a>
    <a>Contact</a>
    <a>Terms Of Services</a>
    <a>Shipping And Returns</a>
    <hr></hr>
    <a>
      <IconPerson class="menu__icon"/>
      <div>My account</div>
    </a>
    <a>
      <IconExit class="menu__icon"/>
      <div>Logout</div>
    </a>
  </nav>
</template>

<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 66px;
  left: 6px;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 1000;
  padding: 39px 20px;

  display: flex;
  flex-direction: column;
  font-size: 20px;
  margin: 39px 0 0 0;
  gap: 24px;

  a {
    display: flex;
    align-items: center;
    padding: 0;
    position: relative;
    text-decoration: none;
    color: inherit;
  }
  
  hr {
    margin: 0;
    border: none;
    border-top: 1px solid #D8D8D8;
    width: 100%;
  }
}

.menu__icon {
  margin-right: 12px;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
</style>
