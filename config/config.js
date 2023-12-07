require("dotenv").config();

module.exports = {
  development: {
    username: "sql12668401",
    password: "Zg2bvSR6Fj",
    database: "sql12668401",
    host: "sql12.freesqldatabase.com",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "sql12668401",
    password: "Zg2bvSR6Fj",
    database: "sql12668401",
    host: "sql12.freesqldatabase.com",
    dialect: "mysql",
  },
};
