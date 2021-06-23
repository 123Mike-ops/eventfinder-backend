const express=require('express')
const router=express.Router()
const authcontroller=require('../controllers/authcontroller');
const walletcontroller=require('../controllers/walletcontroller')


router.route('/')
        .get(authcontroller.protect,walletcontroller.getWalletAccount)
        .post(authcontroller.protect,walletcontroller.createWallet)
        .patch(authcontroller.protect,walletcontroller.editWallet)
        
router.route('/addMoney')
        .post(authcontroller.protect,authcontroller.restrictTo('admin'),walletcontroller.addMoney)




module.exports=router;
