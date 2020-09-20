const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
        trim: true,
        unique:true
    },
    image:Buffer,
    friends:{
        type:[mongoose.Types.ObjectId]
    },
    reqSent:{
        type:[mongoose.Types.ObjectId]
    },
    reqReceived:{
        type:[mongoose.Types.ObjectId]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password: {
        type:String,
        required:true,
        trim:true,
        validate(value) {
            if(value.length<8){
                throw new Error('Password needs to have more than 7 characters !')
            }
            if(value.toLowerCase().includes('password'))
            {
                throw new Error('Password is weak!')
            }
        }
    }, 
    profile:{
        name:String,
        email:String,
        private:{
            type:Boolean,
            default:false
        },
        aboutme:{
            type:String,
            trim:true,
            validate(value) {
                if(!value){
                    return true
                }
                if(value.length>150)
                {
                    throw new Error('About Me cannot be longer than 150 words !')
                }
            }
        },
        fullname:String,
        age:{
            type:Number,
            validate(value) {
                if(!value){
                    return true
                }
                else if(value<0)
                {
                    throw new Error('Age cannot be negative !')
                }
            }
        },
        onlineTabs:{
            type:Number,
            default:0
        },
        mobile:Number,
        address:String
    }
})
UserSchema.methods.toJSON=function(){
    const user =this
    const userObject= user.toObject()
    delete userObject.__v
    delete userObject.password
    delete userObject.tokens
    return userObject
}
UserSchema.statics.findByCredentials=async function(email,password){
  try{
        const credentials= await User.findOne({email})
        const isMatch = await bcrypt.compare(password,credentials.password)
        if (!isMatch) {
        throw new Error('Invalid Credentials !')
        }
    return credentials
    }
    catch(e){
        throw new Error('Invalid Credentials !')
    }
  
}
let starFunc=(a)=>{
    let b = a.split('@')
    b[0]=b[0].split('').map((elem,index)=>index<b[0].length-4?elem:"*")
    let c=''
    b[0].map(elem=>{c=c.concat(elem)})
    return `${c}@${b[1]}`
}
UserSchema.methods.generateJWT =async function(res){
    try
    {
        const user = this
        const JWToken =await jwt.sign({_id: user._id},`JWT_SECRET`)
        user.profile.name=user.name
        user.profile.email=starFunc(user.email)
        await user.save()
        return JWToken
    }
    catch(e)
    {
        console.log((e))
      return res.status(400).send({errors:[{error:'SOmething went Wrong!'}]})
    }
}
UserSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    if (user.isModified('friends')) {
        user.friends = user.friends.filter(elem=>elem.toString()!=user._id.toString())
    }
    next()
})
const User=mongoose.model('User',UserSchema)
module.exports=User