const express=require('express');

const app=express();
require('dotenv').config();
app.use(express.json());
const dbconfig=require('./config/dbconfig');
const userRoute=require('./routes/userRoutes')
const path=require('path')
app.use('/api/users/',userRoute);
const port=process.env.PORT || 5000
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})