const express=require('express');
const mongoose=require('mongoose');

const ticketSchema=mongoose.Schema({

    date:{
        type:String,Required:true
    },
    eventId:{
        type:String,Required:true
    },
    validUpTo:{
        type:String,Required:true
    },
    numberOfTicket:{
        type:Number,Required:true
    },
    paidWith:{
        type:Number,Required:true
    },
    totalCost:{
        type:Number, Required:true
    }
    
});

module.exports=mongoose.model('Ticket',ticketSchema);