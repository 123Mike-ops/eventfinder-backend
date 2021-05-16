const dotenv=require('dotenv')
const mongoose=require('mongoose'); 

    dotenv.config({path:'./config.env'})

    const DB=process.env.DATABASE

    const app =require('./app')

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false

}).then(()=>console.log('DB Connected Successfuly'))

const port=process.env.PORT||5000

     app.listen(port,()=>{console.log(`App lsiten on port ${port}`)})

   





