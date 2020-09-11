const express =require('express')
const app =express()
const path =require('path')
require('./db/mongoose')
const bodyParser=require('body-parser')
const port = process.env.PORT || 7000;
const userRouter= require('./routes/user/user.routes')
const tweetRouter= require('./routes/tweet/tweet')
const cors=require('cors')
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter)
app.use(tweetRouter)
if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}
app.listen(port, () => console.log(`Listening on port ${port}`));