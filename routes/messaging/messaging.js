const express = require('express')
const router = new express.Router();
const auth= require('../../middlewares/auth')
const jwt = require('jsonwebtoken')
const User= require('../../models/user')
const Message= require('../../models/messaging')
const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');
router.get('/messages/:name',auth,async(req,res)=>{
    const {name} = req.params
    const user = await User.findOne({name})
    if(!user)
    {
        return res.status(400).send({errors:[{error:'User does not exist !'}]})
    }
    let intersection =[]
   if(req.user.messageID)
   {
    intersection= req.user.messageID.filter(x => user.messageID.includes(x));
   }
    if(intersection.length==0)
    {
        return res.status(200).send({message:[]})
    }
    const messages = await Message.find({_id:mongoose.Types.ObjectId(intersection.toString())})
    return res.status(200).send({message:messages})
})
router.post('/messages/:name',auth,async(req,res)=>{
try{
    const {name} = req.params
    const {message}=req.body
    const user = await User.findOne({name})
    if(!user){
        return res.status(400).send({errors:[{error:'User  does not exist !'}]})
    }
    // if(req.user.friends.find(elem=>elem.toString()==user._id.toString()))
    // {
    //     return res.status(400).send({errors:[{error:'User is not a friend !'}]})
    // }
    let messages
    let intersection=[]
   if(req.user.messageID)
   {
    intersection  = req.user.messageID.filter(x => user.messageID.includes(x));
   }
   else{
    req.user.messageID=[] 
   }
    if(intersection.length==0)
    {
        messages = new Message({user1:req.user._id,user2:user._id})
        messages.messaging=[]
        messages=await messages.save()
        req.user.messageID.push(messages._id)
        user.messageID.push(messages._id)
        let b= await user.save()
        let c= await req.user.save()
        await Promise.all([b,c])
    }
    else{
        messages = await Message.findOne({_id:mongoose.Types.ObjectId(intersection[0].toString())})
    }
    messages.messaging.push({message,author:req.user.email})
    await messages.save()

    return res.status(200).send({message:messages})
}
catch(e){
    console.log(e)
}
})
module.exports = router