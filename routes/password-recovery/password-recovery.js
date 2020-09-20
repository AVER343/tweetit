const express =require('express')
const sgMail = require('@sendgrid/mail')
var assert = require('assert');
var crypto = require('crypto');
const { scrypt, randomBytes } =require('crypto');
const { promisify } =require('util')
const scryptAsync = promisify(scrypt);
const router = new express.Router();
const auth= require('../../middlewares/auth')
const jwt = require('jsonwebtoken')
const User= require('../../models/user');
const { RSA_NO_PADDING } = require('constants');
var algorithm = 'aes256';
var inputEncoding = 'utf8';
var outputEncoding = 'hex';
const key = crypto.createHash('sha256').update(String("JWT_SECRET")).digest('base64').substr(0, 32);
router.post('/password/reset',async(req,res)=>{
       try { 
           const {email}=req.body
           function validateEmail(email) 
                {
                    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                } 
           if(!validateEmail(email)&&email)
           {
            return res.status(400).send({errors:[{error:'Empty or Invalid email !'}]})
           }
            const user =await User.findOne({email})
            sgMail.setApiKey('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')
            if(!user)
                {
                    return res.status(400).send({errors:[{error:'User not found !'}]})
                }   
           
            const UserJWToken =await jwt.sign({_id: user._id,created:Date.now()},`JWT_SECRET`)
                var ivlength = 16  // AES blocksize
                var iv = crypto.randomBytes(ivlength);
                var cipher = crypto.createCipheriv(algorithm, key, iv);
                var ciphered = cipher.update(UserJWToken, inputEncoding, outputEncoding);
                ciphered += cipher.final(outputEncoding);
                var ciphertext = iv.toString(outputEncoding) + ':' + ciphered
              
            const msg = {
                to: user.email,
                from: 'tweetit.team@gmail.com',
                subject: 'Tweetit Password Reset',
                text: 'Password Reset',
                html: `Hi, <h1>${user.name.toUpperCase()}</h1> Click on the link to reset your password :<a href="${`http://tweetit-react.herokuapp.com/password/reset/${ciphertext}`}"><button type="button" class="btn btn-outline-success">RESET PASSWORD</button></a>`,
        }
            await sgMail.send(msg)
            res.sendStatus(200)
        }   
    catch(e){
        console.log(e)
        res.status(400).send({errors:[{error:'Something went wrong!'}]})
    }
})
router.post('/password/reset/:token',async (req,res)=>{
    try{
        let {token} = req.params
        let {password,confirmPassword}=req.body
        var components = token.split(':');
        var iv_from_ciphertext = Buffer.from(components.shift(), outputEncoding);
        var decipher = crypto.createDecipheriv(algorithm, key, iv_from_ciphertext);
        var deciphered = decipher.update(components.join(':'), outputEncoding, inputEncoding);
        deciphered += decipher.final(inputEncoding);
        const UserJWT = jwt.verify(deciphered,'JWT_SECRET')
        if(!password)
        {
            return res.status(400).send({errors:[{error:'Password cannot be Empty !'}]})
            
        }
        if(password.length<7)
        {
            return res.status(400).send({errors:[{error:'Password needs to be longer than 7 characters'}]})
        }
        if(password!==confirmPassword)
        {
            return res.status(400).send({errors:[{error:'Password and Confirm Password are not same !'}]})
        }

        if(!UserJWT)
        {
           return res.status(400).send({errors:[{error:'Invalid Request !'}]})
        } 
        if(UserJWT.created+600*1000<Date.now())
        {
            return res.status(400).send({errors:[{error:'Time expired for the request !'}]})
        }
        const user = await User.findById({_id:UserJWT._id})
        if(!user)
        {
            return res.status(400).send({errors:[{error:'User doesn\'t exist ! '}]})
        }
        user.password=password
        await user.save()
         res.send(200)
    }  
    catch(e){
        console.log(e)
        res.status(400).send({errors:[{error:'Something went wrong !'}]})
    }
    
})
module.exports = router