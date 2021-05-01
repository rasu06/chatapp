import React,{useEffect,useState} from 'react'
import "./SidebarChat.css"
import {Avatar} from '@material-ui/core';
import history from "../../history"


export default function SidebarChat({id,name}) {

    const [seed, setseed] = useState('');
   

    useEffect(()=>{
         setseed(Math.floor(Math.random()*10000));
    },[]);
    const clickUser=(e)=>{
        e.preventDefault();
        history.push(`/Main/Home/${id}`)
    }

    return (
        <div className="sidebarChat" onClick={clickUser}>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <span class="dot"></span>
            <div className="sidebarChat_info">
                <h2>{name}</h2>
                <p>last message</p>
            </div>
            
        </div>
    )
}
