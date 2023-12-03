const mongoDB = require('mongodb')
const dbName = process.env.DB_NAME
const dbUrl =  `${process.env.DB_URL}/${dbName}` 


module.exports = {mongoDB,dbName,dbUrl}