import React from 'react';
import './App.css';
import {
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import Header from './components/header/header.component'
import HomepageComponent from './components/homepage.component';
import TopTags from './components/topTags/toptags';
import SignInAndSignOut from './components/signinAndsignout/forms';
import YourTweet from './components/yourTweets/yourTweets';
class App extends React.Component {
  constructor(){
    super()
    this.state={
      username:'',
      email:'',
      token:''
    }
  }
async  componentDidMount(){
  this.setState(JSON.parse(window.localStorage.getItem('state')))
  }
  handleSignOut=async()=>{
   await this.setState({username:'',email:'',token:''})
   window.localStorage.clear()
  }
  handleChange=async({data})=>{
 
    const {token,user}=data
    const {username,email}=user
    await this.setState({username,token,email})
    window.localStorage.setItem('state','')
    window.localStorage.setItem('state',JSON.stringify(this.state))
    }
  render(){
    return(<div>
      <Header {...this.state} handleSignOut={this.handleSignOut}/>
      <div className="container">
        <Switch>
          <Route path="/" exact render={()=>this.state.username
            ?<HomepageComponent {...this.state}/>
            :<div style={{verticalAlign:'center',textAlign:'center',marginTop:'10%',fontWeight:'bolder',fontSize:window.innerWidth>600
                  ?window.innerWidth/15
                  :window.innerWidth/10}}>
                    TWEETIT
                    <div style={{verticalAlign:'center',textAlign:'center',marginTop:'2%',fontWeight:'bolder',fontSize:window.innerWidth>600
                    ?window.innerWidth/50
                    :window.innerWidth/30}}><Link to="/login">SIGN UP/ SIGN IN</Link> TO CONTINUE !</div>
              </div>
          }/>
          <Route path="/:username/all" render={()=>this.state.username?<YourTweet {...this.state}/>:<Redirect from='/:username/all' to="/login"/>} />
          <Route path="/toptags" component={TopTags}/>
          <Route  path="/login" render={()=>this.state.username?<Redirect to="/"/>:<SignInAndSignOut {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>}/>
        </Switch>
      </div>
    </div>);
  }
}

export default App;
