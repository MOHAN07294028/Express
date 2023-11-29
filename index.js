console.log('Mohanraj Srinivasan')
const express = require('express');
const loginCall = require('./Routes/login')
const logoutCall = require('./Routes/logout')
const usersCall = require('./Routes/users')
const app = express();
app.use(express.json());


app.use('/login',loginCall)
app.use('/logout',logoutCall)
app.use('/users',usersCall)

// app.post('/mohan',(req,res)=>{
//     console.log(req.body)
//     res.send('Data Saved Successfully')
// })

app.get('/',(req,res)=>{
    res.send('<h1>Mohanraj Srinivasan</h1>')
})




app.listen(process.env.port || 8000,()=>console.log('App is running'))