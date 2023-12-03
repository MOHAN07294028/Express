const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const callRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use('/',callRouter)
app.use('/users',usersRouter)
app.listen(PORT,()=>console.log('Service is working ' +PORT))
