import ACTION_TYPES from "./profile.actions.types"

const INITIAL_STATE=null
const ProfileReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case(ACTION_TYPES.UPDATE_SUCCESS):
            return {...state,...action.payload}
        case(ACTION_TYPES.UPDATE_FAILURE):
            return null
        case(ACTION_TYPES.ONLY_IMAGE):
            return {image:state.image}
        default:
            return state
    }
}
export default ProfileReducer