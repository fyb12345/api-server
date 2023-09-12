const mysql = require("mysql");


const db= mysql.createPool({
  host:'123.57.59.51',
  user:'root',
  password:'Strong_Password123!',
  database:'my_db_01'
});


module.exports =db;
