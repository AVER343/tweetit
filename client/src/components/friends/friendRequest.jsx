import {Button, Image} from 'react-bootstrap'
import React,{useEffect, useState} from 'react'

import axios from 'axios'
import {getJWT} from '../../redux/users/users.utils'

const FriendRequestReceived=()=>{
    const [friends,setFriendRequestReceived] = useState([])
    async  function newFunc(){
        let friends = await  axios({url:'http://localhost:7000/friends/received',method:'GET',headers:{'Authorization':'Bearer '+getJWT()}})
        await setFriendRequestReceived(friends.data)
       }
    useEffect(() => { newFunc() },[])
    const cancelReceivedRequest=async (name)=>{
        try{
            let friends =await axios({url:'http://localhost:7000/friends/request/recieved/'+name,method:'DELETE',headers:{'Authorization':'Bearer '+getJWT()}})
            if(friends.status==200)
            {
                newFunc()
            }
        }
        catch(e){
            console.log(e.message)
        }   
    }
    const acceptReceivedRequest =async(name)=>{
       try{
            let friends =await axios({url:'http://localhost:7000/friends/request/recieved/'+name,method:'POST',headers:{'Authorization':'Bearer '+getJWT()}})
            console.log(friends)
            if(friends.status==200)
            {
                newFunc()
            }
        }
        catch(e){
            console.log(e.message)
        }
    }
    return(<table class="table table-hover" >
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">User</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
        </tr>
        {friends.map((user,index)=>{
            return(<tr key={index} style={{textAlign:'center'}}>
                <td>{index+1}</td>
                <td><Image roundedCircle style={{width:'50px',height:'50px'}} src={user.image?`data:image/jpeg;base64,${user.image}`:"https://www.flaticon.com/svg/static/icons/svg/848/848006.svg"}/></td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td><Button onClick={()=>acceptReceivedRequest(user.name)} style={{display:'inline',marginLeft:'50px'}} variant="outline-success" type="submit">
                Accept Request 
              </Button><Button onClick={()=>cancelReceivedRequest(user.name)} style={{display:'inline',marginLeft:'50px'}} variant="outline-danger" type="submit">
                Cancel Request ?
              </Button>
              </td>
                
            </tr>)
        })}
    </thead>
    <tbody>
       
    </tbody>
    </table>)
}
export default FriendRequestReceived