const express = require('express')
const callRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const PORT = process.env.PORT || 8001
const app = express()
app.use(express.json())


app.use('/',callRouter)
app.use('/users',usersRouter)

app.listen(PORT,()=>console.log('Service is working '+PORT))