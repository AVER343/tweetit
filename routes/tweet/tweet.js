const express =require('express')
const {Content} =require('../../models/content')
const HashTag = require('../../models/hashTag')
const Tweet = require('../../models/tweet')
const User = require('../../models/user')
const sharp =require('sharp')
const auth = require('../../middlewares/auth')
const upload = require('../../middlewares/upload')
const router = express.Router()
const mongoose =require('mongoose')
const Feed = require('../../models/feed')
router.get('/tweet/:username/all',auth,async(req,res)=>{
    try
    {
        const {username}=req.params
        const tweets =await Tweet.find({username})
        res.send({tweets})
    }
    catch(e)
    {
        res.status(400).send({error:{message:"Something went wrong !"}})
    }
})
router.post('/tweet',upload.any(),auth,async (req,res)=>{
    const {username,tweet,caption}=req.body
    const text=tweet
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

    //find and update hashtag values
    let newHashTags=tweetAdded.hashtags(hashtagsInCaption) // array of promises , saving to hastag model
    newHashTags=await newHashTags       
    newHashTags= await Promise.all(newHashTags)
     // adding to hashtags
     
    if(!existingUser)
    {
        const tweet =new Tweet({username,tweet:[tweetAdded],hashtags:hashtagsInCaption})
        const feed = new Feed({username,feed:[mongoose.Types.ObjectId(tweetAdded._id.toString())]})
        const a =  await tweet.save()
        const b = await feed.save()
        Promise.all([a,b])
        res.status(200).send({tweet:tweetAdded,hashtags:hashtagsInCaption})
    }
    else
    {   
        existingUser.tweet.push(tweetAdded)
      
        const feed =await Feed.findOne({username})
        feed.feed.push(tweetAdded._id.toString())
        const user = await User.findOne({name:username}).select('friends')
        const a =   existingUser.save()
        const b =  feed.save()
       await Promise.all([a,b])
       if(user.friends)
       {
        let savingToAllUsers = user.friends.map(async elem=>{
            const friend =await User.findById({_id:mongoose.Types.ObjectId(elem.toString())})
            const feed = await Feed.findOne({username:friend.name})
            if(!feed){
                const newfeed = new Feed({username,feed:[]})
                newfeed.feed = [].push(tweetAdded._id.toString())
                await newfeed.save()
            }
            else{
                feed.feed.push(tweetAdded._id.toString())
                await feed.save()
            }
            return feed
           })
       }
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