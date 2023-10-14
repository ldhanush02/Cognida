const exp=require("express");
const Cartapp = require("./API/cart");
const Orderapp=require("./API/order")
// const Favoriteapp=require("./API/favorite");
const app=exp()
require('dotenv').config()

app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));
const path=require('path');
app.use(exp.static(path.join(__dirname,"./build")))
const Userapp=require("./API/user")
const Dburl="mongodb+srv://ldhanush02:Dhanush*123@databasecluster.xldj4.mongodb.net/Cognida2023?retryWrites=true&w=majority"
const mclient=require("mongodb").MongoClient;
app.use('/user-api',Userapp)
app.use('/cart-api',Cartapp)
app.use('/order-api',Orderapp)
// app.use('/favorite-api',Favoriteapp)
const NODE_ENV="production"
// ---------------deployment--------------- 
if (NODE_ENV==="production"){
    app.use(exp.static(path.join(__dirname,"./build")))
    app.get(/^\/(?!api).*/, (req, res) => { // don't serve api routes to react app
      res.sendFile(path.join(__dirname, './build/index.html'));
    });
    app.get('*',(request,response)=>{
      response.sendFile(path.resolve(__dirname,'build','index.html'))
    })
  }
  
  
  // ---------------deployment----------------



mclient.connect(Dburl)
.then((client)=>{
    let dbObj=client.db("Cognida2023");
    let userCollectionObject=dbObj.collection("userCollections");
    let productCollectionObject=dbObj.collection("productCollection");
    let cartCollectionObject=dbObj.collection("cartCollection");
    let orderCollectionObject=dbObj.collection("orderCollection");
    app.set('userCollectionObject',userCollectionObject);
    app.set('productCollectionObject',productCollectionObject);
    app.set('cartCollectionObject',cartCollectionObject);
    app.set('orderCollectionObject',orderCollectionObject);
    // app.set('cartCollectionObject',cartCollectionObject);

    console.log("DB connection is successful")
})
.catch(err=>console.log("Error occured in connection to DB is ",err))

app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
})

app.use((request,response,next)=>{
    response.send({message:"Invalid path",reason:`${request.url}`})
})

app.use((error,request,response,next)=>{
    response.send({message:'Error',payload:`Error is ${error.message}`})
})

app.listen(3000,()=>console.log("Server is listening at port number 3000"))