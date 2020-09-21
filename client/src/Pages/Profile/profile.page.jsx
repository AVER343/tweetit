import { Button, Col, Container, FormFile, Image, InputGroup, Row } from 'react-bootstrap'
import { GET_IMAGE, UpdateSuccess, asyncGet } from '../../redux/profile/profile.actions'
import React, { useRef } from 'react'
import { getJWT, getUser } from '../../redux/users/users.utils'

import FormFileInput from 'react-bootstrap/esm/FormFileInput'
import InputSingle from '../../Components/input/inputGroup'
import ProfileComponents from '../../Components/updateProfile/updateProfile.components'
import ProfileStatic from '../../Components/profile/profile.static'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// import * as svg1 from '../../assets/user.svg'
class  Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            fileToUpload:null,
            imageURL:null,
            disabled:false,
            aboutMe:'',
            static:true
        }
    }
   async componentDidMount(){
        let name=this.props.location.pathname.split('/')
        await this.props.GET_DATA(name[2]);
    }
    async componentDidUpdate(prevProps){
        if(this.props.location.pathname!=prevProps.location.pathname)
        {
            let name=this.props.location.pathname.split('/')
            await this.props.GET_DATA(name[2])
        }
    }
    fileChangedHandler =async(event) => {
       try{ event.persist()
        const file= event.target.files[0]
        await this.setState({fileToUpload:file})  
        const data = new FormData()
        data.append('image', this.state.fileToUpload)
       const post= await axios.post("https://tweetit-react.herokuapp.com//profile", data,{ headers:{'Authorization':`Bearer ${getJWT()}`,"Content-Type": "multipart/form-data"}})
       let name=this.props.location.pathname.split('/')
        this.props.GET_DATA(name[2])
        document.getElementById('input').value=''}
        catch(e){
            console.log(e)
        }
    }  

    render(){
        return(<div className="container">
            {this.props.profile?.name==getUser().username?<div className="custom-control custom-switch" style={{marginRight:'auto'}}>
                <button type="button" class={this.state.static?"btn btn-outline-primary":"btn btn-outline-secondary"} onClick={()=>this.setState({static:!this.state.static})}>
                {this.state.static?'UPDATE PROFILE':'GO BACK'}</button>
            </div>:null}
            
            <Container style={{margin:'20px'}} >
                    <Row>
                    <Col xs={3} md={2}>
                        <Image  src={this.props.profile
                                    ?this.props.profile.temporaryImage
                                        ?`data:image/jpeg;base64,${this.props.profile.temporaryImage}`
                                        :this.props.profile.image && this.props.profile.name==getUser().username ?`data:image/jpeg;base64,${this.props.profile.image}`
                                    :"https://www.flaticon.com/svg/static/icons/svg/848/848006.svg"
                                    :"https://www.flaticon.com/svg/static/icons/svg/848/848006.svg"} roundedCircle />
             {this.props.profile?this.props.profile?.isMe?<input onChange={this.fileChangedHandler} id="input" type="file"/>:null:null}
                    </Col>
                        <Col xs={6} md={4} style={{marginTop:'20px',marginLeft:'50px'}}>
                    </Col>
                    </Row>
            </Container>
           {this.props.profile?this.state.static?<ProfileStatic profile={this.props.profile}/>:<ProfileComponents {...this.props.profile}/>:null}                       
        </div>)
    }
}
const mapStateToProps=(state)=>({
    profile:state.profile
})
const dispatchStateToProps=dispatch=>({
    GET_DATA:(name)=>dispatch(asyncGet(name)),
    GET_IMAGE:()=>dispatch(GET_IMAGE()),
    UpdateSuccess:(data)=>dispatch(UpdateSuccess(data))
})
export default withRouter(connect(mapStateToProps,dispatchStateToProps)(Profile))