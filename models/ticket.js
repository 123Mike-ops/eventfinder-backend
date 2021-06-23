const express=require('express');
const mongoose=require('mongoose');

const ticketSchema=mongoose.Schema({

    date:{
        type:String,Required:true
    },
    eventId:{
        type:String,Required:true
    },
    userId:{
        type:String,Required:true
    },
    validUpTo:{
        type:String,Required:true
    },
    numberOfTicket:{
        type:Number,
        Required:true,
        default:1
    },
    paidWith:{
        type:String,
        Required:true,
        default:"cash"
    },
    cost:{
        type:Number, Required:true
    }
    ,
    createdAt:{
        type:Date , Required:true
    }
    
});

module.exports=mongoose.model('Ticket',ticketSchema);