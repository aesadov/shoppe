declare interface Rating {
  rate: number
  count: number
}

declare interface Product {
  id?: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: Rating
}

declare interface ProductInCart {
  productId: number
  quantity: number
}

declare interface Cart {
  id: number
  userId: number
  date?: string
  products: ProductInCart[] | Product[]
  __v?: number
}

declare interface Adress {
  geolocation: {
    lat: string
    long: string
  }
  city: string
  street: string
  number: number
  zipcode: string
}

declare interface User {
  adress?: Adress
  id: number
  email?: string
  username?: string
  password?: string
  name?: {
    firstname: string
    lastname: string
  }
  phone?: string
  __v?: number
}
