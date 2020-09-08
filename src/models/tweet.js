const mongoose =require('mongoose')
const {ContentSchema} = require('./content')
const TweetSchema=mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    tweet:[{
       type: ContentSchema
    }]
})
TweetSchema.methods.toJSON=function(){
    const tweet = this
    const tweetObeject = tweet.toObject()
    delete tweetObeject.__v
    delete tweetObeject._id
    return tweetObeject
}
const Tweet = mongoose.model('tweet',TweetSchema)
module.exports= Tweet