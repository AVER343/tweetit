import {useEffect, useState} from 'react'

import {Button} from 'react-bootstrap'
import React from 'react'
import axios from 'axios'
import {getJWT} from '../../redux/users/users.utils'
import {withRouter} from 'react-router-dom'

const ProfileStatic=(props)=>{
  const [isFriend,setFriendStatus]=useState(false)
  useEffect(() => {
    try{
      async function newFunc(){
        if(props.profile.name)
        {
        const a = await axios({url:`https://tweetit-react.herokuapp.com//friends/isfriend/${props.profile.name}`,headers:{'Authorization':`Bearer ${getJWT()}`}})
        await  setFriendStatus(a.data.isfriend)
      }
        }
        newFunc()
    }
    catch(e){
      console.log(e.response)
    }
},[isFriend])
    const onSendRequest= async ()=>{
      try{
        const res= await axios({url:`https://tweetit-react.herokuapp.com//add/friend/${props.profile.name}`,method:'POST',headers:{'Authorization':`Bearer ${getJWT()}`}})
        setFriendStatus(true)      
      }
      catch(e){
        console.log(e.response)
      }
    }
    return(<div>
     {props.profile.isMe?null:isFriend?null:<Button variant="outline-success" onClick={()=>onSendRequest()}>SEND FRIEND REQUEST</Button>}
      {Object.keys(props.profile).map((elem,index)=>{
        if(['image','isme',"private",'temporaryimage'].includes(elem.toLowerCase()))
        {
            return
        }
        if(['aboutme'].includes(elem.toLowerCase()))
        { return(props.profile[`aboutme`]?<form>
        <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">About me</label>
          <div class="col-sm-10">
          <textarea style={{height:'150px'}} disabled class="form-control" id="exampleFormControlTextarea1" value={props.profile[`aboutme`]}rows="3"></textarea> </div>
        </div>
      </form>:null)
        }
        return(props.profile[elem]?<form>
        <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">{elem.charAt(0).toUpperCase() + elem.slice(1)}</label>
          <div class="col-sm-10">
            <input value={props.profile[elem]} type="text" class="form-control" id="inputPassword" placeholder={ elem.charAt(0).toUpperCase() + elem.slice(1)}/>
          </div>
        </div>
      </form>:null)
    }).filter(elem=>elem)}
    </div>)
}
export default withRouter(ProfileStatic)