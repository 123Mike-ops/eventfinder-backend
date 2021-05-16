const express=require('express')
const mongoose=require('mongoose')

const walletSchema = mongoose.Schema({
            walletNo:{type:String,Required:true},
            paidWith:{type:String,Required:true},
            balance:{type:Number,Required:true},
          
}) ;
module.exports= mongoose.model('Wallet',walletSchema);