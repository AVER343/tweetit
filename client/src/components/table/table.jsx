import React  from 'react'
import {Table} from 'react-bootstrap'
const OneTable =({array})=>{
    return(<Table striped bordered hover style={{textAlign:'left'}}>
        <thead>
          <tr>
            <th>#</th>
            <th>{"HashTag".toUpperCase()}</th>
            <th style={{textAlign:"center"}}>{"Freqency".toUpperCase()}</th>
          </tr>
        </thead>
        <tbody>
           { array.map((elem,index)=>( <tr key={index}>
                <td>{index+1}</td>
                <td>{elem.hashtag}</td>
                <td style={{textAlign:'center'}}>{elem.frequency}</td>
            </tr>))}
        </tbody>
      </Table>)
}
export default OneTable
