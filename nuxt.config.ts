// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/fonts'],

  pages: {
    pattern: ['**/*.vue', '!**/components/**']
  },

  components: [
    {
      path: '~/components'
    },
    {
      path: '~/pages',
      pattern: '**/components/**/*.vue',
      pathPrefix: true
    }
  ],

  devtools: {
    enabled: true
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://font.webcache.cn/google/css2?family=Liu+Jian+Mao+Cao&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=ZCOOL+QingKe+HuangYou&display=swap" rel="stylesheet'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
        quotes: 'single',
        semi: false,
        indent: 2
      }
    }
  },

  fonts: {
    provider: 'local'
  }
})
