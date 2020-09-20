import {Col, Container, Row, Spinner} from 'react-bootstrap'

import {Button} from 'react-bootstrap'
import OneTable from '../table/table'
import React from 'react'
import SpinnerValue from '../spinner/spinner'
import axios from 'axios'
import { get } from 'mongoose'

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
                        {!this.state.loaded?<SpinnerValue/>:<OneTable array={this.state.data}/> }   
                    </Row>
                  {!this.state.loaded?
                    <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        title="Loading"
                    />
                        Loading...
                    </Button>
                    :this.state.data.length%6!==0
                    ?null:<Button onClick={this.handleDataChange}variant="info" >Load More</Button>}
                </Container>
            </div>)
    }
}
export default TopTags