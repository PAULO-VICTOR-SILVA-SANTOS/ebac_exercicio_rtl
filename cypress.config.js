const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://ebac-agenda-contatos-tan.vercel.app',
    supportFile: false,
    video: false,
    screenshotOnRunFailure: true
  }
})
