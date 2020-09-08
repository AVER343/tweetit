import { Spinner } from "react-bootstrap"
import React from 'react'
const SpinnerValue=()=>{
    return(
    <Spinner animation="border" role="status" style={{margin:'auto',marginTop:'10%',textAlign:'center',width:window.innerWidth/6,height:window.innerWidth/6}}>
        <span className="sr-only">Loading...</span>
    </Spinner>
    )
}
 export default SpinnerValue