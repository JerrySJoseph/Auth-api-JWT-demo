const authRouter=require('express').Router();
const UserModel= require('../models/User');

//Register Route
authRouter.post('/register',async function(req,res){
const user= new UserModel({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
})
try {
    const savedUser=await user.save();
    res.send(savedUser)
} catch (error) {
    res.status(400).send(error)
}
})




module.exports =authRouter;