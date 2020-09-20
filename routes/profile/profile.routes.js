const express =require('express')
const {Content} =require('../../models/content')
const HashTag = require('../../models/hashTag')
const Tweet = require('../../models/tweet')
const multer =require('multer')
const sharp =require('sharp')
const RESPONSES =require('../../socketio.responses')
const auth = require('../../middlewares/auth')
const router = require('express').Router()
const upload = require('../../middlewares/upload')
const User = require('../../models/user')
const Message = require('../../models/messaging')
router.get('/profile',auth,async(req,res)=>{
  
    let user = await User.findById({_id:req.user.id})
    user.profile.email=user.email
    let isMe=true
  
    res.send({user:user.profile,isMe,image:user.image})
})
router.get('/profile/:username',auth,async(req,res)=>{
    try{
        let user = await User.findOne({name:req.params.username})
        if(!user)
        {
            return res.status(400).send({errors:[{error:'User doesn\'t exist !'}]})
        }
        if(user.profile.private)
        { 
            if(req.user.friends.find(elem=>elem.toString()!=user._id.toString())){
                let {email,name}=user.profile
                user.profile = {email,name} 
            }
        }
        res.send({user:user.profile,isMe:false,image:user.image})
    }
    catch(e){
        res.status(400).send({errors:[{error:e.message}]})
    }
})
router.post('/profile',auth,upload.any(),async(req,res)=>{
    const user = await User.findById({_id:req.user.id})
    const {private}=req.body
    try 
    {
       if(private){
            user.profile.private=private
        }
        user.profile={...user.profile,...req.body,private:user.profile.private}
        let image
        if(req.files)
        {
            if(req.files[0])
            {
                image = await sharp(req.files[0].buffer).resize({ width: 100, height: 100 }).png().toBuffer()
                user.image=image
            }
        }
        let isMe=true
        await user.save() 
        user.profile.email=user.email
        await res.send({user:user.profile,isMe,image:user.image})
    }
    catch(e)
    {
        if(e[`errors`])
        {
          if(e['errors']['profile.aboutme'])
          {
            res.send({errors:[{error:e['errors']['profile.aboutme']['message']}]})
          }
        }
        console.log(e)
        res.send({errors:[{error:'Updating failed !'}]})
    }
    
})
router.get('/clearall',async(req,res)=>{
    await Content.deleteMany({})
    await User.deleteMany({})
    await Tweet.deleteMany({})
    await Message.deleteMany({})
    res.send(200)
})
router.post('/image',auth,async(req,res)=>{
    try{
        const {users} = req.body
        const newUsers = await User.find({email:users.map(elem=>elem.email)}).select('image')
        res.send(newUsers)
    }
    catch(e){
        console.log(e)
    }
})
module.exports=router