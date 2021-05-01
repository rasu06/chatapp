import React from 'react'
import PropTypes from 'prop-types'
import '../App.css'
import history from "../history"
import {
    Link
} from "react-router-dom";
import {auth} from "../fire"

export default function Headermain(props) {

    let handlelogout=()=>{
        auth.signOut().then(() => {
                               /// when user is logged off we will remove its detail from local storage
            alert("Do you want to logout");
            history.push("/");
          }).catch((error) => {
            // An error happened.
          });
    }

    return (
        <nav className="bg-gray-400">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <img src="https://img.icons8.com/doodle/45/000000/weixing.png"/>
                <Link to="/Main/Home" style={{fontSize:"25px"}}>{props.title}</Link>
              <div className="hidden sm:block sm:ml-6 content-center">
                <Link to="/Main/Home" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3 ">Home</Link>
                <Link to="/Main/About" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3 ">About</Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">             
              <Link to="/" onClick={handlelogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3">Log out</Link> 
              </div>
            </div>
          </div>
        </div>
      
      </nav>
    )
}

