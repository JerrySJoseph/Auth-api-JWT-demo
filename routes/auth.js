//Importing Router from express
const authRouter=require('express').Router();

const authController=require('../controllers/auth-controller')

//Register Route
authRouter.post('/register',authController.register)

//Login Route
authRouter.post('/login',authController.login)

//Exporting Router to access in other files
module.exports =authRouter;