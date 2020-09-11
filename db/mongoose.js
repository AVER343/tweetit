const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://aver343:asdfg@cluster0-ph0nf.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
},()=>{
    console.log("MONGODB CONNECTED !")
})