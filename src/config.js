let config
try {
  config = require('../config.js')
} catch (e) {
  config = require('../config.example.js')
}
export default config
