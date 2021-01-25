//Importing Router from express
const authRouter=require('express').Router(); 
//Model for User
const UserModel= require('../models/User'); 
//Bcrypt for hashing Passwords
const bcrypt=require('bcrypt');
//Importing custom Validator defined in Validator.js
const {registerValidator,loginValidator}=require('../Utils/Validator') 
//Importing JSON WEB TOKEN library
const jwt=require('jsonwebtoken');

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

//Login Route
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

     //Compare Passwords
     bcrypt.compare(req.body.password,user.password,function(error,isSame){
        //Error Handling 
        if(error)
            res.status(400).send({
                "success":false,
                "msg":error
        })
        //If Passwords are same
        if(isSame)
            return res.status(201).send({
                "success":true,
                "msg":"User Logged In Successfully",
                "auth-token":null,
                "id":user._id
            })
        //If Passwords are not same
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

//Exporting Router to access in other files
module.exports =authRouter;