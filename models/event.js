
const express=require('express')

const mongoose=require('mongoose')

const eventSChema=mongoose.Schema({

    name:{type:String,Required:true},
    discription:{type:String,Required:true},
    location:{type:String,Required:true},
    absoluteLocation:{type:String,Required:true},
    date:{type:String,Required:true},
    type:{type:String,Required:true},
    organizer:{type:String,Required:true},
    maxNumberOfGuest:{type:Number,Required:true},
    duration:{type:String,Required:true},
    eventImgUrl:{type:String,Required:true},
    cost:{type:Number,Required:true}

})

module.exports=mongoose.model('Event',eventSChema)