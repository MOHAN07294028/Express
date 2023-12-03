const express = require("express");
const routes = express.Router();
const {mongoDB,dbName,dbUrl } = require("../config/dbConnection");

const MongoClient = mongoDB.MongoClient;
const client = new MongoClient(dbUrl);

routes.get("/", async (req, res) => {
  await client.connect();
  try {
    let db = await client.db(dbName);
    let data = await db.collection('users').find().toArray();
    res.status(200).send({
      resultBoolean: 'Data fetched',
      data,
    });
  } catch (error) {
    res.status(400).send({
      resultBoolean: false,
      data:error,
    });
  } finally {
    client.close();
  }
});

routes.get('/:id',async(req,res)=>{
    await client.connect()
    try {
        let db = await client.db(dbName)
        let data = await db.collection("users").findOne({_id:new mongoDB.ObjectId(req.params.id)})
        if(data){
            res.status(200).send({
                resultBoolean: 'Data fetched',
                data,
              });
        }
        else{
            res.status(400).send({
                resultBoolean: false,
                data:data,
              });
        }
    } catch (error) {
        res.status(400).send({
            resultBoolean: false,
            data:error,
          });
    }
    finally{
        client.close()
    }
})

routes.post('/',async (req,res)=>{
    await client.connect();
    try {
        let db =await client.db(dbName)
        let data = await db.collection('users').insertOne(req.body)
        res.status(200).send({
            resultBoolean: true,
            data:'Data Saved Successfully',
          });
        } catch (error) {
          res.status(400).send({
            resultBoolean: false,
            data:error,
          });
        } finally {
          client.close();
        }
})


routes.put('/:id',async (req,res)=>{
    await client.connect()
    try {
        let db = await client.db(dbName)
        let data =await db.collection('users').updateOne({_id: new mongoDB.ObjectId(req.params.id)},{$set:req.body})
        res.status(200).send({
            resultBoolean:true,
            data:'Data updated successfully'
        })
    } catch (error) {
        res.status(400).send({
            resultBoolean: false
          });
        } finally {
          client.close();
        }
})

routes.delete('/:id',async(req,res)=>{
    await client.connect()
    try {
        let db = await client.db(dbName)
        let data = await db.collection('users').deleteOne({_id:new mongoDB.ObjectId(req.params.id)})
        res.status(200).send({
            resultBoolean: true,
            data:'Deleted Successfully',
          });
    } catch (error) {
        res.status(400).send({
          resultBoolean: false,
          data:error,
        });
      } finally {
        client.close();
      }
})

module.exports = routes;
