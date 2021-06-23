const express=require('express')
const mongoose=require('mongoose')


const walletSchema = mongoose.Schema({

            walletNo:{type:String,Required:true},
            source:{type:String,Required:true,default:"cash"},
            balance:{type:Number,Required:true},
            createdAt:{type:Date,Required:true}
          
});


walletSchema.methods.withDrawMoney=function (cost){
       
   this.balance=this.balance - cost;

   return this.balance;

}


module.exports=mongoose.model('Wallet',walletSchema);