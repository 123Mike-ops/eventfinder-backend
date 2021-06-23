const express=require('express')
const jwt=require('jsonwebtoken');
const {promisify}=require('util')

const Wallet=require('../models/wallet');
const User=require('../models/user')

exports.checkBalance=async (req,res,next)=>{
    const {date,eventId,userId,validUpTo,cost,createdAt}=req.body;
        console.log("dershalew balance")



         const user=  await User.findById(userId);


  
        const wallet=await Wallet.findOne({walletNo:user.phone});

        if(!wallet){
                console.log("no wallet found")
            return res.json({message:"No wallet found."});
            
        }

        else{
                if (wallet.balance >= cost){
                    
            
                        next();
                }
                else{
                    
                    console.log("insufficent balance")
                    return res.json({message:"insufficent balance to get ticket"})
                    
                }
        }
       
   
    

}


exports.withDrawMoney=async (req,res,next)=>{
    const {date,eventId,userId,validUpTo,cost,createdAt}=req.body;
    console.log("dershalew withdraw")
    const user=await User.findById(userId);

try{
    const userPhone=user.phone;
        const wallet=await Wallet.findOne({walletNo:userPhone})

            if(wallet){

                const transaction= wallet.withDrawMoney(cost);

                await wallet.save({validateBeforeSave:false});

                console.log("tekortual")
            

                //populate req with wallet information
                req.wallet=wallet;
             next();
            }
            else{
            return res.json({message:"No active wallet found for deduction"}); 
            }
        }
        catch(err){
            console.log(err)
        }
        
 
}

exports.getWalletAccount= async(req,res,next)=>{

    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            const token= req.headers.authorization.split(' ')[1];
            const decoded=await promisify(jwt.verify)(token,'my-secrete-of-long-character-ker');
 
            //3)check if the user still exists
         
               const  currentUser=await User.findById(decoded.id);

        const wallet= await Wallet.findOne({walletNo:currentUser.phone});
        
        res.status(200).json({mywallet:wallet});}

    }catch(err){
        res.json({err});
    }

}

exports.addMoney=(req,res,next)=>{


}

exports.editWallet=(req,res,next)=>{

}
exports.createWallet=(req,res,next)=>{}

