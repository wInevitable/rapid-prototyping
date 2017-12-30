const path = require('path')

const alias = {
  actions: path.join(__dirname, 'src/app/actions'),
  authentication: path.join(__dirname, 'src/app/views/authentication'),
  components: path.join(__dirname, 'src/app/userInterface/components'),
  const: path.join(__dirname, 'src/app/const'),
  css: path.join(__dirname, 'src/www/css'),
  filters: path.join(__dirname, 'src/app/filters'),
  fonts: path.join(__dirname, 'src/www/fonts'),
  global: path.join(__dirname, 'src/app/userInterface/global'),
  infrastructure: path.join(__dirname, 'src/app/infrastructure'),
  reducers: path.join(__dirname, 'src/app/reducers'),
  shared: path.join(__dirname, 'src/app/views/shared'),
  store: path.join(__dirname, 'src/app/store'),
  theme: path.join(__dirname, 'src/app/theme'),
  typography: path.join(__dirname, 'src/app/userInterface/typography'),
  users: path.join(__dirname, 'src/app/views/users'),
  www: path.join(__dirname, 'src/www'),
}

module.exports = alias
