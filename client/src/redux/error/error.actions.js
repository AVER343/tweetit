import ACTION_TYPES from "./errors.action.types";

export const ERROR_ADDING=(errors)=>({
type:ACTION_TYPES.ADD_ERRORS,
payload:errors
})
export const ERROR_DELETING=()=>({
type:ACTION_TYPES.DELETE_ERRORS
})