import {Button, Image, Table} from 'react-bootstrap'
import React, { Component, useEffect, useState } from 'react'

import {Link} from 'react-router-dom'
import axios from 'axios'
import {getJWT} from '../../redux/users/users.utils'

const MyFriends=()=>{
    const [friends,setFriends] = useState([])
    useEffect(() => {
        let newFunc =async()=>{
            let friends=  await axios({url:'http://localhost:7000/friends/all',method:'GET',headers:{'Authorization':'Bearer '+getJWT()}})
            await setFriends(friends.data)
            }
        newFunc()
    })
    return(<div>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            </tr>
        </thead>
    <tbody>
        {friends.map((friend,index) =>{
                                    return(<tr key={index}>
                                        <td>{index+1}</td>
                                        <td><Image roundedCircle style={{width:'50px',height:'50px'}} src={friend.image?`data:image/jpeg;base64,${friend.image}`:"https://www.flaticon.com/svg/static/icons/svg/848/848006.svg"}/> {friend.name}</td>
                                        <td>{friend.email}</td>
                                        <td><Button variant="outline-info"><Link to={`/message/${friend.name}`}>Message</Link></Button></td>
                                        </tr>)})
                                }
    </tbody>
    </Table>
    </div>)
}
export default MyFriends