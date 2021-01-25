var express=require('express')
var app=express();

const PORT = 3000 || process.env.PORT

//Importing Routes
const authRouter=require('./routes/auth')

//Routing to Routes
app.use('/api/auth',authRouter)



app.listen(PORT,()=>console.log("Auth Server is Up and Running on localhost:"+PORT));