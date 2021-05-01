import React from 'react'
import '../App.css'
import history from "../history"
import {
    Link
} from "react-router-dom";
export default function Header2(props) {
    return (
        <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <img src="https://img.icons8.com/doodle/45/000000/weixing.png"/>
                <span to="/Home" style={{fontSize:"25px"}}>{props.title}</span>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
               
              <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3">Log In</Link>
  
              </div>
            </div>
          </div>
        </div>
      
      </nav>
    )
}
