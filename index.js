var express=require('express')
var mongoose = require('mongoose')
const dotenv=require('dotenv');

var app=express();
dotenv.config();


const PORT = 3000 || process.env.PORT

//BodyParser MiddleWare
app.use(express.json())

//Connecting to Database
mongoose.connect(process.env.DB_CONNECTION_STRING,
    {useNewUrlParser:true,useUnifiedTopology:true},
    (error)=>{
    if(error)
    console.log('Error connecting to Database :'+error.errmsg)
    else
    console.log("Connection Established to Database!")
})

//Importing Routes
const authRouter=require('./routes/auth')

//Routing to Routes
app.use('/api/auth',authRouter)


//Listening to PORT 3000 or process.env.PORT at localhost
app.listen(PORT,()=>console.log("Auth Server is Up and Running on localhost:"+PORT));