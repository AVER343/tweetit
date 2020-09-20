import {Button, Image} from 'react-bootstrap'
import React,{useEffect, useState} from 'react'

import axios from 'axios'
import {getJWT} from '../../redux/users/users.utils'

const FriendRequestSent=()=>{
    const [friends,setFriendRequestSent] = useState([])
    useEffect(() => {
        async  function newFunc(){
            let friends = await  axios({url:'http://localhost:7000/friends/sent',method:'GET',headers:{'Authorization':'Bearer '+getJWT()}})
            await setFriendRequestSent(friends.data)
           }
           newFunc()
    },[friends.length])
    const cancelSentRequest=async(props)=>{
        try{
            await  axios({url:'http://localhost:7000/friends/request/sent/'+props.name,method:'DELETE',headers:{'Authorization':'Bearer '+getJWT()}})
            let friends = await  axios({url:'http://localhost:7000/friends/sent',method:'GET',headers:{'Authorization':'Bearer '+getJWT()}})
            await setFriendRequestSent(friends.data)
        }        catch(e){
            console.log(e.response)
        }
    }
    return(<table class="table table-hover">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">User</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
        </tr>
        {friends.map((user,index)=>{
            return(<tr key={index}>
                <td>{index+1}</td>
                <td><Image roundedCircle style={{width:'50px',height:'50px'}} src={user.image?`data:image/jpeg;base64,${user.image}`:"https://www.flaticon.com/svg/static/icons/svg/848/848006.svg"}/></td>
                <td>{user.profile.email}</td>
                <td>{user.name}</td>
                <td><Button onClick={()=>cancelSentRequest(user)} style={{display:'inline',marginLeft:'50px'}} variant="outline-danger" type="submit">
                Cancel Request ?
              </Button></td>
            </tr>)
        })}
    </thead>
    <tbody>

    </tbody>
    </table>)
}
export default FriendRequestSent