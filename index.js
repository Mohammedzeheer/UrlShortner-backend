const express= require('express')
const app=express()
const cors=require('cors')
require(`./config/Database`);
require('dotenv').config()
const shortUrlCollection=require('./models/shortUrlModel')

app.use(
    cors({
      origin: process.env.CLIENT_SIDE_URL,
      methods: ['GET', 'POST','DELETE'],
      credentials: true,
    })
  );
  
const userRouter = require('./router/userRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', userRouter);



let PORT= process.env.port || 5000

app.listen(PORT,()=>{
    console.log(`server started`);
})