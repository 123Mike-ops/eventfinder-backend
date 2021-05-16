const express=require('express')
const router=express.Router()


const eventcontroller=require('../controllers/eventcontroller')

const authcontroller=require('../controllers/authcontroller')
const ticketcontroller=require('../controllers/ticketcontroller')

router.route('/')
      .post(eventcontroller.checkBody,eventcontroller.registerEvent)
      .get(authcontroller.protect,eventcontroller.getAllEvent)
  
      
router.route('/find/:id')

      .get(eventcontroller.getEvent)
      .patch(eventcontroller.updateEvent)
    
      .delete(authcontroller.protect,authcontroller.restrictTo('admin'),eventcontroller.deleteEvent)
router.route('/createTicket/')

      .post(ticketcontroller.createTicket)
      


module.exports=router

