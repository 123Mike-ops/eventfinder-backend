const express=require('express')
const Ticket=require('../models/ticket')

exports.createTicket=(req,res,next)=>{

    const{date,event_Id,validUpto,cost,paidWith}=req.body;

    const ticket=new Ticket({
        date,event_Id,validUpto,cost,paidWith
    });
    try{
            ticket.save();
    }
    catch(err){
        res.send(err);
    }


}