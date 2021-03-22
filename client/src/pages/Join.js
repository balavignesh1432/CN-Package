//React
import React,{useState,useEffect} from 'react';

//Material UI
import { Button, TextField,Paper,Typography} from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getroomUser,setwaitUser } from "../redux/actions/index";

function Create(){
const [room,setRoom]=useState('');
const [username,setUsername]=useState('');

const dispatch= useDispatch();

useEffect(()=>{
    dispatch(getroomUser());
},[dispatch]);

const history= useHistory();
const roomUsers= useSelector(state=>state.roomUserReducer);
function handleClick(){
    // dispatch()
    let flag=0;
    for(let i=0;i<roomUsers.length;i++){
        if(roomUsers[i].room===room && roomUsers[i].users.includes(username)){
            dispatch({type:"SET_ROOM",payload:room});
            dispatch({type:"SET_USERNAME",payload:username});
            history.push("/board/"+room+'/'+username);
            flag=2;
        }
        else if(roomUsers[i].room===room){
            flag=1;
            break;
        }
    }
    if(flag===1){
        dispatch(setwaitUser({room,username}));
        history.push('/wait/'+room+'/'+username);
    }
    if(flag===0){
        alert("No such Room Exists");
    }
}

return (
    <Paper elevation={10} className="loginPaper">
        <div className="login">
            <Typography variant="h3">Join Room</Typography>
            <TextField label="Username" className="loginInput" value={username} onChange={(event)=>setUsername(event.target.value)}/>
            <TextField label="Room" className="loginInput" value={room} onChange={(event)=>setRoom(event.target.value)}/>
            <Button variant="contained" color="primary" onClick={handleClick}>Join</Button>
        </div>
    </Paper>
);
}

export default Create;