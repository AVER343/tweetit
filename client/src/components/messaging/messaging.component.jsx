import {useEffect, useState} from 'react'

import React from 'react'
import axios from 'axios'
import {getJWT} from '../../redux/users/users.utils'
import {withRouter} from 'react-router-dom'

const Messaging=(props)=>{
    useEffect(() => {
        async function newFunc(){
            const messages= await axios({url:`http://localhost:7000/messages/${props.location.pathname.split('/')[2]}`,method:'GET',headers:{'Authorization':'Bearer '+getJWT()}})
            console.log(messages)
        }
        newFunc()
    })
    const [input,setInput]=useState('')
    return(<div>
        <table class="table table-borderless">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                </tr>
            </tbody>
        </table>
    </div>)
}
export default withRouter(Messaging)
