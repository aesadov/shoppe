import type { SelectOption } from '~/types/filters'
import { SortType } from '~/composables/useProductsFilters'

export const defaultSortOptions: SelectOption[] = [
  { value: SortType.PRICE_ASC, label: 'Price: Low to High' },
  { value: SortType.PRICE_DESC, label: 'Price: High to Low' },
  { value: SortType.NAME_ASC, label: 'Name: A to Z' },
  { value: SortType.NAME_DESC, label: 'Name: Z to A' },
  { value: SortType.NEWEST, label: 'Newest First' },
  { value: SortType.RATING_DESC, label: 'Highest Rated' },
]
