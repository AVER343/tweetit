import React, { useState } from 'react'

import { Button } from 'react-bootstrap'
import SingleProfileComponent from './update.profile'
import { asyncUpdate } from '../../redux/profile/profile.actions'
import { connect } from 'react-redux'
import { useEffect } from 'react'

const ProfileComponents=(props)=>{
    const [newPrivate,setPrivate]=useState(props.privateState)
    const [fullname,setFullname]=useState(props.fullname)
    const [address,setAddress]=useState(props.address)
    const [mobile,setMobile]=useState(props.mobile)
    const [age,setAge]=useState(props.age)
    const onsubmit=async()=>{
     const posted = await props.UPDATE_DATA({fullname,address,mobile,age}) 
    }
    const changeStatus=async()=>{
         await props.UPDATE_DATA({private:!newPrivate});
         await setPrivate(!newPrivate)
    }
    useEffect(()=>{},[props.private,props.privateState])

    return(<div>   
        <form> 
            <SingleProfileComponent name={'Fullname'} value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
            <SingleProfileComponent name={'Age'} value={age} onChange={(e)=>setAge(e.target.value)}/>
            <SingleProfileComponent name={'Mobile'} value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
            <SingleProfileComponent name={'Address'} value={address} onChange={(e)=>setAddress(e.target.value)}/>
            <div className="custom-control custom-switch" style={{marginLeft:'auto'}}>
                <button type="button" onClick={onsubmit} class="btn btn-outline-success">Update</button>
                <button style={{marginLeft:'15px'}} type="button" onClick={changeStatus} class={`btn btn-outline-${newPrivate?`danger`:`success`}`}>{newPrivate?'Make account Public':`Make account Private`}</button>
            </div>
        </form>
    </div>)
}
const mapStateToProps=(state)=>({
    privateState:state.profile.private
})
const mapDispatchToProps=(dispatch)=>({
    UPDATE_DATA:(data)=>dispatch(asyncUpdate(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(ProfileComponents)