import { FormControl, InputGroup } from 'react-bootstrap'

import React from 'react'

const InputSingle =({value,onChange,name,textArea=false,type="text"})=>{
    return(<InputGroup className="mb-3">
    <InputGroup.Prepend>
<InputGroup.Text placeholder={name} onChange={(event)=>onChange(event)} type={type} value={value} id="inputGroup-sizing-default">{name}</InputGroup.Text>
    </InputGroup.Prepend>
    {textArea
    ?<FormControl as="textarea" placeholder={name} type={type} aria-label="With textarea" />
    :<FormControl
    type={type}
    placeholder={name}
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
    />}
  </InputGroup>)
}
export default InputSingle