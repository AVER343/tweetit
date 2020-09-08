import axios from 'axios'
import React from 'react'
import {Col,Row,Container} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import SpinnerValue from '../spinner/spinner'
import OneTable from '../table/table'
class TopTags extends React.Component{
    constructor(){
        super()
        this.state={
            data:[],
            loaded:false,
            top:6
        }
    }
    async componentDidMount(){
        const getData = await axios({url:'/hashtags',method:'POST',data:{top:this.state.top}})
        if(getData.status==200)
        {
            this.setState({data:getData.data.hashtags,loaded:true})
        }
    }
    handleDataChange=async()=>{
        await this.setState({top:this.state.top+6})
        const getData = await axios({url:'/hashtags',method:'POST',data:{top:this.state.top}})
        if(getData.status==200)
        {
            this.setState({data:getData.data.hashtags,loaded:true})
        }
    }
    render(){
        return(
            <div>  
                <Container>
                    <Row>
                        {this.state.loaded?<OneTable array={this.state.data}/>:<SpinnerValue/>}   
                    </Row>
                    <Button onClick={this.handleDataChange}variant="info" >Load More</Button>
                </Container>
            </div>)
    }
}
export default TopTags