import {Alert, Card, CardColumns} from 'react-bootstrap'
import React,{useEffect, useState} from 'react'

import axios from 'axios'
import {getJWT} from '../../redux/users/users.utils'

const MyFeed =()=>{
    useEffect(() => {
        axios({url:`http://localhost:7000/feed`,method:'GET',headers:{'Authorization':'Bearer '+getJWT()}})
            .then(elem=>{
                setTweets(elem.data)
               console.log(elem)
            })
            .catch(e=>console.log(e))
               
    },[])
    const [tweets,setTweets]=useState([])
return(<div className="container" style={{textAlign:'center',width:'400px'}}>

        {tweets.map((tweet,index)=>{
            return(<Card style={{marginTop:'10px',marginBottom:'10px'}}>
                {tweet.image? <Card.Img variant="top" src={`data:image/jpeg;base64,${tweet.image}`} />:null}
                <Card.Body>
                  <Card.Title>USER : {tweet.username}</Card.Title>
                  <Card.Text>
                    {tweet.text}
                  </Card.Text>
                </Card.Body>
                <div className="container">
                    <b>Caption : </b>{tweet.caption}
                </div>
                <Card.Footer>
                    {tweet.date?<small className="text-muted">Tweetit : {new Date(tweet.date).toLocaleDateString()} - {new Date(tweet.date).toLocaleTimeString()}</small>:null}
                </Card.Footer>
              </Card>)
        })}
</div>)}
export default MyFeed