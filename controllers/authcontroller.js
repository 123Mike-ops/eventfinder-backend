
const express=require('express')
const {promisify}=require('util')
const crypto=require('crypto')
const jwt=require('jsonwebtoken');

const Event=require('../models/event')
const User=require('../models/user')
const sendEmail=require('../utils/email')


const signToken=(id)=>{
   return jwt.sign({id},'my-secrete-of-long-character-ker',{expiresIn:'5d'})
}

exports.signup=async (req,res,next)=>{
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
   
   exports.login=async (req,res,next)=>{
   
   
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

exports.protect=async (req,res,next)=>{
    let token;
   
    
    //1)check if there is a token
   try{
 
       if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
             token= req.headers.authorization.split(' ')[1];
                }
       if(!token){
          return next(new Error("you are not logged in to access"),401);
       }
 
    //2)verification token
     const decoded=await promisify(jwt.verify)(token,'my-secrete-of-long-character-ker');
 
           
 
    //3)check if the user still exists
 
       const  currentUser=await User.findById(decoded.id);
 
       if(!currentUser){
         return next( res.json({status:"fail",message:"no user is belonging to this token"}));
       }
 
 
 
    //4)check if the user changes password after the token was issued
 
    if(currentUser.passwordChangedAfter(decoded.iat)){
       
       return next(res.json({status:"fail",message:"user changed password! Login Again!"}));
 
    }
    req.user=currentUser; //gives users info for next middle ware after protect lalew middlware yestewal
    next();
 
   }catch(err){
      console.log(err);
   }   
 
 }

 exports.restrictTo= (...roles)=>{
     
     return (req,res,next)=>{

     

            if(! roles.includes(req.user.roles)){
                console.log(req.user.roles)

                return next(res.json({message:"you didnt have permission to delete events."}));
            }

            next();
        }

     }

exports.forgotPassword= async (req,res,next)=>{
           try{
            //1) find the user based on posted email  

            const user=await  User.findOne({email:req.body.email});

            if(!user){

               return next(res.json({message:"no user with provided email"}));

            }
            //2)Generate rest token and send 
               const resetToken= user.createPasswordResetToken();

               await user.save( {validateBeforeSave:false});

            //3)Send the reset token with email
                const resetURL=`${req.protocol}://${req.get('host')}/api/user/resetpassword/${resetToken}`;

                const message=`forgot your password ? don't bother ,submit your new password with patch request and passwordConfirm to ${resetURL} `
            try{
                await sendEmail({
                        email: user.email,
                        subject:'your password reset token (valid for 10 min)',
                        message
                });

                res.json({

                   status:'success',
                   message:'Token has been sent to your mail'

                });
               }catch(err){
                  console.log(err)
                  user.createPasswordResetToken=undefined;
                  user.passwordResetExpires=undefined;
                  await user.save({validateBeforeSave:false});
                  return next(res.json({message:"error happens when sending email"}));
               }
            
         
         }catch(err){
           console.log(err);
         }



    
}

exports.resetPassword=async(req,res,next)=>{
   
   
   //1)get the user based on token 
 
        const hashedToken=crypto.createHash('sha256')
                                 .update(req.params.token)
                                 .digest('hex');
                                 console.log(hashedToken)
      const user=await User.findOne({passwordResetToken:hashedToken,passwordResetExpires:{$gt:Date.now()}});
      console.log(user);

   //2) if the token not expired and there is a user set new password

        if(!user){
           return next(res.json({status:"fail",message:"Token is invalid or expires out..."}));
        }

        user.password=req.body.password;
        user.passwordConfirm=req.body.passwordConfirm;
        user.passwordResetToken=undefined;
        user.passwordResetExpires=undefined;

        await user.save();

   //3)update changepasswordAt property for the user

   //4)log the user in and send jwt 
        const token=signToken(user._id);

        res.status(200).json({
           status:"success",
           token
        });

        



}
 