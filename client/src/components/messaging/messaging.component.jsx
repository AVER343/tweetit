import {Alert, Button, FormControl, InputGroup} from 'react-bootstrap'
import {useEffect, useState} from 'react'

import React from 'react'
import axios from 'axios'
import {getJWT} from '../../redux/users/users.utils'
import {getUser} from '../../redux/users/users.utils'
import io from 'socket.io-client';
import {withRouter} from 'react-router-dom'

const socket = io('https://tweetit-react.herokuapp.com/');

const Messaging=(props)=>{
    const [messages,setMessages] =useState([])
    socket.on('new_message',({message,email})=>{
        console.log(message,email);
            setMessages(messages.concat({message,author:email}))
    })
    useEffect(() => {
        if(messages.length==0)
        {
            async function newFunc(){
                const newmessages= await axios({url:`https://tweetit-react.herokuapp.com/messages/${props.location.pathname.split('/')[2]}`,method:'GET',headers:{'Authorization':'Bearer '+getJWT()}})
                if((newmessages.data.message[0]))
                {
                    setMessages(newmessages.data.message[0].messaging)
                    console.log(newmessages.data.message[0]._id)
                    socket.emit('join',newmessages.data.message[0]._id)
                }
            }
            newFunc()
        }
    },[])
const handleClick =async()=>{
    if(input=='')
    {
        return
    }
    const newmessage= await axios({url:`https://tweetit-react.herokuapp.com/messages/${props.location.pathname.split('/')[2]}`,method:'POST',data:{message:input},headers:{'Authorization':'Bearer '+getJWT()}})
    if(messages.length==0)
    {
        async function newFunc(){
            const newmessages= await axios({url:`https://tweetit-react.herokuapp.com/messages/${props.location.pathname.split('/')[2]}`,method:'GET',headers:{'Authorization':'Bearer '+getJWT()}})
            if((newmessages.data.message[0]))
            {
                setMessages(newmessages.data.message[0].messaging)
            }
        }
        newFunc()
    }
    else{ socket.emit('new_message',{id:newmessage.data.message._id,message:input,email:getUser().email})
    setInput('')}
}
    const [input,setInput]=useState('')
    return(<div className="container">
            <h1 style={{textAlign:'center'}}>{props.location.pathname.split('/')[2]}</h1>
        {messages.map((message,idx) => <div>
               <div scope="row" style={message.author.toString()==getUser().email.toString()?{textAlign:'right'}:{textAlign:'left'}}> <Alert key={idx} variant={message.author==getUser().email?'primary':'secondary'}>
    {message.message}{console.log({email:message.author.toString()})}
  </Alert></div>
               </div>)}
        <InputGroup className="mb-3">
     <FormControl
            placeholder="Enter message"
            aria-label="Enter message"
            aria-describedby="basic-addon2"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            />
            <InputGroup.Append>
                    <Button variant="outline-secondary"  onClick={handleClick}  >Send </Button>
            </InputGroup.Append>
        </InputGroup>
    </div>)
}
export default withRouter(Messaging)
