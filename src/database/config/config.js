require('dotenv').config()
module.exports = {
  "development": {
    "username": "root",
    "password": process.env.PASSWORD_DB,
    "database": "tu_tienda_web",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": process.env.PORT_DB
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "b31b6829aa6e45",
    "password": "08711cea",
    "database": "heroku_f7afb2e4e2ed803",
    "host": "us-cdbr-east-04.cleardb.com",
    "dialect": "mysql"
  }
}
