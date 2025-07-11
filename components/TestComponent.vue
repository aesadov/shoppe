<script setup>
  import IconTwitter from '~/assets/icons/Icon-twitter.svg'
  import IconInstagram from '~/assets/icons/Icon-Instagram.svg'
  import IconFaceBook from '~/assets/icons/Icon-FB.svg'

  import { onMounted } from 'vue'
  import { useGetAllProducts } from '@/composables/api/products/getAllProducts'
  import { useAddNewPropduct } from '@/composables/api/products/addNewProduct'
  import { useGetASingleProduct } from '@/composables/api/products/getASingleProduct'
  import { useUpdateAPropduct } from '@/composables/api/products/updateAProduct'
  import { useGetAllCarts } from '@/composables/api/carts/getAllCarts'
  import { useAddNewCart } from '@/composables/api/carts/addNewCart'
  import { useGetASingleCart } from '@/composables/api/carts/getASingleCart'
  import { useUpdateACart } from '@/composables/api/carts/updateACart'
  import { useDeleteACart } from '@/composables/api/carts/deleteACart'
  import { useDeleteAProduct } from '@/composables/api/products/deleteAProduct'
  import { useGetAllUsers } from '@/composables/api/users/getAllUsers'
  import { useAddNewUser } from '@/composables/api/users/addNewUser'
  import { useGetASingleUser } from '@/composables/api/users/getASingleUser'
  import { useUpdateUser } from '@/composables/api/users/updateUser'
  import { useDeleteAUser } from '@/composables/api/users/deleteUser'
  import { useLogin } from '@/composables/api/auth/login'

  // onMounted(async () => {
  //   const products = await useGetAllProducts();
  //   console.log(products);
  // })

  // onMounted(async () => {
  //   const newProduct = {
  //     title: "pixel 8a",
  //     price: 29000,
  //     description: "pixel-phone",
  //     category: "smartphones",
  //     image: 'image of product',
  //   }
  //   const product = await useAddNewPropduct(newProduct);
  //   console.log(product);
  // })

  // onMounted(async () => {
  //   const product = await useGetASingleProduct(9);
  //   console.log(product);
  // })

  // onMounted(async () => {
  //   const product = {
  //     id: 19,
  //     title: "shulz krabi",
  //     price: 29000,
  //     description: "good bike",
  //     category: "bikes",
  //     image: 'image of bike',
  //   }
  //   const updatedProduct = await useUpdateAPropduct(product);
  //   console.log(updatedProduct);
  // })

  // onMounted(async () => {
  //   const product = await useGetASingleProduct(9);
  //   console.log(product);
  // })

  // onMounted(async () => {
  //   const deletedProduct = await useDeleteAProduct(7);
  //   console.log(deletedProduct);
  // })

  // onMounted(async () => {
  //   const allCarts = await useGetAllCarts();
  //   console.log(allCarts);
  // })

  // onMounted(async () => {
  //   const newCart = await useAddNewCart(123, [{id: 123}, {
  //   id: 19,
  //   title: "shulz krabi",
  //   price: 29000,
  //   description: "good bike",
  //   category: "bikes",
  //   image: 'image of bike',
  // }])
  //   console.log(newCart);
  // })

  // onMounted(async () => {
  //   const singleCart = await useGetASingleCart(3);
  //   console.log(singleCart);
  // })

  // onMounted(async () => {
  //   const cart = {
  //     id: 5,
  //     userId: 3,
  //     products: [
  //       {
  //         id: 19,
  //         title: "shulz krabi",
  //         price: 29000,
  //         description: "good bike",
  //         category: "bikes",
  //         image: 'image of bike',
  //       },
  //       {
  //         title: "pixel 8a",
  //         price: 29000,
  //         description: "pixel-phone",
  //         category: "smartphones",
  //         image: 'image of product',
  //       }
  //     ]
  //   }
  //   const updatedCart = await useUpdateACart(cart);
  //   console.log(updatedCart);
  // })

  // onMounted(async () => {
  //   const deletedCart = await useDeleteACart(7);
  //   console.log(deletedCart);
  // })

  // onMounted(async () => {
  //   const users = await useGetAllUsers();
  //   console.log(users);
  // })

  // onMounted(async () => {
  //   const newUser = await useAddNewUser('simpson', 'simpson@mail.com', 'pass')
  //   console.log(newUser)
  // })

  // onMounted(async () => {
  //   const singleUser = await useGetASingleUser(3);
  //   console.log(singleUser);
  // })

  // onMounted(async () => {
  //   const updatedUser = await useUpdateUser({id: 3, username: 'simpson'});
  //   console.log(updatedUser);
  // })

  // onMounted(async () => {
  //   const deletedUser = await useDeleteAUser(10);
  //   console.log(deletedUser);
  // })

  // onMounted(async () => {
  //   const authToken = await useLogin('johnd', 'm38rmF$');
  //   console.log(authToken);
  // })
</script>

<template>
  <div class="test-container">
    <div class="test-logo">LOGO</div>
    <div class="test-text">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro quis, dignissimos culpa
      incidunt ipsam nihil natus esse sed perferendis! Delectus magni facere totam obcaecati ratione
      est eligendi, voluptatibus, natus temporibus aliquam veniam, error incidunt eum? Eveniet
      veniam quod, dolores quisquam accusantium itaque saepe? Non, impedit exercitationem quaerat
      similique dolores quisquam amet earum ad, culpa quo odio sint minima soluta fugit id
      necessitatibus dolorem voluptates accusamus perferendis commodi illo excepturi eligendi
      ratione inventore? Ullam nihil veniam adipisci deserunt qui natus debitis quasi? Voluptatibus
      magnam sunt ipsum ut, provident optio corrupti aperiam sapiente nobis accusamus necessitatibus
      natus eaque tempore perferendis, ratione illo?
    </div>
    <IconTwitter class="icon" />
    <IconInstagram class="icon" />
    <IconFaceBook class="icon" />
  </div>
</template>

<style lang="scss" scoped>
  .test-container {
    background-color: #c5f6e9;
  }

  .test-logo {
    font-family: $logoFontFamily;
    font-weight: 400;
    color: $accent-color;
  }

  .test-text {
    font-family: $textFontFamily;
    font-weight: 400;
    color: $primary-color;
  }

  .icon {
    margin-right: 10px;
    color: $main-text-color;

    &:hover {
      color: #fff;
    }
  }
</style>
