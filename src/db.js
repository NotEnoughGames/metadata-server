import config from './config'
import Knex from 'knex'

const db = Knex(config.knex)
export default db
