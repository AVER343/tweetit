const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth =async (req,res,next)=>{
    try
    {   
       const token = req.header('Authorization').replace('Bearer ','')
       const decodedUser =await jwt.verify(token,`SECRET_KEY`)
       const user = await User.findOne({_id:decodedUser._id,'tokens.token':token})
        if(!user)
        {
            throw new Error("UNAUTHORIZED!")
        }
        req.user=user
        req.token=token
        next()
    }
    catch(e)
    {
        res.status(400).send({errors:[{error:e.response.data}]})
    }
}  
module.exports=auth