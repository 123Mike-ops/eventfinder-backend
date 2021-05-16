const express=require('express');
const crypto=require('crypto');
const validator=require('validator');
const bcrypt=require('bcryptjs');

const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        Required:true},
    email:{
        type:String,
        Required:[true,'email is mandatory to signUp'],
        Unique:true
           },
    phone:{
        type:String,
        Required:true},
    password:{
        type:String,
        Required:true,
        select:false},

    passwordConfirm:{
        type:String,
        Required:[true,'please confirm your password'],
        validate:{
            validator:function (el){
                return el===this.password;
            },
            message:'password does not matches'
        }
    },
    roles:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    address:{
        type: String,
        Required:true},
    walletNo:{  
        type: String,
        Required:true},
    payWith:{
        type:String,
        Required:true
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date
    
});

userSchema.pre('save',async function (next){

     if(!this.isModified('password'))return next(); 
  
     this.password=await bcrypt.hash(this.password,12);

     this.passwordConfirm=undefined;

     next();


});
userSchema.pre('save',function (next){

    if(!this.isModified('password')|| this.isNew) return next();

    this.passwordChangedAt=Date.now() - 1000;
    next();

})

userSchema.methods.correctPassword=async function(candidiatePassword,userPassword){
    return await bcrypt.compare(candidiatePassword,userPassword);
};

userSchema.methods.passwordChangedAfter= function(JWTTimestamp){

        if(this.passwordChangedAt){
               const changedTimeStamp=parseInt(this.passwordChangedAt.getTime()/1000,10);//divide by 1000 to concvert mili sec to sec and change to base 10
            
            console.log(changedTimeStamp,JWTTimestamp);

            return JWTTimestamp < changedTimeStamp;
        }

        return false;
}

userSchema.methods.createPasswordResetToken= function(){

        const resetToken=crypto.randomBytes(32).toString('hex');

        this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');

        console.log({resetToken},this.passwordResetToken);


        this.passwordResetExpires=Date.now() + 10 * 60 * 1000;
        
        return resetToken;

}

module.exports=mongoose.model('User',userSchema);
