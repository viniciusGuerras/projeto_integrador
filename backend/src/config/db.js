const pgp = require('pg-promise')
const db = pgp('postgres://postgres:postgres@host:/postgres')

module.exports = db;