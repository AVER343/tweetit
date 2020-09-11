const mongoose =require('mongoose')
const HashTag = require('./hashTag')
const validator = require('validator')
const ContentSchema = new mongoose.Schema({
    image:Buffer,
    text:String,
    caption:{
        type:String,
        validate(value) {
            if (value.length>150) {
                throw new Error('Text longer than 150 characters ! ')
            }
        }
    }
})
ContentSchema.methods.toJSON=function(){
    const content = this
    const contentObject = content.toObject()
    delete contentObject.__v
    delete contentObject._id
    return contentObject
}
ContentSchema.methods.hashtags=async function(hashtags){
       hashtags=hashtags.map(async elem=>{ 
                            let hash = await HashTag.findOneAndUpdate({hashtag:elem}, { $inc: {frequency:1}})
                            if(!hash)
                            {
                                hash = await new HashTag({hashtag:elem,frequency:1})
                            }
                            await hash.save()
                            return (hash)
                        }) 
    return hashtags
}
const Content = mongoose.model('Content',ContentSchema)
module.exports={ContentSchema,Content}