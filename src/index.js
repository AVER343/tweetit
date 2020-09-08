const express = require('express')
const Tweet=require('./routes/tweet')
var multer  = require('multer')
var upload = multer()
const bodyParser= require('body-parser')
require('./db/mongoose')
const cors = require('cors')
const app=express()
const User=require('./routes/user')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(Tweet)
app.use(User)
if(!process.env.PORT)
{
    process.env.PORT=5000
}
app.use(express.static('client/build'))
app.use("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
app.listen(process.env.PORT,()=>{
    console.log(`Listening to port ${process.env.PORT}`)
})
