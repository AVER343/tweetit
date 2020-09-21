const express =require('express')
const app =express()
const path =require('path')
var http = require('http').createServer(app)
const io = require('socket.io')(http)
require('./db/mongoose')
const bodyParser=require('body-parser')
const port = process.env.PORT || 7000;
const userRouter= require('./routes/user/user.routes')
const messagingRouter= require('./routes/messaging/messaging')
const ProfileRouter= require('./routes/profile/profile.routes')
const PasswordRecoveryRouter= require('./routes/password-recovery/password-recovery')
const tweetRouter= require('./routes/tweet/tweet')
const friendRouter= require('./routes/friends/friends.routes')
const cors=require('cors')
let people=[]
const RESPONSES = require('./socketio.responses')
const { newTabOrLoggedIn, disconnectedOrLoggedOut } = require('./utils.js/utils')
app.use((req,res,next)=>{
    req.io = io;
    req.people=people
    next();
});
io.on('connect',(socket)=>{
    socket.on('NEW_USER',(user)=>{
        newTabOrLoggedIn({email:user.email,io,people})
    })
    socket.on('REFRESHED',(user)=>{
        disconnectedOrLoggedOut({email:user.email,io,people})
    })
    socket.on('GET_ONLINE',()=>{
        socket.emit('NEW_USER',people.length)
    })
})  
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ProfileRouter)
app.use(tweetRouter)
app.use(PasswordRecoveryRouter)
app.use(userRouter)
app.use(friendRouter)
app.use(messagingRouter)
io.on('connection', (socket) => {
    socket.on('join', (id) => {
       socket.join(id);
    })
   socket.on('new_message',({id,message,email}) =>{
        io.to(id).emit('new_message',{message,email})
    })
})
if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

http.listen(port, () => console.log(`Listening on port ${port}`));