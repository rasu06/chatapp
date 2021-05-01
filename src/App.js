import React from "react";
import history from "./history"
import {auth} from "./fire";
import { useState,useEffect } from 'react';

import {
  Router as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Login from "./Components/Login"
import Header from "./Components/Header"
import Header1 from "./Components/Header1"
import Header2 from "./Components/Header2"
import Signup from "./Components/Signup"
import Homecont from "./Components/Homecont.js"   
import About from "./Components/About"
import Mainpage from "./Components/Mainpage";
import Headermain from "./Components/Headermain";
import Sidebar from "./Components/Mainpage/Sidebar.js"



function App() {
  
  //let [user, setuser] = useState({});
 
    const [current_user, setcurrent_user] = useState("");
  const onclicklogin=()=>{
    alert("you are logging in");
  }
  const onclicksignup=()=>{
    alert("you are signing in");
  }


  let authlistener=()=>
  {auth.onAuthStateChanged(function(user) {
    if (user!=={}) {
      setcurrent_user(user);
      //console.dir(user);
     
    } else {
      setcurrent_user({});
    }
  });
}
  /* useEffect(()=>{
       const data=localStorage.getItem('my-user');
       if(data){
          dispatch({
          type:actionTypes.SET_USER,
          user:data,
        })
       }
   },[])
   useEffect(()=>{
      localStorage.setItem('my-user',JSON.stringify(user));
   },[])*/
  useEffect(()=>{
    authlistener();
   }, [])
 

  return (
    <Router history={history}>
      {
      current_user?
      <>
            
        <Switch>            
           <Route exact path="/Main/About">
           <Headermain title="Let's Talk"/>
              <About/>
           </Route>   
           <Route exact path="/Main/Home">
              <Headermain title="Let's Talk"/>
              <div className="app">
                  <div className="app_body">  
                     <Sidebar/>
                </div>
             </div>
           </Route>        
           <Route exact path="/Main/Home/:id">
              <Headermain title="Let's Talk"/>
              <Mainpage/>
           </Route>     
        </Switch>           
         
      </>
      :
      <>
                
      <Switch>
          <Route exact path="/">
            <Header title="Let's Talk"/>
              <Homecont />  
          </Route>      
         <Route exact path="/login">
            <Header1 title="Let's Talk"/>
            <Login onclick={onclicklogin}/>
         </Route>
         <Route exact path="/signup">
             <Header2 title="Let's Talk"/>
             <Signup onclick={onclicksignup}/>
         </Route>            
     </Switch>    

      </>      
    }
      
    </Router>
  );
}

export default App;

//chat-app-311312
//npm install -g firebase-tools  ---> firebase hosting
// refer for firebase deployment-->https://console.firebase.google.com/u/0/project/chat-app-311312/overview