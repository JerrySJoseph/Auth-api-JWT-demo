const authRouter=require('express').Router();
const UserModel= require('../models/User');
const bcrypt=require('bcrypt');
const {registerValidator,loginValidator}=require('../Utils/Validator')

//Register Route
authRouter.post('/register',async function(req,res){


try {

    //Validation
    const {error}=registerValidator(req.body);
    if(error)
    return res.status(406).send(
            {
                "success":false,
                "msg":error.details[0].message
            }
        )
    
    //Checking if the user Exists
    const userExists=await UserModel.findOne({email:req.body.email})
    if(userExists)
     return res.status(400).send({
        "success":false,
        "msg":"User with same email Exists"
     })

     //hashing Pasword
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
    const user= new UserModel({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })
     //Saving the User
    const savedUser=await user.save();
    const response={
        "success":true,
        "msg":"User created Successfully",
        "auth-token":null,
        "id":savedUser._id
    }
    res.status(201).send(response)
} catch (error) {
    res.status(400).send({
        "success":false,
        "msg":error
     })
}
})


//Register Route
authRouter.post('/login',async function(req,res){

try {

    //Validation
    const {error}=loginValidator(req.body);
    if(error)
    return res.status(406).send(
            {
                "success":false,
                "msg":error.details[0].message
            }
        )
    
    //Find User with the email ID
    const user=await UserModel.findOne({email:req.body.email})
    if(!user)
     return res.status(404).send({
        "success":false,
        "msg":"User Not Found"
     })
     bcrypt.compare(req.body.password,user.password,function(error,isSame){
         if(error)
            res.status(400).send({
                "success":false,
                "msg":error
        })
        if(isSame)
            return res.status(201).send({
                "success":true,
                "msg":"User Logged In Successfully",
                "auth-token":null,
                "id":user._id
            })
        else
            res.status(401).send({
        "success":false,
        "msg":"Incorrect Password"
     })

     })
    
} catch (error) {
    res.status(400).send({
        "success":false,
        "msg":error
     })
}
})

module.exports =authRouter;