const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth =async (req,res,next)=>{
    try
    {   
       const token = req.header('Authorization').replace('Bearer ','')
       const decodedUser =await jwt.verify(token,`JWT_SECRET`)
       const user = await User.findOne({_id:decodedUser._id})
        if(!user)
        {
            throw new Error("UNAUTHORIZED!")
        }
        req.user=user
        req.token=token
        req.image=user.image
        next()
    }
    catch(e)
    {
        if(e.response)
        {
       
            res.status(400).send({errors:[{error:e.response.data}]})
        }
        else if(e.message){     
            res.status(400).send({errors:[{error:e.message}]})
        }
        else{
            res.status(400).send({errors:[{error:"Authentication error!"}]})
        }
    }
}  
module.exports=auth