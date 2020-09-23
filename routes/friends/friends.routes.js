const express = require('express')
const router = new express.Router();
const auth= require('../../middlewares/auth')
const jwt = require('jsonwebtoken')
const User= require('../../models/user')
const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');
router.post('/add/friend/:name',auth,async(req,res)=>{
    const {name} = req.params
    const user =await User.findOne({name})
    if(!name){
        return res.status(400).send({errors:[{error:'No name provided !'}]})
    }
    if(!user){
        return res.status(400).send({errors:[{error:'User does not exist !'}]})
    }
    if(req.user.reqSent.find(elem=>elem==(user._id).toString()))
    {
        return res.status(400).send({errors:[{error:'Friend Request Already Sent !'}]})
    }
    req.user.reqSent.push(user._id)
    user.reqReceived?user.reqReceived.push(req.user._id):[].push(req.user._id)
    let a = await req.user.save()
    let b =await user.save()
    Promise.all([a,b])
    res.sendStatus(200)
})  
router.get('/friends/sent',auth,async(req,res)=>{
        try{
            let reqSentTo = await User.find({'_id': { $in: req.user.reqSent.map(elem=>mongoose.Types.ObjectId(elem.toString()))}}).select('image _id profile.email name')
            res.send(reqSentTo)
        }
     catch(e){
        console.log(e)
    }
})
router.get('/friends/received',auth,async(req,res)=>{
   try{
    let reqReceivedFrom = await User.find({'_id': { $in: req.user.reqReceived.map(elem=>mongoose.Types.ObjectId(elem.toString()))}}).select('image name email')
    res.send(reqReceivedFrom)
   }
   catch(e){
       console.log(e)
   }
})
// router.get('/friends',auth,async(req,res)=>{
//     let reqSentTo = await User.find({'_id': { $in: req.user.reqSent.map(elem=>mongoose.Types.ObjectId(elem.toString()))}}).select('image name email')
//     res.send(reqSentTo)
// })
router.get('/friends/isfriend/:name',auth,async(req,res)=>{
   try{
    let user = await User.findOne({name:req.params.name}).select('_id')
    if(req.user.friends.includes(user._id.toString())||req.user.reqSent.includes(user._id.toString())||req.user.reqReceived.includes(user._id.toString()))
    {
       return res.send({isfriend:true})
    }
    return res.send({isFriend:false})
   }
   catch(err){
    return   res.status(400).send({errors:[{error:err.message}]})
   }
})
router.delete('/friends/request/sent/:name',auth,async(req,res)=>{
    try{
        const {name}=req.params
        const user = await User.findOne({name})
        req.user.reqSent=req.user.reqSent.filter(elem=>elem.toString()!=user._id.toString())
        user.reqReceived=user.reqReceived.filter(elem=>elem.toString()!=req.user._id.toString())
        await req.user.save()
        await user.save()
        res.sendStatus(200)
    }
    catch(e){
        res.send({errors:[{error:e.message}]})
    }
})
router.delete('/friends/request/recieved/:name',auth,async(req,res)=>{
    const {name}=req.params
    const user = await User.findOne({name})
    req.user.reqReceived=req.user.reqReceived.filter(elem=>elem!=user._id.toString())
    user.reqSent=user.reqSent.filter(elem=>elem.toString()!=req.user._id.toString())
    await req.user.save()
    await user.save()
    res.sendStatus(200)
})
router.post('/friends/request/recieved/:name',auth,async(req,res)=>{
    const {name}=req.params
    const user = await User.findOne({name})
    if(req.user.reqReceived && user.reqSent)
    {
        req.user.reqReceived=req.user.reqReceived.filter(elem=>elem.toString()!=user._id.toString())
        user.reqSent=user.reqSent.filter(elem=>elem.toString()!=req.user._id.toString())
    }
    if(!req.user.friends.includes(user._id.toString()))
    {
        req.user.friends.push(user._id)
        user.friends.push(req.user._id)
    }
    await req.user.save()
    await user.save()
    res.sendStatus(200)
})
router.get('/friends/all',auth, async(req,res)=>{
    const users=await User.find({_id: { $in: req.user.friends.map(elem=>mongoose.Types.ObjectId(elem.toString()))}}).select('name email image')
    res.send(users)
})
router.get('/friends/unfriend/:username',auth,async(req,res)=>{
    console.log(req.user.friends)
    res.send(req.user.friends)
})
module.exports=router