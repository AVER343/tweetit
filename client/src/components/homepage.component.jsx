import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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
    onSubmit=async (event)=>{
        event.preventDefault()
        event.persist()
        const {tweet,caption,fileToUpload}=this.state
        const data = new FormData()
        data.append('username',this.props.username)
          data.append('image', fileToUpload)
          data.append('tweet',tweet.trim())
          data.append('caption',caption.trim())
          await this.setState({disabled:true})
          const posted=await axios.post("/tweet", data,{ headers:{'Authorization':`Bearer ${this.props.token}`,"Content-Type": "multipart/form-data"}})
           if(posted.status==200)
           {
              await this.setState({tweet:'',caption:'',fileToUpload:''})
              await this.setState({disabled:false})
           }
           else{
               console.log("ERROR")
               alert('Something went wrong !')
               await this.setState({disabled:false})
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
            <div style={{verticalAlign:'center',textAlign:'center',marginTop:'10%',fontWeight:'bolder',fontSize:window.innerWidth>600?window.innerWidth/15:window.innerWidth/10}}>TWEETIT</div>
            <Form style={{ marginLeft:'auto',marginRight:'auto', verticalAlign:'center',textAlign:'center',margintop:"10%",fontWeight:'bolder', width:window.innerWidth>600?window.innerWidth/3:"100%"}}>
              <Form.Group controlId="formGroupPassword">
                  <Form.Control value={this.state.tweet}  onChange={this.handleChange}  name="tweet" type="text" placeholder="Tweet" style={{marginTop:'10px',marginLeft:'auto',marginRight:'auto'}} />
                  <Form.Control value={this.state.caption}  onChange={this.handleChange} name="caption" type="text" placeholder="Caption" style={{marginTop:'10px',marginLeft:'auto',marginRight:'auto'}} />
                  <input type='file' onChange={this.fileChangedHandler} />
              <Button disabled={this.state.disabled} onClick={this.onSubmit} style={{marginTop:'10px'}}>TWEETIT</Button>
              </Form.Group>
            </Form>
            </div>)
    }
}
export default HomepageComponent