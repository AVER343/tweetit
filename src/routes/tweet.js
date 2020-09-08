const express =require('express')
const {Content} =require('../models/content')
const HashTag = require('../models/hashTag')
const Tweet = require('../models/tweet')
const multer =require('multer')
const sharp =require('sharp')
const auth = require('../middleware/auth')
const upload=multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})
const router = express.Router()
router.get('/',async(req,res)=>{
    const get = await Tweet.find()
    res.send({data:get})
})
router.get('/tweet/:username/all',auth,async(req,res)=>{
    try{
    const {username}=req.params
    const tweets =await Tweet.find({username})
    res.send({tweets})}
    catch(e)
    {
        res.status(400).send({error:{message:"Something went wrong !"}})
    }
})
router.post('/tweet',upload.any(),auth,async (req,res)=>{
    const {username,text,caption}=req.body
    let image=''
    try 
    {
    if(req.files[0])
    {
        image= await sharp(req.files[0].buffer).resize({ width: 300, height: 300 }).png().toBuffer()
    }
    const getHashtagsFromString=(givenString)=>{
        const arrayOfStrings = givenString.split(' ')
        const len=arrayOfStrings.length
        let i=0
        let hashtags=[]
        for(i=0;i<len;i++)
        {
            if(arrayOfStrings[i][0]=='#')
            {
                hashtags.push(arrayOfStrings[i])
            }
        }
        return hashtags
    }
    let hashtagsInCaption=await getHashtagsFromString(caption)
    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }
    hashtagsInCaption = hashtagsInCaption.filter(onlyUnique)
    let tweetAdded = new Content({text,caption,image,hashtags:hashtagsInCaption})
    const existingUser =await Tweet.findOne({username})
    console.log(hashtagsInCaption)
    //find and update hashtag values
    let newHashTags=tweetAdded.hashtags(hashtagsInCaption) // array of promises , saving to hastag model
    newHashTags=await newHashTags       
    newHashTags= await Promise.all(newHashTags)
     // adding to hashtags
     
    if(!existingUser)
    {
        const tweet =new Tweet({username,tweet:[tweetAdded],hashtags:hashtagsInCaption})
        await tweet.save()
        res.status(200).send({tweet:tweetAdded,hashtags:hashtagsInCaption})
    }
    else
    {   
        existingUser.tweet.push(tweetAdded)
        await existingUser.save()
        res.status(200).send({tweet:tweetAdded,hashtags:hashtagsInCaption})
    }
}
    catch(e){
        console.log(e)
        res.status(400).send({errors:[{message:"Something went wrong !",error:e}]})
    }
})
router.post('/hashtags',async(req,res)=>{
  
    const {top} = req.body
    try{
        await HashTag.find({}).sort({frequency: -1}).limit(top).exec( 
            function(err, hashtags) {
                if(err)
                {
                    res.status(400).send({erros:[{message:'Something went wrong !'}]})
                }
                res.status(200).send({hashtags})
            }
        );
        
    }
    catch(e){
        res.status(400).send({erros:[{message:'Something went wrong !'}]})
    }
})
router.delete('/hashtags',async (req,res)=>{
    await HashTag.deleteMany({})
    res.send(200)
})

module.exports= router