import { defineConfig, presetWind3, transformerDirectives } from 'unocss'

export default defineConfig({
  preflights: [],
  presets: [
    presetWind3(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    breakpoints: {
      md: '992px'
    }
  }
})
