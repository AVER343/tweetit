import {ERROR_ADDING, ERROR_DELETING} from '../error/error.actions'
import { getJWT, getUser } from "../users/users.utils";

import ACTION_TYPES from "./profile.actions.types";
import axios from "axios";

export const UpdateSuccess=(user)=>({
    type:ACTION_TYPES.UPDATE_SUCCESS,
    payload:user
})
export const UpdateWithImage=()=>({
    type:ACTION_TYPES.ONLY_IMAGE
})
export const UpdateFailure=()=>({
    type:ACTION_TYPES.UPDATE_FAILURE
})
export const asyncUpdate = (data) => {
    return async (dispatch) => {
    try{
        const res =await axios({method: 'post', url: `https://tweetit-react.herokuapp.com/profile`,headers:{'Authorization':`Bearer ${getJWT()}`},data});
        if(res.status===200)
        {        
           await dispatch(ERROR_DELETING())
           await dispatch(UpdateSuccess(res.data.user))
           await dispatch(UpdateSuccess({isMe:res.data.isMe}))
          let image =  btoa(String.fromCharCode(...new Uint8Array(res.data.image.data)))
           await dispatch(UpdateSuccess({image}))
           await dispatch(UpdateSuccess({temporaryImage:''}))
        }
        else{
           console.log('error')
        }
    }
    catch(e)
        {
            console.log(JSON.stringify(e))
                // dispatch(ERROR_ADDING(e.message))
        }
    };
  };
export const asyncGet = (name) => {
    return async (dispatch) => {
    try{
        let res
       if(name==getUser().username)
            {
                 res =await axios({method: 'get', url: `https://tweetit-react.herokuapp.com/profile`,headers:{'Authorization':`Bearer ${getJWT()}`}});
                 
                }
            else{
                await dispatch(UpdateWithImage())
                res =await axios({method: 'get', url: `https://tweetit-react.herokuapp.com/profile/${name}`,headers:{'Authorization':`Bearer ${getJWT()}`}});
              }
        if(res.status===200)
        {        
           await dispatch(ERROR_DELETING())
           await dispatch(UpdateSuccess(res.data.user))
           await dispatch(UpdateSuccess({isMe:res.data.isMe}))
          if((res.data.image && name==getUser().username)){
          let image =  btoa(String.fromCharCode(...new Uint8Array(res.data.image.data)))
           await dispatch(UpdateSuccess({image}))
           await dispatch(UpdateSuccess({temporaryImage:''}))
          }
          else if(res.data.image){
            let image =  btoa(String.fromCharCode(...new Uint8Array(res.data.image.data)))
            await dispatch(UpdateSuccess({temporaryImage:image}))
          }
         else if((!res.data.image && name==getUser().username)){
            await dispatch(UpdateSuccess({image:''}))
            await dispatch(UpdateSuccess({temporaryImage:''}))
          }
        //    await dispatch(LoginSuccess(res.data))
        }
        else{
        }
    }
    catch(e)
    {
           if(e.response)
           {
            dispatch(ERROR_ADDING(e.response.data))
           }
           else{
            dispatch(ERROR_ADDING({errors:[{error:'something went wrong!'}]}))
           }
    }
    };
  };
export const GET_IMAGE = () => {
    return async (dispatch) => {
    try{
        let res
        res =await axios({method: 'get', url: `https://tweetit-react.herokuapp.com/profile/`,headers:{'Authorization':`Bearer ${getJWT()}`}});
        if(res.status===200)
        {    
          if(res.data.image){
          let image =  btoa(String.fromCharCode(...new Uint8Array(res.data.image.data)))
           await dispatch(UpdateSuccess({image}))
          }
        //    await dispatch(LoginSuccess(res.data))
        }
        else{
        }
    }
    catch(e)
    {
           if(e.response)
           {
            dispatch(ERROR_ADDING(e.response.data))
           }
           else{
            dispatch(ERROR_ADDING({errors:[{error:'something went wrong!'}]}))
           }
    }
    };
  };