module.exports = {
  knex: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'steamdb'
      // debug: true
    }
  },
  server: {
    port: 3011
  },
  auth: {
    token: '!!! You Should Change This !!!'
  }
}
