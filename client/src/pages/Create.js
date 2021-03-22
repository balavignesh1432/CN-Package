//React
import React,{useEffect, useState} from 'react';

//Material UI
import { Button, TextField,Paper, Typography} from "@material-ui/core";
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { getroomUser,setroomUser } from "../redux/actions/index";
 
function Create(){
    
const [room,setRoom]=useState('');
const [username,setUsername]=useState('');
const dispatch= useDispatch();
useEffect(()=>{
    dispatch(getroomUser());
},[dispatch]);

const history= useHistory();
const roomUsers = useSelector((state)=>state.roomUserReducer);
function handleClick(){
    console.log(roomUsers);
    let flag=0;
    for(let i=0;i<roomUsers.length;i++){
        if(roomUsers[i].room===room){
            flag=1;
            break;
        }
    }
    if(flag===0){
        dispatch(setroomUser({room,username}));
        dispatch({type:"SET_ROOM",payload:room});
        dispatch({type:"SET_USERNAME",payload:username});
        history.push('/board/'+room);
    }else{
        alert("Room already Exists");
    }
}

return (
    <Paper elevation={10} className="loginPaper">
        <div className="login">
            <Typography variant="h3">Create Room</Typography>
            <TextField label="Username" className="loginInput" value={username} onChange={(event)=>setUsername(event.target.value)}/>
            <TextField label="Room" className="loginInput" value={room} onChange={(event)=>setRoom(event.target.value)}/>
            <Button variant="contained" color="primary" onClick={handleClick}>Create</Button>
        </div>
    </Paper>
);
}

export default Create;