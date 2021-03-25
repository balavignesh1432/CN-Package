//React
import React,{useEffect, useState} from 'react';

//Material UI
import { Button, TextField,Paper, Typography,AppBar,Toolbar} from "@material-ui/core";
import { useDispatch,useSelector } from 'react-redux';

//Redux
import { getroomUser,setroomUser } from "../redux/actions/index";
 
//Routing
import { useHistory } from 'react-router';

function Create(){
    
const [room,setRoom]=useState('');

const history= useHistory();

const dispatch= useDispatch();

const isLogged = useSelector(state=>state.loggedReducer);
const roomUsers = useSelector((state)=>state.roomUserReducer);
const username = useSelector((state)=>state.usernameReducer);

useEffect(()=>{
    dispatch(getroomUser());
},[dispatch]);

useEffect(()=>{
    if(!isLogged){
        history.push("/login");        
    }
},[isLogged,history]);

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
        history.push("/board/"+room+'/'+username);
    }else{
        alert("Room already Exists");
    }
}

return (
    <>
    <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Button variant="text" style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/join")}> Join </Button>
          <Button variant="text" style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/")}> Logout </Button>
        </Toolbar>
    </AppBar>
    <Paper elevation={10} className="loginPaper" style={{background:"#F0F0F0"}}>
        <div className="login">
            <Typography variant="h3">Create Room</Typography>
            <TextField label="Room" className="loginInput" value={room} onChange={(event)=>setRoom(event.target.value.trim())}/>
            <Button variant="contained" color="primary" onClick={handleClick} style={{width:"400px"}}>Create</Button>
        </div>
    </Paper>
    </>
);
}

export default Create;