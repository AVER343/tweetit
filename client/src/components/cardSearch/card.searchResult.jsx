import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const SearchResultCard=(props)=>{
   let {users}=props
    return(users.map((elem,index)=>{
        let image
        if(elem.image){
          image= btoa(String.fromCharCode(...new Uint8Array(elem.image.data)))
        }
        return( <div class="col-sm" style={{marginTop:'10px',textAlign:'center'}}> <Card key={elem.name} style={{ width:`18rem` }}>
        <Card.Img style={{width:'100px',height:'100px',marginLeft:'auto',marginTop:'10px',marginRight:'auto'}} variant="top" src={elem.image?`data:image/jpeg;base64,${image}`:"https://www.flaticon.com/svg/static/icons/svg/848/848006.svg"} />
        <Card.Body>
          <Card.Title>{elem.name}</Card.Title>
          <Card.Text>
           {elem.email}
          </Card.Text>
         <Link to={`/profile/${elem.name}`} ><Button variant="primary">Profile</Button></Link>
        </Card.Body>
      </Card></div>)
  }))
}
export default SearchResultCard