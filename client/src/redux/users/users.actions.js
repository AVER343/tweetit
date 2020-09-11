import ACTION_TYPES from "./user.actions.types";
import axios from "axios";
import {ERROR_ADDING,ERROR_DELETING} from '../error/error.actions'
import { getJWT } from "./users.utils";
export const Login =()=>({
    type:ACTION_TYPES.LOGIN
})
export const LoginSuccess=(user)=>({
    type:ACTION_TYPES.LOGIN_SUCCESS,
    payload:user
})
export const LoginFailure=()=>({
    type:ACTION_TYPES.LOGIN_FAILURE
})
export const Logout =()=>({
    type:ACTION_TYPES.LOGOUT
})
export const asyncLogIn = (user) => {
    return async (dispatch) => {
        const{email,password}=user
    try{
        const res=await axios.post('/login', {email,password})
        if(res.status===200)
        {        
           await dispatch(ERROR_DELETING())
           await dispatch(LoginSuccess(res.data))
        }
        else{
            
            dispatch(LoginFailure());
        }
    }
    catch(e)
    {
        dispatch(ERROR_ADDING(e.response.data))
        dispatch(LoginFailure())
    }
    };
  };
  export const asyncLogOut = () => {
    return async (dispatch) => {
        dispatch(Logout());
    try{        
        const res =await axios({method: 'post', url: '/logout',headers:{'Authorization':`Bearer ${getJWT()}`}});
        if(res.status===200)
        {            
            dispatch(Logout())
        }
        else{
            dispatch(Logout());
        }
    }
    catch(e)
    {
        console.log(JSON.stringify(e))
        // dispatch(ERROR_ADDING(e.response.data))
    }
    };
  };
  export const asyncSignUp= (user) => {
    return async (dispatch) => 
    {
        try{
            const res=await axios.post('/signup', {...user})
            if(res.status===200)
            {         
                await dispatch(ERROR_DELETING())
                await dispatch(LoginSuccess(res.data))
            }
            else{     
                console.log(res.data)
                dispatch(Logout());
            }
        }
        catch(e)
        {
            dispatch(ERROR_ADDING(e.response.data))
            console.error(e.response.data)
        }
    };
  };