const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URL)
const connection=mongoose.connection;
connection.on('connected',()=>{
    console.log('mongodb is connected')
})

connection.on('error',(error)=>
{
   console.log('mongoose has error',error)
})
module.exports=mongoose