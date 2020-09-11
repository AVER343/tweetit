import ACTION_TYPES from './errors.action.types'

const INTIAL_STATE={
    errors:[]
}
const Error_Reducer = (state=INTIAL_STATE,action)=>{
    switch(action.type){
        case(ACTION_TYPES.ADD_ERRORS):
            console.log(action.payload)
            return ({...action.payload})
        case(ACTION_TYPES.DELETE_ERRORS):
            return (null)
        default:
            return state
    }
}
export default Error_Reducer