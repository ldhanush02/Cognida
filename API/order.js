const exp=require('express')
const Orderapp=exp.Router()
Orderapp.use(exp.json())
const expressAsyncHandler=require('express-async-handler')



Orderapp.use(exp.urlencoded());

Orderapp.get('/getOrders/:userName',expressAsyncHandler(async(request,response)=>{
    let userName=request.params.userName
    let orderCollectionObject=request.app.get('orderCollectionObject');
    let users= await orderCollectionObject.find({UserName:userName}).toArray();
    response.send({message:'This is order info',payload: users })
}))

Orderapp.get('/mostPrefered',expressAsyncHandler(async(request,response)=>{
    let productCollectionObject=request.app.get('productCollectionObject');
    let products= await productCollectionObject.find().toArray();
    const preferences = products.map(product => {
        const averageRating = product.rating.rate;
        const totalRatings = product.rating.count;
        const preference = averageRating * totalRatings; // Adjust the calculation as needed
        return { ...product, preference };
      });
      preferences.sort((a, b) => b.preference - a.preference);
    //   preferences.slice(0, 5);
    // console.log("hello")
    response.send({message:'This is order info',payload: preferences.slice(0, 6) })
}))

Orderapp.post('/create-users',expressAsyncHandler(async(request,response)=>{
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

Orderapp.post('/addToOrder',expressAsyncHandler(async(request,response)=>{
    let newUser=request.body
    let orderCollectionObject=request.app.get('orderCollectionObject');
    let result =await orderCollectionObject.insertOne(newUser);
    response.send({message:'Order placed'})
    console.log(newUser)

}))

Orderapp.put('/login',expressAsyncHandler(async(request,response)=>{
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

Orderapp.put('/ChangePassword',expressAsyncHandler(async(request,response)=>{
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

Orderapp.delete('/deleteusers/:username',expressAsyncHandler(async(request,response)=>{
    let deleteUsername=request.params.username
    let userCollectionObject=request.app.get('userCollectionObject')
    userCollectionObject.deleteOne({username:deleteUsername})
    response.send({message:'User is deleted'})


}))

module.exports=Orderapp