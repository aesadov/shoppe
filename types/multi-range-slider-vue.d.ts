declare module 'multi-range-slider-vue' {
  import { DefineComponent } from 'vue'

  interface MultiRangeSliderProps {
    min: number
    max: number
    step?: number
    minValue: number
    maxValue: number
    labels?: boolean
    style?: Record<string, string | number>
  }

  interface MultiRangeSliderEvents {
    input: (event: { minValue: number; maxValue: number }) => void
    change: (event: { minValue: number; maxValue: number }) => void
  }

  const multiRangeSlider: DefineComponent<
    MultiRangeSliderProps,
    {},
    {},
    {},
    {},
    {},
    {},
    MultiRangeSliderEvents
  >

  export default multiRangeSlider
}
