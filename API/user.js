const exp=require('express')
const Userapp=exp.Router()
Userapp.use(exp.json())
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')


Userapp.use(exp.urlencoded());

Userapp.get('/getusers',expressAsyncHandler(async(request,response)=>{
    let userCollectionObject=request.app.get('userCollectionObject');
    let users= await userCollectionObject.find().toArray();
    response.send({message:'This is user info',payload: users })
}))

Userapp.post('/create-users',expressAsyncHandler(async(request,response)=>{
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

Userapp.post('/login',expressAsyncHandler(async(request,response)=>{
    let newUser=request.body
    let userCollectionObject=request.app.get('userCollectionObject');
    let resultOfUserName= await userCollectionObject.findOne({Name:newUser.Name});
    if(resultOfUserName!=null){
        let result= await bcryptjs.compare(newUser.Password,resultOfUserName.Password);
        if(result==false){
            response.send({message:"Invalid password"})
        }
        else{
            let token=jwt.sign({Name:resultOfUserName.Name},'abcdef',{expiresIn:600})
            response.send({message:'login is successful',payload:token,userObj:resultOfUserName});
        }

    }
    else{
        response.send({message:'Username is incorrect'})
    }

}))

Userapp.put('/ForgetPassword',expressAsyncHandler(async(request,response)=>{
    let updateBody=request.body
    let userName=updateBody.Name
    let userCollectionObject=request.app.get('userCollectionObject');
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

Userapp.put('/ChangePassword',expressAsyncHandler(async(request,response)=>{
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

Userapp.delete('/deleteusers/:username',expressAsyncHandler(async(request,response)=>{
    let deleteUsername=request.params.username
    let userCollectionObject=request.app.get('userCollectionObject')
    userCollectionObject.deleteOne({username:deleteUsername})
    response.send({message:'User is deleted'})


}))

module.exports=Userapp