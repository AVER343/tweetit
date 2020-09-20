const express = require('express')
const router = new express.Router();
const auth= require('../../middlewares/auth')
const jwt = require('jsonwebtoken')
const User= require('../../models/user')
const sgMail = require('@sendgrid/mail');
const RESPONSES = require('../../socketio.responses');
const { disconnectedOrLoggedOut,newTabOrLoggedIn } = require('../../utils.js/utils');
 router.get('/username/:username',auth,async(req,res)=>{
    try{
         let {username}=req.params
         let users=await User.find({ name: { $regex: username , $options: "i" } }).select('_id profile image') 
         users=users.map(elem=>{return({...elem.profile,_id:elem._id,image:elem.image})})
         res.send({users})
     }
     catch(e){
         res.send({erros:[{error:'Something went wrong !'}]})
     }
 })
 router.post('/signup',async (req,res) => {
     let errors=[]
   try{ 
     let {password,email,name,confirmPassword} = req.body
     email=email.trim()
     if(password.toString()!==confirmPassword.toString())
     {
        errors.push({error:'Password and Confirm Password needs to be same.'})
     }
     if(email.includes(' '))
     {
         errors.push({error:'Email cannot have whitespace!'})
     }
     if(password.toString().length<8)
     {
        errors.push({error:'Password needs to have more than 7 characters !'})
     }
     let existing = await User.findOne({$or:[{name},{email}]}) 

     if(existing)
     {
         if(existing.name==name)
         {
             const users= await User.find({})
            console.log(users)
             errors.push({error:'Username has already been taken'})
         }
         if(existing.email==email)
         {
             errors.push({error:'Account registered with the account already !'})
         }
     }
     if(errors.length>0){
         return res.status(400).send({errors})    
         }
     const user = await new User({password,email,name})
     user.reqSent=[]
     user.reqReceived=[]
     user.friends=[]
     user.messageID=[]
     const token = await user.generateJWT(res)
     newTabOrLoggedIn({email,io:req.io,people:req.people})
     res.status(200).send({user,token})
 }
 catch(e)
     {
         if(e.response)
         {
             res.status(400).send({errors:[{error:e.response}]})
         }
     }
 })
 router.get('/me',auth,(req,res)=>{
    res.send({user:req.user,token:req.token})
 })
 router.post('/login',async (req,res)=>{
     try
     {
     const {email,password} = req.body
     const user = await User.findByCredentials(email,password)
     const token = await user.generateJWT()     
     var io = req.io
     var people = req.people
     newTabOrLoggedIn({email,io,people})
     res.send({user,token})
     }
     catch(e)
     {
         console.log(e)
         res.status(400).send({errors:[{error:e.message}]})
     }
 })
 router.get('/all',async (req,res) =>{
    try{ 
         const users= await User.find()
         res.send({users})
     }
    catch(e)
    {
        res.status(400).send(e)
    }
 })
 router.post('/logout',auth,async(req,res)=>{
     req.token=''
     var io = req.io
     var people = req.people
     people = disconnectedOrLoggedOut({email:req.user.email,io,people})
     res.send({user:'',token:''})
 })
 router.post('/logout/all',auth,async (req,res)=>{
     req.token=''
     res.send({user:'',token:''})
 })
 router.post('/password/change',auth,async(req,res)=>{
   try{  const {password,confirmPassword}=req.body
     if(!password )
     {
         return res.status(400).send({errors:[{error:'Empty password provided !'}]})
     }
     if(password!==confirmPassword )
     {
         return res.status(400).send({errors:[{error:'Password and Confirm Password do not match'}]})
     }
     user.password=password
     await user.save()
     res.send(200)}
     catch(e){
         res.status(400).send({errors:[{error:'Something went wrong !'}]})
     }
 })
router.post('/user/block/:name',auth,async(req,res)=>{
    const name = req.params.name
    const userToBeBlocked  =  await (await User.findOne({name})).isSelected('_id')
    if(userToBeBlocked)
    {
        req.user.blocked.push(userToBeBlocked._id)
    }
    console.trace(req.user)
    res.send(200)
})
module.exports= router