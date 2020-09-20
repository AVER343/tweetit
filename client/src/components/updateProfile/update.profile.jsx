import React from 'react'
const SingleProfileComponent=(props)=>{
    return(<div class="form-group row">
    <label  class="col-sm-2 col-form-label">{props.name}</label>
    <div class="col-sm-10">
      <input type="text" value={props.value} onChange={props.onChange} class="form-control" id="inputPassword"  placeholder={`Enter ${props.name}`}/>
    </div>
  </div>)
}
export default SingleProfileComponent