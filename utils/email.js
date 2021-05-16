const nodemailer=require('nodemailer')
const  {options } = require('../app')

const sendEmail=async options=>{

    //1)create transporter
    const transporter=nodemailer.createTransport({

        service:"mailtrap",

        host:'smtp.mailtrap.io',
        port:2525,
        auth:{
            user:'81c4723f1a6c97',
            pass:'79270416514ed4'
        }

    })

    //2)Define mail opition

    const mailOptions={
        from :'Mikiyas Daniel <MikiyasDaniel@gmail.com>',
        to:options.email,
        subject:options.subject,
        text:options.message,
    }

    //3) send the mail

    await transporter.sendMail(mailOptions)
}
module.exports=sendEmail;