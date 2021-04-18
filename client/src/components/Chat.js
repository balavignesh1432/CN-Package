import {Divider, List, ListItem, ListItemText, Typography} from '@material-ui/core';
import React,{useEffect, useState} from "react";
import { useSelector } from 'react-redux';

function Chat(){
    const [messages,setMessages]=useState([]);
    const username= useSelector((state)=>state.usernameReducer);
    const chat = useSelector(state=>state.messageReducer);
    
    useEffect(()=>{
        setMessages(chat);
    },[chat]);
    
    return (
        <List style={{width:"100%"}}>
       {messages.length!==0 && messages.map((message,index)=>{
            return (
                <div key={index}>
                <ListItem style={{width:"100%"}}>
                <ListItemText style={{display:"flex",flexDirection:"column"}}>
                    <Typography variant="caption" color="textSecondary">{message.time}</Typography>
                    {message.username===username?<Typography variant="body2" color="secondary">You</Typography>:<Typography variant="body2" color="secondary">{message.username}</Typography>}
                    <Typography variant="body1" style={{wordWrap:"break-word"}}>{message.message}</Typography>
                </ListItemText>
                </ListItem>
                <Divider />
                </div>
            );      
        })} 
        </List>
    );
}

export default Chat;