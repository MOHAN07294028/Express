const express = require('express')
const app = express();
app.use(express.json());
const router = express.Router()

let data = [
    {
        name:'Mohan',
        age:23
    },
    {
        name:'kaviya',
        age:21
    },
    {
        name:'Nagutha',
        age:25
    }
]

// GET METHOD
router.get('/numbers',(req,res)=>{
    res
    .status(200)
    .send({
        message:'Success',
        Items_0:data
    })
})

// GET METHOD WITH ID
router.get('/:ind',(req,res)=>{
    if(Number(req.params.ind)<data.length){
        res
        .status(200)
        .send({
            message:'Success',
            Items_0:data[req.params.ind]
        })
    }
    else{
        res.status(400).send('Data illa da...')
    }
   
})

// POST METHOD 
router.post('/',(req,res)=>{
    data.push(req.body)
    res
    .status(201)
    .send({
        message:'Added',
        Items_0:data
    })
})

// PUT METHOD
router.put('/:ind',(req,res)=>{
    if(Number(req.params.ind) < data.length){
        data.splice(req.params.ind,1,req.body)
        res
        .status(200)
        .send({
            message:'Update successfully',
            Items_0:data
        })
    }
    else{
        res
        .status(400)
        .send({
            message:'Vaipu illa da raja...'
        })
    }
})

// DELETE METHOD
router.delete('/:ind',(req,res)=>{
    if(Number(req.params.ind < data.length)){
        data.splice(req.params.ind,1)
        res
        .status(200)
        .send({
            message:'Delete Successfully',
            Items_0:data
        })
    }
    else{
        res
        .status(400)
        .send({
            message:'Ethir pakra data illa da nanbaa...'
        })
    }
    
})



module.exports = router;