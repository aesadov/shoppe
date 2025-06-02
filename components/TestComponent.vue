<script>
  import { onMounted } from 'vue';
  import {useGetAllProducts} from '@/composables/api/products/getAllProducts'
  import {useAddNewPropduct} from '@/composables/api/products/addNewProduct'
  import {useGetASingleProduct} from '@/composables/api/products/getASingleProduct'
  import {useUpdateAPropduct} from '@/composables/api/products/updateAProduct'
  import {useGetAllCarts} from '@/composables/api/carts/getAllCarts'
  import {useAddNewCart} from '@/composables/api/carts/addNewCart'
  import {useGetASingleCart} from '@/composables/api/carts/getASingleCart'
  import {useUpdateACart} from '@/composables/api/carts/updateACart'
  import {useDeleteACart} from '@/composables/api/carts/deleteACart'
  import {useDeleteAProduct} from '@/composables/api/products/deleteAProduct'
  import {useGetAllUsers} from '@/composables/api/users/getAllUsers'
  import {useAddNewUser} from '@/composables/api/users/addNewUser'
  import {useGetASingleUser} from '@/composables/api/users/getASingleUser'
  import {useUpdateUser} from '@/composables/api/users/updateUser'
  import {useDeleteAUser} from '@/composables/api/users/deleteUser'
  import {useLogin} from '@/composables/api/auth/login'

  // export default {
  // setup() {
  //   onMounted(async () => {
  //     const products = await useGetAllProducts();
  //     console.log(products);
  //   });

  //   return {};
  //   }
  // }

  // export default {
  // setup() {
  //   onMounted(async () => {
      // const newProduct = {
      //   title: "pixel 8a",
      //   price: 29000,
      //   description: "pixel-phone",
      //   category: "smartphones",
      //   image: 'image of product',
      // }
  //     const product = await useAddNewPropduct(newProduct);
  //     console.log(product);
  //   });

  //   return {};
  //   }
  // }

  // export default {
  // setup() {
  //   onMounted(async () => {
  //     const product = await useGetASingleProduct(9);
  //     console.log(product);
  //   });

  //   return {};
  //   }
  // }
  
  // export default {
  // setup() {
  //   onMounted(async () => {
  //     const product = {
  //       id: 19,
  //       title: "shulz krabi",
  //       price: 29000,
  //       description: "good bike",
  //       category: "bikes",
  //       image: 'image of bike',
  //     }
  //     const updatedProduct = await useUpdateAPropduct(product);
  //     console.log(updatedProduct);
  //   });

  //   return {};
  //   }
  // }

  // export default {
  // setup() {
  //   onMounted(async () => {
  //     const product = await useGetASingleProduct(9);
  //     console.log(product);
  //   });

  //   return {};
  //   }
  // }

  // export default {
  // setup() {
  //   onMounted(async () => {
  //     const deletedProduct = await useDeleteAProduct(9);
  //     console.log(deletedProduct);
  //   });

  //   return {};
  //   }
  // }

  // export default {
  // setup() {
  //     onMounted(async () => {
  //       const allCarts = await useGetAllCarts();
  //       console.log(allCarts);
  //     })

  //     return {};
  //   }
  // }

  // export default {
  // setup() {
  //     onMounted(async () => {
      //   const newCart = await useAddNewCart(123, [{id: 123}, {
      //   id: 19,
      //   title: "shulz krabi",
      //   price: 29000,
      //   description: "good bike",
      //   category: "bikes",
      //   image: 'image of bike',
      // }])
  //       console.log(newCart);
  //     })

  //     return {};
  //   }
  // }

  // export default {
  // setup() {
  //     onMounted(async () => {
  //       const singleCart = await useGetASingleCart(3);
  //       console.log(singleCart);
  //     })

  //     return {};
  //   }
  // }

  // export default {
  // setup() {
  //     onMounted(async () => {
  //       const cart = {
  //         id: 5,
  //         userId: 3,
  //         products: [
  //           {
  //             id: 19,
  //             title: "shulz krabi",
  //             price: 29000,
  //             description: "good bike",
  //             category: "bikes",
  //             image: 'image of bike',
  //           },
  //           {
  //             title: "pixel 8a",
  //             price: 29000,
  //             description: "pixel-phone",
  //             category: "smartphones",
  //             image: 'image of product',
  //           }
  //         ]
  //       }
  //       const updatedCart = await useUpdateACart(cart);
  //       console.log(updatedCart);
  //     })

  //     return {};
  //   }
  // }

  // export default {
  // setup() {
  //     onMounted(async () => {
  //       const deletedCart = await useDeleteACart(7);
  //       console.log(deletedCart);
  //     })

  //     return {};
  //   }
  // }

  // export default {
  // setup() {
  //   onMounted(async () => {
  //     const users = await useGetAllUsers();
  //     console.log(users);
  //   });

  //   return {};
  //   }
  // }

  // export default {
  // setup() {
  //   onMounted(async () => {
  //     const newUser = await useAddNewUser('simpson', 'simpson@mail.com', 'pass')
  //     console.log(newUser)
  //   })

  //   return {}
  //   }
  // }

  // export default {
  // setup() {
  //     onMounted(async () => {
  //       const singleUser = await useGetASingleUser(3);
  //       console.log(singleUser);
  //     })

  //     return {};
  //   }
  // }

  // export default {
  // setup() {
  //     onMounted(async () => {
  //       const updatedUser = await useUpdateUser({id: 3, username: 'simpson'});
  //       console.log(updatedUser);
  //     })

  //     return {};
  //   }
  // }

  // export default {
  // setup() {
  //   onMounted(async () => {
  //     const deletedUser = await useDeleteAUser(10);
  //     console.log(deletedUser);
  //   });

  //   return {};
  //   }
  // }

  // export default {
  // setup() {
  //   onMounted(async () => {
  //     const authToken = await useLogin('johnd', 'm38rmF$');
  //     console.log(authToken);
  //   });

  //   return {};
  //   }
  // }



</script>

<template>
    <div class="test-container">
      <div class="test-logo">LOGO</div>
      <div class="test-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro quis, dignissimos culpa incidunt ipsam nihil natus esse sed perferendis! Delectus magni facere totam obcaecati ratione est eligendi, voluptatibus, natus temporibus aliquam veniam, error incidunt eum? Eveniet veniam quod, dolores quisquam accusantium itaque saepe? Non, impedit exercitationem quaerat similique dolores quisquam amet earum ad, culpa quo odio sint minima soluta fugit id necessitatibus dolorem voluptates accusamus perferendis commodi illo excepturi eligendi ratione inventore? Ullam nihil veniam adipisci deserunt qui natus debitis quasi? Voluptatibus magnam sunt ipsum ut, provident optio corrupti aperiam sapiente nobis accusamus necessitatibus natus eaque tempore perferendis, ratione illo?</div>
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
</style>