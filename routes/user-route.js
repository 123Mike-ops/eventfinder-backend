const express=require('express')
const router=express.Router();

const usercontroller=require('../controllers/usercontroller');
const authcontroller=require('../controllers/authcontroller');
router.route('/')
      .post(authcontroller.signup)
      

router.post('/login',authcontroller.login)
router.post('/googleLogin',authcontroller.googleLogin)

router.post('/forgotPassword',authcontroller.forgotPassword)

router.patch('/resetPassword/:token',authcontroller.resetPassword)


module.exports=router;

            
