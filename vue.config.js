const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: (process.env.NODE_ENV === 'production' && process.env.VUE_PUBLIC_PATH) || '/',
  productionSourceMap: false,
  transpileDependencies: true
});
