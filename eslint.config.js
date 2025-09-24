// eslint.config.js
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default [
  js.configs.recommended,

  {
    ignores: ['.nuxt/**', '.output/**', 'dist/**', 'node_modules/**'],
  },

  {
    files: ['**/*.{js,ts,vue}'],
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,

        // Nuxt
        defineNuxtConfig: 'readonly',
        useAsyncData: 'readonly',
        useFetch: 'readonly',
        useRuntimeConfig: 'readonly',
        useCookie: 'readonly',

        // Vue
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        ref: 'readonly',
        reactive: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',

        // Твои типы
        Product: 'readonly',
        Cart: 'readonly',
        User: 'readonly',
      },
    },

    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../*'],
              message: 'Используй абсолютные пути через @/ вместо относительных.',
            },
          ],
        },
      ],

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        { selector: 'function', format: ['camelCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',

      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'SLOT',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: false,
        },
      ],
      'vue/require-v-for-key': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/no-empty-component-block': 'error',
      'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
      'vue/html-self-closing': [
        'error',
        { html: { void: 'always', normal: 'always', component: 'always' } },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/define-props-declaration': ['error', 'type-based'],
    },
  },

  // Отключаем no-unused-vars для d.ts и Vue
  {
    files: ['**/*.d.ts', '**/*.vue'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
  },

  prettier,
]
