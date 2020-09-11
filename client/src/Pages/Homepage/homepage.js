import React from 'react'
import './homepage.styles.css'
import { Redirect, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { render } from 'react-dom'
class HomePage  extends React.Component{
    constructor(props)
 {
   super(props)
   this.state={
     page:1
   }
 }
 async componentDidMount(){
}
handleChange=()=>{
    this.setState({ page: this.state.page+1});
}
    render(){
            return(this.props.currentUser?<div>{JSON.stringify(this.props.currentUser)}</div>:
                <h1 className="center" style={{textAlign:'center'}}>    
                    LOGIN TO  CONTINUE !
                </h1>)
            }
}
const mapStateToProps=(state)=>({
    currentUser:state.user
})
export default withRouter(connect(mapStateToProps)(HomePage))