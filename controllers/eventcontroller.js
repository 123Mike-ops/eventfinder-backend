

const Event=require('../models/event')
const User=require('../models/user')

exports.checkBody=(req,res,next)=>{

   if(!req.body.name||!req.body.location||!req.body.date||!req.body.type||!req.body.discription)
   {
      res.json({message:"missing main elemnets of an event "})
   }
   next();
}



exports.registerEvent= (req,res,next)=>{
   const {
      name,
   discription,
   location,
   absoluteLocation,
   date,
   type,
   organizer,
   maxNumberOfGuest,
   duration,
eventImgUrl,cost}=req.body;
const newevent=new Event({ 
   name,
   discription,
   location,
   absoluteLocation,
   date,
   type,
   organizer,
   maxNumberOfGuest,
   duration,
   eventImgUrl,
   cost  
               });

   try{

     const yes= newevent.save()
     if(!yes){
        res.status(400).json({message:"error happen while uploading"})
     }
   }
   catch(err){
      res.json(err)
   }
      
      res.status(200).json({message:"Successfuly added the event"})

}

exports.getEvent= async (req,res,next)=>{
 try{

   const id=req.params.id;

   const findedEvent=await Event.findById(id);
    
         res.status(200).json({findedEvent})
       

 }catch(err){

    res.status(400).json({

       status:'fail',
       message:err

    })
 }

}



exports.getAllEvent= async (req,res,next)=>{
  
   try{
      

      const allevents= await Event.find()   // Yetetara new k query west lemsale duration endezi yehone aweta yelewal lelochu melkiya excluded nachew
                           // await siyareg behuala sensera sort,paginate menamen method lemtekem edel aystem so lebchaw query ketach metra

   
   //send response 
      res.status(200).json({allevents})
   }catch(err)
   {
      res.json({message:err})
   }

}

exports.updateEvent=async (req,res)=>{

         try{
            const updatedEvent=  await film.findByIdAndUpdate(req.params.id,
                                                               req.body,
                                                               {new:true,
                                                               runValidators:true})
            res.json({
               status:'success',
               data:{updatedMovie}
            })
         }catch(err)
            {
               res.json({
                  status:'fail',
                  message:err
               })
            }
}
exports.deleteEvent= async(req,res)=>{
     
      await Event.findByIdAndDelete(req.params.id)

      res.json({
         status:'success',
         message:'Event successfuly deleted'
      })

}





