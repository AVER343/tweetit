import ACTION_TYPES from "./success.action.types";

export const ERROR_ADDING=(errors)=>({
type:ACTION_TYPES.ADD_SUCCESS,
payload:errors
})
export const ERROR_DELETING=()=>({
type:ACTION_TYPES.DELETE_SUCCESS
})