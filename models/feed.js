const mongoose =require('mongoose')
const FeedSchema=mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    feed:[{type:String}]
})
FeedSchema.methods.toJSON=function(){
    const Feed = this
    const FeedObeject = Feed.toObject()
    delete FeedObeject.__v
    delete FeedObeject._id
    return FeedObeject
}
const Feed = mongoose.model('Feed',FeedSchema)
module.exports= Feed