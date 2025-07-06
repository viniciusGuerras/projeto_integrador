const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:example@localhost:5433/mydatabase');

module.exports = db;