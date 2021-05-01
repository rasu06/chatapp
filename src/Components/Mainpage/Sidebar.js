import React,{useState,useEffect} from 'react'
import "./Sidebar.css"

import {auth,provider,db} from "../../fire"
import SidebarChat from "./SidebarChat.js";
import {Avatar, IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
export default function Sidebar({user_id}) {

console.log("fucckkkkkkk sidebar");

    const [users, setusers] = useState([]);
    const [seed, setseed] = useState('');
    
    const [current_user_id, setcurrent_user_id] = useState('')


        useEffect(() => {
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




            db.collection("users").onSnapshot(snapshot=>{
               setusers(snapshot.docs.map(user=>{
                          return  ({
                            id:user.id,
                            data:user.data()
                        } )
                       }                                                                 
                 ))
                });
                
        }, [])



    return (
     <div className="sidebar">
           <div className="sidebar_header">
                  <IconButton> 
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>   
                  </IconButton>
                  <div className="sidebar_headerRight">
                  <IconButton>  
                        <DonutLargeIcon/>
                  </IconButton>
                  <IconButton> 
                      <ChatIcon/>
                   </IconButton> 
                  <IconButton>  
                      <MoreVertIcon/>
                 </IconButton>    
                  </div>             
            </div>
            
            <div className="sidebar_chats">
               {
                 users.map((user)=>{
                     if(user.id!==current_user_id)
                    {return(
                          <SidebarChat key={user.id} id={user.id} name={user.data.name}/>
                     )}

                 })
               }
             </div>
      </div>
    )
}
