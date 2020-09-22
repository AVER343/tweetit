import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React from 'react'
import { asyncGet } from '../../redux/profile/profile.actions'
import axios from 'axios'
import { connect } from 'react-redux'
import { getJWT } from '../../redux/users/users.utils'

class HomepageComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            tweet:'',
            caption:'',
            fileToUpload:null,
            disabled:false
        }
    }
    componentDidMount(){
            this.props.ASYNC_GET(this.props.currentUser.username)
    }
    onSubmit=async (event)=>{
        try{
            event.preventDefault()
        event.persist()
        const {tweet,caption,fileToUpload}=this.state
        const data = new FormData()
        data.append('username',this.props.user.username)
          data.append('image', fileToUpload)
          data.append('tweet',tweet.trim())
          data.append('caption',caption.trim())
          const posted=await axios.post("http://localhost:7000/tweet", data,{ headers:{'Authorization':`Bearer ${getJWT()}`,"Content-Type": "multipart/form-data"}})
          
          await this.setState({disabled:false})
          if(posted.status==200)
           {
              await this.setState({tweet:'',caption:'',fileToUpload:null})
              await this.setState({disabled:false})
           }
           else{
               console.log("ERROR")
               alert('Something went wrong !')
               await this.setState({disabled:false})
           }
           document.getElementById('input').value=''
        }
        catch(e){
            console.log(e.response)
        }
        }
    fileChangedHandler =(event) => {
        event.persist()
        const file= event.target.files[0]
         this.setState({fileToUpload:file})
        }  
    handleChange=async(event)=>{
        event.persist()
        const {name,value}=event.target
        if(name=='caption' && value.length>150)
        {
            return
        }
        await this.setState({[name]:value})
    }
    render(){
        return(
            <div >
                
            <div style={{verticalAlign:'center',textAlign:'center',marginTop:'10%',fontWeight:'bolder',fontSize:window.innerWidth>600?window.innerWidth/15:window.innerWidth/10}}><img
                    src="https://i.ibb.co/6vjCjWK/OnlyLoGO.png"
                    width={window.innerWidth>600?window.innerWidth/15:window.innerWidth/10}
                    height={window.innerWidth>600?window.innerWidth/15:window.innerWidth/10}
                    className="d-inline-block align-top"
                /> TWEETIT</div>
            <Form style={{ marginLeft:'auto',marginRight:'auto', verticalAlign:'center',textAlign:'center',margintop:"10%",fontWeight:'bolder', width:window.innerWidth>600?window.innerWidth/3:"100%"}}>
              <Form.Group controlId="formGroupPassword">
                  <Form.Control value={this.state.tweet}  onChange={this.handleChange}  name="tweet" type="text" placeholder="Tweet" style={{marginTop:'10px',marginLeft:'auto',marginRight:'auto'}} />
                  <Form.Control value={this.state.caption}  onChange={this.handleChange} name="caption" type="text" placeholder="Caption" style={{marginTop:'10px',marginLeft:'auto',marginRight:'auto'}} />
                  <input id="input" type='file' onChange={this.fileChangedHandler} />
              <Button disabled={this.state.disabled} onClick={this.onSubmit} style={{marginTop:'10px'}}>TWEETIT</Button>
              </Form.Group>
            </Form>
            </div>)
    }
}
const mapStateToProps =(state)=>({
    user:state.user,
    currentUser: state.user,
})
const mapDispatchToProps =(dispatch)=>({
    ASYNC_GET:(name)=>dispatch(asyncGet(name))
  })
export default connect(mapStateToProps,mapDispatchToProps)(HomepageComponent)