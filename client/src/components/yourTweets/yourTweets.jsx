import React from 'react'
import axios from 'axios'
import SingleCard from '../card/card'
import SpinnerValue from '../spinner/spinner'
import {  withRouter } from 'react-router'
import { Container, Row } from 'react-bootstrap'
class YourTweet extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loaded:false,
            data:[]
        }
    }
    async componentDidMount(){
            if(window.localStorage.getItem('tweets')!=(''||null))
            {
                this.setState({loaded:true,data:[...JSON.parse(window.localStorage.getItem('tweets'))]})
            }
            await this.trymakeRequest(8)
    }
    trymakeRequest=async(num)=>{
        try {
             const res = await axios({url:`/tweet/${this.props.username}/all`, headers:{'Authorization':`Bearer ${this.props.token}`}})
             console.log(res)
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
             await window.localStorage.setItem('tweets',JSON.stringify(this.state.data.splice(0,num)))
         }
         else{
             console.log("Something went wrong !")
             await this.makeRequest()
         }}
         catch(e){
             console.log(e)
         }
     }
    makeRequest=async()=>{
       try {
            const res = await axios({url:`/tweet/${this.props.username}/all`, headers:{'Authorization':`Bearer ${this.props.token}`}})
            console.log(res)
            if(res.status==200)
        {
            await this.setState({data:res.data.tweets[0].tweet})
           await this.setState({loaded:true})
            await window.localStorage.setItem('tweets',JSON.stringify(this.state.data.splice(0,5)))
        }
        else{
            console.log("Something went wrong !")
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
export default withRouter(YourTweet)