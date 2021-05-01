import React from 'react'
import fire from "../fire"
import { useState,useEffect } from 'react'
import history from "../history"
import {
    Router as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import Chat from "./Mainpage/Chat"
import "./Mainpage/Mainpage.css"
import Sidebar from "./Mainpage/Sidebar.js"
export default function Mainpage(props) {
       
     const {id}=useParams();
    
    return (
        <div className="app">
            <div className="app_body">  
                <Sidebar/>
                <Chat key={id} user_id={id}/>
            </div>
        </div>
    )
}
