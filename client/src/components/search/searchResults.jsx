import axios from 'axios'
import React from 'react'

import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import Switch from 'react-bootstrap/esm/Switch'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { ERROR_ADDING } from '../../redux/error/error.actions'
import { getJWT } from '../../redux/users/users.utils'
import SearchResultCard from '../cardSearch/card.searchResult'
import SearchResultTable from '../tableSearchResult/table.searchResult'
const SearchResults=(props)=>{
  let [users,setUsers]=useState(null)
  let [tabularForm,setTabular]=useState(true)
  let name = props.location.pathname.split('/')
  name=name[2]
  useEffect(()=>{
                if(props.location.state)
                  {
                    setUsers(props.location.state.users)
                  }
                else{
                    handleSeached(name)
                  }
            },[props.location.pathname.split('/')[2]])
  const handleSeached=async(name)=>{
    const posted=await axios.get(`/username/${name}`,{ headers:{'Authorization':`Bearer ${getJWT()}`,"Content-Type": "multipart/form-data"}})
    if(posted.status==200)
    {
      if(posted.data.users.length>0)
      {
        setUsers(posted.data.users)
      }
      else{
        props.ERROR_ADDING({errors:[{error:'No user with related username !'}]})
      }
    }
  } 
    return(users?<div className="container">
       <div className="custom-control custom-switch" style={{marginLeft:'auto'}}>
      <input type="checkbox" value={tabularForm} onChange={()=>setTabular(!tabularForm)} className="custom-control-input" id="customSwitch1"/>
<label className="custom-control-label" for="customSwitch1">{tabularForm?'Switch to Cards':'Switch to Tabular'}</label>
    </div>
    <div className="row">
        {users.length?tabularForm?<SearchResultTable users={users}/>:<SearchResultCard users={users}/>:null}
     </div></div>:null)
}
const dispatchStateToProps=dispatch=>({
  ERROR_ADDING:(e)=>dispatch(ERROR_ADDING(e))
})
export default connect(null,dispatchStateToProps)(SearchResults)