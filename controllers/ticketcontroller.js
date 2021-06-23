const express=require('express')
const Ticket=require('../models/ticket')


exports.createTicket=async (req,res,next)=>{
console.log("dershalew create ticket")
    const {date,eventId,userId,validUpTo,cost,createdAt}=req.body;
    try{
    const ticket=new Ticket({

        date,eventId,userId,validUpTo,cost,createdAt
          
    });


 
            await ticket.save();
            console.log({message:"success"});
            res.json({message:"Your ticket has been set Successfuly !"});
    }
    catch(err){
        res.send(err);
    }


}
exports.getAllTicket=(req,res,next)=>{


}

exports.deleteTicket=(req,res,next)=>{


}
exports.getTicket=(req,res,next)=>{
    
}
