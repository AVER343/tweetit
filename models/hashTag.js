const mongoose=require('mongoose')
const HashTagSchema = mongoose.Schema({
    hashtag: String,
    frequency:{
        type: Number,
        default: 0
    }
})
HashTagSchema.methods.toJSON=function(){
    let hashtag = this
    let hashtagObject = hashtag.toObject()
    delete hashtagObject.__v
    delete hashtagObject._id
    return hashtagObject
}
const HashTag = mongoose.model('HashTag',HashTagSchema)
module.exports=HashTag