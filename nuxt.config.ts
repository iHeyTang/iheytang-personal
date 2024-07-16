// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  extends: ["@nuxt/ui-pro"],
  modules: ["@nuxt/ui", "@nuxt/image"],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  ui: {
    icons: ["mdi"],
  },
  ssr: true,
});