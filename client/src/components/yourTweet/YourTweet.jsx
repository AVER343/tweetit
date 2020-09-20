import { Container, Row } from 'react-bootstrap'

import React from 'react'
import SingleCard from '../card/card'
import SpinnerValue from '../spinner/spinner'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class YourTweet extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loaded:false,
            data:[]
        }
    }
    async componentDidMount(){
            await this.trymakeRequest(8)
    }
    trymakeRequest=async(num)=>{
        try {
            let name = this.props.location.pathname.split('/')
             const res = await axios({url:`http://tweetit-react.herokuapp.com/tweet/${name[1]}/all`, headers:{'Authorization':`Bearer ${this.props.user.token}`}})
             if(res.status==200)
            { 
                if(res.data.tweets[0])
                {
                    await this.setState({data:res.data.tweets[0].tweet})
                    await this.setState({loaded:true})
                }
                else{
                    await this.setState({data:[]})
                    await this.setState({loaded:true})
                }
         }
         else{
             await this.makeRequest()
         }}
         catch(e){
             console.log(e)
         }
     }
    makeRequest=async()=>{
       try {
            const res = await axios({url:`http://tweetit-react.herokuapp.com/tweet/${this.props.user.username}/all`, headers:{'Authorization':`Bearer ${this.props.user.token}`}})
            if(res.status==200)
        {
            await this.setState({data:res.data.tweets[0].tweet})
           await this.setState({loaded:true})
        }
        else{
            await this.makeRequest()
        }}
        catch(e){
           console.log(e)
        }
    }
    render(){
        return(<div>
            <Container>
                <Row>
                    {this.state.loaded?this.state.data.map((elem,index)=><SingleCard key={index} elem={elem} />):<SpinnerValue/>}
                </Row>
            </Container>
        </div>)
    }
}
const mapStateToprops=(state)=>({
    user:state.user
})
export default connect(mapStateToprops)(withRouter(YourTweet))