const mongoose=require('mongoose')

const paySchema=new Schema({
    name:{type:String ,Required:true},
    discription:{type:String,Required:true},
    img:{type:String, Required:true},
})

module.exports=mongoose.model('Pay',paySchema);
