import React,{createContext,useContext,useReducer} from 'react'
import { useState,useEffect} from 'react'
import {auth,provider,db} from "../fire"
import firebase from "firebase"
import history from "../history"
import {
    Link
} from "react-router-dom";

export default function Signup(props) {

 

  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [name, setname] = useState("");
   
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


  const googleSignin=(e)=>{
  auth.signInWithPopup(provider)
    .then((result) => {
     /* dispatch({
        type:actionTypes.SET_USER,
        user:result.user,
      })*/
      db.collection("users").add({
        name:result.additionalUserInfo.profile.name,
        user_uid:auth.currentUser.uid
      });
      console.log("give me login user id", auth.currentUser.uid);
        history.push("/Main/Home");
      // This gives you a Google Access Token. You can use it to access the Google API.
     // var token = credential.accessToken;
      // The signed-in user info.
      //
      //var user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
   }
 

     
       let handlesignup=(e)=>
      {
        try
       {
      auth.createUserWithEmailAndPassword(email, password)         // creating user authentication 
        .then( (result) => {
            //console.log("this is result.user",result.user);
            //console.log("this is result.displayName",result.displayName);
         /* dispatch({
            type:actionTypes.SET_USER,
            user:result.user,
          })*/
         console.log("/n/n/n/n/n/n/n/n");
         console.log("look at here");
        // console.log(user);
         console.log("/n/n/n/n/n/n/n/n");
          db.collection("users").add({
            name:name,
            user_uid:auth.currentUser.uid
          });
          console.log("give me login user id", auth.currentUser.uid);
            history.push("/Main/Home");
       })
       .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         alert(errorMessage);
           setname("");
          setpassword("");
            setemail("");
         history.push("/signup");
       });
       e.preventDefault();
      }
      catch(error){
        alert("error in signing up,please signin again");
      }
    }

    
    
      useEffect(() => {
        setpassword("");
          setemail("");
          setname("");
      }, []) 


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-1/2 pb-10 bg-blue-200 rounded-md">
          <div>
            <h2 className="mt-6 text-center text-3xl  text-gray-900">
              Sign up to create your account
            </h2>
          </div>
          <div className="w-4/5 ml-16">
          <form className="mt-8 space-y-6"  onSubmit={handlesignup}>
              <div>
                <label htmlFor="name" className="mr-16 ml-12">Your Name</label>
                <input id="name" value={name} onChange={(e)=>setname(e.target.value)} name="name" type="text"  required className="w-2/5" placeholder="Name"/>
              </div>            
              <div>
                <label htmlFor="email-address" className="mr-12 ml-12">Email address</label>
                <input id="email-address" value={email} onChange={(e)=>setemail(e.target.value)} name="email" type="email"  required className="w-2/5" placeholder="Email address"/>
              </div>
              <div>
                <label htmlFor="password" className="mr-20 ml-12">Password</label>
                <input id="password" value={password} onChange={(e)=>setpassword(e.target.value)} name="password" type="password" required className="w-2/5" placeholder="Password"/>
              </div>
      
             <div className="w-1/2 mx-auto">
              <input type="submit" value="Sign up"  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"/>
              <p>Already have account?<span><Link to="/login" className="text-blue-900">Login</Link></span></p>
             </div>
          </form>
                 <button  onClick={googleSignin} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                   sign in with google
                   </button>
          </div>
        </div>
      </div>
    )
}
