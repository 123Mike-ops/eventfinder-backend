const express=require('express')
const userRoute=require('./routes/user-route')
const eventRoute=require('./routes/event-route')
const morgan=require('morgan')
const bodyparser=require('body-parser');
const Cors=require('cors')


const app=express();
app.use(Cors());

// 1) MIDDLEWARES

// if (process.env.NODE_ENV==='development'){
//     app.use(morgan('dev'))
   
// }


    app.use(express.json())
    app.use(bodyparser.json());

    app.use((req,res,next)=>{

        req.requestTime=new Date().toISOString();
        // console.log(req.headers)
        next();
    })

    app.use('/api/user',userRoute);
    app.use('/api/event',eventRoute);

module.exports=app