import ACTION_TYPES from './success.action.types'

const INTIAL_STATE={
    success:[]
}
const Success_Reducer = (state=INTIAL_STATE,action)=>{
    switch(action.type){
        case(ACTION_TYPES.ADD_SUCCESS):
            return ({...action.payload})
        case(ACTION_TYPES.DELETE_SUCCESS):
            return (null)
        default:
            return state
    }
}
export default Success_Reducer