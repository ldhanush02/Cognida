const exp=require('express')
const Cartapp=exp.Router()
Cartapp.use(exp.json())
const expressAsyncHandler=require('express-async-handler')

 

Cartapp.use(exp.urlencoded());

Cartapp.get('/getProducts/:userName',expressAsyncHandler(async(request,response)=>{
    let userName=request.params.userName
    // console.log(userName)
    let cartCollectionObject=request.app.get('cartCollectionObject');
    let users= await cartCollectionObject.find({UserName:userName}).toArray();
    response.send({message:'This is cart info',payload: users })
}))

Cartapp.post('/create-users',expressAsyncHandler(async(request,response)=>{
    let newUser=request.body.userObj
    console.log(newUser)
    let userCollectionObject=request.app.get('userCollectionObject');
    let resultOfUserName= await userCollectionObject.findOne({Name:newUser.Name});
    if(resultOfUserName !==null){
        response.send({message:'Username already exits'})
        console.log(resultOfUserName)
    }
    else{
        

        let hashedPassword= await bcryptjs.hash(newUser.Password,5);
        newUser.Password=hashedPassword;
        let result =await userCollectionObject.insertOne(newUser);
        response.send({message:'User has created Successfully.Now please Login'})
        console.log(resultOfUserName)
    }

}))

Cartapp.post('/addToCart',expressAsyncHandler(async(request,response)=>{
    let newUser=request.body
    let cartCollectionObject=request.app.get('cartCollectionObject');
    let result =await cartCollectionObject.insertOne(newUser);
    response.send({message:'User has created Successfully.Now please Login'})
    console.log(newUser)

}))

Cartapp.post('/addAllItems/:userName',expressAsyncHandler(async(request,response)=>{
    let newUser=request.body
    let userName=request.params.userName
    let orderCollectionObject=request.app.get('orderCollectionObject');
    let result =await orderCollectionObject.insertMany(newUser);
    let cartCollectionObject=request.app.get('cartCollectionObject');
    let result1 =await cartCollectionObject.deleteMany({UserName:userName});
    response.send({message:'All items added to order',payload:[]})
    console.log(newUser)

}))
Cartapp.put('/login',expressAsyncHandler(async(request,response)=>{
    let updateBody=request.body
    let userName=updateBody.Name
    let cartCollectionObject=request.app.get('cartCollectionObject');
    let resultOfUserName= await userCollectionObject.findOne({Name: userName});
    
    if(resultOfUserName!=null){
        let Newpassword=updateBody.Password;
        let hashedPassword=await bcryptjs.hash(Newpassword,5);
        let result= await userCollectionObject.updateOne({Name:userName},{$set:{Password:hashedPassword}});
        response.send({message:'Password Changed'})

    }
    else{
        response.send({message:'User not found. Please Signup'})
    }
        
    
}))

Cartapp.put('/ChangePassword',expressAsyncHandler(async(request,response)=>{
    let userBody=request.body
    let userCollectionObject=request.app.get('userCollectionObject');
    let resultOfUserName= await userCollectionObject.findOne({Name: userBody.Name});
    if(resultOfUserName!=null){
        let result= await bcryptjs.compare(userBody.CurrentPassword,resultOfUserName.Password);
        if(result==false){
            response.send({message:"Invalid password"})
        }
        else{
        let Newpassword=userBody.NewPassword;
        let hashedPassword=await bcryptjs.hash(Newpassword,5);
        let result1= await userCollectionObject.updateOne({Name: userBody.Name},{$set:{Password:hashedPassword}});
        response.send({message:'Password Changed'})
    }

    }
    else{
        response.send({message:'User not found. Please Signup'})
    }
    
}))

Cartapp.delete('/deleteCart/:timeStramp/:userName',expressAsyncHandler(async(request,response)=>{
    let deleteUsername=request.params.userName
    let timeStramp=request.params.timeStramp
    timeStramp=parseInt(timeStramp)
    let cartCollectionObject=request.app.get('cartCollectionObject')
    let result=cartCollectionObject.deleteOne({$and:[{timeStramp:timeStramp},{UserName:deleteUsername}]})
    console.log(typeof deleteUsername+" "+typeof timeStramp+' '+result)
    response.send({message:'items is deleted'})


}))

module.exports=Cartapp