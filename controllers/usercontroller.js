const express=require('express');
const User=require('../models/user');
const jwt=require('jsonwebtoken');


const signToken=(id)=>{
           return jwt.sign({id},'my-secrete-of-long-character-ker',{expiresIn:'5d'})
}


const signup=async (req,res,next)=>{
try{
        const {name,email,password,passwordConfirm,roles,phone,address,walletNo,payWith,passwordChangedAt}=req.body;
          const createdUser=new User({
            name,email,password,passwordConfirm,roles,phone,address,walletNo,payWith,passwordChangedAt
          });

        await  createdUser.save();

        const token=signToken(createdUser._id);    
        res.status(201).json({
            token
            });
          }
          catch(err){
            console.log(err);
          }
    

}

const login=async (req,res,next)=>{


      const {email,password}=req.body;

      if(!email||!password){
        return res.json({message:"please enter valid credentials"});
      }

      const user=await User.findOne({email:email}).select('+password');
        if (!user||!(await user.correctPassword(password,user.password)))
        {

          return res.json({message:"invalid email or password"})

        }


      const token=signToken(user._id);


      res.status(201).json({
                           token,
                          });


}

module.exports.signup=signup;

module.exports.login=login;
