import React from 'react'
import { useState,useEffect } from 'react'
import history from "../history"
import {auth,db} from "../fire"
import {
    Link
} from "react-router-dom";


export default function Login(props) {

 

  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");

 
     let handlelogin=(e)=>
      {
        
         auth.signInWithEmailAndPassword(email, password)     //Authenticating user
        .then(async(result) => {
        
            setTimeout(()=>{
              history.push("/Main/Home");
             },2000);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);  
            setpassword("");
              setemail("");
              history.push("/login");
        });
       e.preventDefault();
      }
      useEffect(() => {
        setpassword("");
          setemail("");
      }, []) 
  
    return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-1/2 pb-10 bg-blue-200 rounded-md">
    <div>
      <h2 className="mt-6 text-center text-3xl  text-gray-900">
        Log in to your account
      </h2>
    </div>
    <div className="w-4/5 ml-16">
    <form className="mt-8 space-y-6" onSubmit={handlelogin}>
        <div>
          <label htmlFor="email-address" className="mr-12 ml-12">Email address</label>
          <input id="email-address" value={email} onChange={(e)=>{setemail(e.target.value)}} name="email" type="email"  required className="w-3/5" placeholder="Email address"/>
        </div>
        <div>
          <label htmlFor="password" className="mr-20 ml-12">Password</label>
          <input id="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} name="password" type="password"  required className="w-3/5" placeholder="Password"/>
        </div>

       <div className="w-1/2 mx-auto">
       <input type="submit" value="Log in" to="/Main/Home" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"/>
        <p>Haven't Signup yet?<span><Link path="/signup" className="text-blue-900">Signup</Link></span></p>
       </div>
    </form>
  
    </div>
  </div>
</div>
    )
}
