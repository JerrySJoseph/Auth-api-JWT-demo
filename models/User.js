const mongoose = require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024
    },
    createdat:{
        type:Date,
        required:true,
        default:Date.now
    },
    iat:{
        type:Date,
        required:true,
        default:Date.now
    }

});

module.exports=mongoose.model('User',UserSchema,'users_cred_data')
