export interface FiltersState {
  search: string
  category: string
  sortBy: string
  minPrice: number
  maxPrice: number
  onSale: boolean
  inStock: boolean
}

export interface SelectOption {
  value: string
  label: string
}
