const express =require('express')
const {Content} =require('../../models/content')
const HashTag = require('../../models/hashTag')
const Tweet = require('../../models/tweet')
const mergeSort = require('./mergeSort')
const Feed = require('../../models/feed')
const sharp =require('sharp')
const mongoose = require('mongoose')
const auth = require('../../middlewares/auth')
const router = express.Router()
router.get('/feed', auth,async(req, res) =>{
  let now= Date.now()
    let feed = await Feed.findOne({username: req.user.name})
    let temp = []
    if(!feed)
    {
        feed = new Feed({ username: req.user.name })
        await feed.save()
    }
    const Tweets =await Tweet.find({ 'tweet._id':{$in : feed.feed.map(elem=>mongoose.Types.ObjectId(elem.toString()))}}).lean()
    Tweets.map((elem,index)=>elem.tweet.map((tweet)=>{
        temp.push({username:Tweets[index].username,...tweet,date:Date.parse(tweet.date)})
    }))  
    temp=temp.filter(elem=>elem.date)
    console.log(temp)
    function compare( a, b ) {
        if ( a.date < b.date ){
          return -1;
        }
        if ( a.date > b.date ){
          return 1;
        }
        return 0;
      }
      
    temp= temp.sort( compare ).reverse();
    res.send(temp)
})
module.exports= router