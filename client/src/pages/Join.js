//React
import React,{useState,useEffect} from 'react';

//Material UI
import { Button, TextField,Paper,Typography,AppBar,Toolbar} from "@material-ui/core";

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getroomUser,setwaitUser } from "../redux/actions/index";

//Routing
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";

function Create(){
const [room,setRoom]=useState('');

const history= useHistory();

const dispatch= useDispatch();

const roomUsers= useSelector(state=>state.roomUserReducer);
const isLogged = useSelector(state=>state.loggedReducer);
const username = useSelector(state=>state.usernameReducer);

useEffect(()=>{
    if(!isLogged){
        history.push("/login");        
    }
},[isLogged,history]);

useEffect(()=>{
    dispatch(getroomUser());
},[dispatch]);

function handleClick(){
    let flag=0;
    for(let i=0;i<roomUsers.length;i++){
        if(roomUsers[i].room===room && roomUsers[i].users.includes(username)){
            dispatch({type:"SET_ROOM",payload:room});
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
    <>
    <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/create" style={{textDecoration:"none"}}><Button variant="text" > Create </Button></Link>
          <Link to="/" style={{textDecoration:"none"}}><Button> Logout </Button></Link>
        </Toolbar>
    </AppBar>
    <Paper elevation={10} className="loginPaper">
        <div className="login">
            <Typography variant="h3">Join Room</Typography>
            <TextField label="Room" className="loginInput" value={room} onChange={(event)=>setRoom(event.target.value)}/>
            <Button variant="contained" color="primary" onClick={handleClick}>Join</Button>
        </div>
    </Paper>
    </>
);
}

export default Create;