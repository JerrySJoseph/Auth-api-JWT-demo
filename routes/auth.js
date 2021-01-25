const authRouter=require('express').Router();

authRouter.post('/register',function(req,res){
res.send({"res":"Welcome to Register"});
})




module.exports =authRouter;