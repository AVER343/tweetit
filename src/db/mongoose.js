const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://aver343:asdfg@cluster0-ph0nf.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
},()=>{
    console.log("MongoDB working ! ")
})