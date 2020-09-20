const mongoose =require('mongoose')
const MessagingSchema=mongoose.Schema({
    user1:mongoose.Types.ObjectId,
    user2:mongoose.Types.ObjectId,
    messaging:[{
        author:mongoose.Types.ObjectId,
        message:String
    }]
})
MessagingSchema.methods.toJSON=function(){
    const Messaging = this
    const MessagingObeject = Messaging.toObject()
    delete MessagingObeject.__v
    return MessagingObeject
}
const Messaging = mongoose.model('Messaging',MessagingSchema)
module.exports= Messaging