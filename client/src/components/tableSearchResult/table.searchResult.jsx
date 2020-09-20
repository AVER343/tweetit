import { Button, Card, Image } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'

import React from 'react'

const SearchResultTable=(props)=>{
   let {users}=props
    return(<table class="table table-hover">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">User</th>
        <th scope="col">Email</th>
        </tr>
    </thead>
    {users.map((user,index)=>{
        let image
        if(user.image){
          image= btoa(String.fromCharCode(...new Uint8Array(user.image.data)))
        }
        return(<tbody onClick={()=>props.history.push(`/profile/${user.name}`)}>
            <tr>
            <th scope="row">{index+1}</th>
            <td><Image roundedCircle style={{width:'50px',height:'50px'}} src={user.image?`data:image/jpeg;base64,${image}`:"https://www.flaticon.com/svg/static/icons/svg/848/848006.svg"}/>{` `+user.name+` `}</td>
            <td>{user.email}</td>
            </tr>
        </tbody>)})}
    </table>)
}
export default withRouter(SearchResultTable)