const Pool = require('pg').Pool;

const pool = new Pool({
    user: "hhemstreet",
    password: "password",
    host: "localhost",
    port: "5432",
    database: "mixme"
});

module.exports = pool;