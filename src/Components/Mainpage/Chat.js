import React,{useEffect,useState,useCallback, useMemo } from 'react'
import {Avatar} from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import "./Chat.css"
import firebase from "firebase";
import {auth,provider,db,firebaseApp} from "../../fire"
import { useDropzone } from 'react-dropzone';
import {
    Link
} from "react-router-dom";

export default function Chat({user_id}) {
    const [seed, setseed] = useState('');
    const [input, setinput] = useState('');
    const [username, setusername] = useState('')
    const [current_user_id, setcurrent_user_id] = useState('')
    const [messages,setMessages]=useState([]);
   
    const [fileURL, setfileURL] = useState('');

             
    /*useEffect(()=>{
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
    },[])
*/

   const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles[0]);
     
        const storageRef=firebaseApp.storage().ref();
       const fileRef=storageRef.child(acceptedFiles[0].name);
         fileRef.put(acceptedFiles[0]);
         //console.log(fileRef.getDownloadURL());
          alert("file uploaded");
            /* fileRef.getDownloadURL()
            .then((data)=>{
                 setfileURL(data);
            })
            console.log(fileURL);*/
         
           /* db.collection("users").doc(user_id).collection("messages").add(
            {
                message:'',     
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                send_id:current_user_id ,
                fileURL:fileURL
            }
           )
           db.collection("users").doc(current_user_id).collection("messages").add(
            {
                message:'',           
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                send_id:current_user_id,
                fileURL:fileURL
            })*/
       
    
      }, []);
    
      const {
        getRootProps,
        getInputProps
      } = useDropzone({
        onDrop
      });


    useEffect(()=>{
        setseed(Math.floor(Math.random()*10000));

        db.collection("users").where("user_uid", "==", auth.currentUser.uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setcurrent_user_id(doc.id);
            });
        })
        .catch((error) => {
           alert("Error getting documents: ", error);
        }); 

        db.collection("users").doc(user_id).get()
        .then(snapshot => setusername(snapshot.data().name));  

         db.collection("users").doc(user_id).collection("messages").orderBy("timestamp","asc").onSnapshot((snapshot)=>
         
            setMessages(snapshot.docs.map((doc)=>
                { 
                  return (doc.data());
                 }))
         )
    },[user_id])

    const sendMessage=(e)=>{
       e.preventDefault();
       ;
       
      db.collection("users").doc(user_id).collection("messages").add(
           {
               message:input,
              
               timestamp:firebase.firestore.FieldValue.serverTimestamp(),
               send_id:current_user_id ,
              
           }
       )
     
    
       db.collection("users").doc(current_user_id).collection("messages").add(
        {
            message:input,
           
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            send_id:current_user_id,
            
        }
    )
       setinput("");
    }
    const sendFile=(e)=>{
        e.preventDefault();
    }
        
    return (
        <div className="chat">
          <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

               <div className="chat_headerInfo">
                  <h3>{username}</h3>
               </div>
               <div className="chat_headerRight">
 
               </div>
          </div>
          <div className="chat_body" {...getRootProps({ onClick: e => e.stopPropagation() })}>
               <input {...getInputProps()} />
                       <div >
                        {messages.map(message=>{
                      if(message.send_id===current_user_id)
                         {return(<p className="chat_currentuser">{message.message}</p>)}
                      else{
                         return(<p className="chat_frienduser">{message.message}</p>)
                          } 
                                       
                        })}
              
            
                    </div>        
           </div>
          <div className="chat_footer">
            <form className="form">    
               <input className="form_input" type="text" placeholder="Type your message" value={input} onChange={(e)=>{setinput(e.target.value)}}/>
               <button type="submit" className="form_button bg-blue-500" onClick={sendMessage}>Send</button>
           </form>
          </div>                  
        </div>
    )
}

