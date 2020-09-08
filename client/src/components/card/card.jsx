import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
const SingleCard=(props)=>{
    console.log(props)
    const{caption,_id,text,image}=props.elem

    const getHashtagsFromString=(givenArrayString)=>{
        const arrayOfStrings = givenArrayString.split(' ')
        const len=arrayOfStrings.length
        let i=0
        let hashtags=[]
        for(i=0;i<len;i++)
        {
            if(arrayOfStrings[i][0]=='#')
            {
                hashtags.push(arrayOfStrings[i])
            }
        }
        return hashtags
    }
    const Example = () => <Card.Img variant="top" src={image!=''?`data:image/jpeg;base64,${image}`:"https://react-bootstrap.netlify.app/logo.svg"} />
   const handleClick=()=>{

    }
    return(<Card style={{ width: '18rem' ,marginRight:'auto',marginLeft:'auto',marginTop:'auto',marginBottom:'auto'}}  className="mx-auto my-2">
  
  <Card.Body>
      {Example()}
    <Card.Title>{text}</Card.Title>
    <Card.Text>
      {caption}
    </Card.Text>
    {getHashtagsFromString(caption).map((elem,index)=><Link to="#">{' '+elem+' ' }</Link>)}
    {/* <Button variant="primary">Get frequency</Button> */}
  </Card.Body>
</Card>)
}
export default  SingleCard