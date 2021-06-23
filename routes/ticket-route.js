const express=require('express')
const router=express.Router()

const ticketcontroller=require('../controllers/ticketcontroller')
const authcontroller=require('../controllers/authcontroller')
const walletcontroller=require('../controllers/walletcontroller')


router.route('/')
      .post(walletcontroller.checkBalance,walletcontroller.withDrawMoney,ticketcontroller.createTicket)
      .delete(authcontroller.protect,authcontroller.restrictTo('admin'),ticketcontroller.deleteTicket)
      .get(authcontroller.protect,ticketcontroller.getTicket)




module.exports=router;
