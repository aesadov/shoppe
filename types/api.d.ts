export interface Rating {
  rate: number
  count: number
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: Rating
}

export interface ProductInCart {
  productId: number
  quantity: number
}

export interface Cart {
  id: number
  userId: number
  products: CartItem[]
}

export interface CartToServer {
  id: number
  userId: number
  products: ProductInCart[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface Adress {
  geolocation: {
    lat: string
    long: string
  }
  city: string
  street: string
  number: number
  zipcode: string
}

export interface User {
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

export interface Review {
  date: string
  name: string
  review: string
  rate: number
}
