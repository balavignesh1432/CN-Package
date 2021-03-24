import React, { useEffect } from "react";

//Material UI
import { AppBar,Toolbar,Typography,Button } from "@material-ui/core";

//Redux
import { useSelector,useDispatch } from "react-redux";
import { getroomUser } from "../redux/actions/index";

//Routing
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";

function Wait(){
    
    const {room}=useParams();
    const {username}=useParams();
    
    const history=useHistory();
    
    const dispatch= useDispatch();
    
    const isLogged = useSelector(state=>state.loggedReducer);
    const roomUsers= useSelector(state=>state.roomUserReducer);

    
    useEffect(()=>{
        if(!isLogged){
            history.push("/login");        
        }
    },[isLogged,history]);

    useEffect(()=>{
        dispatch(getroomUser());
    },[dispatch]);

    useEffect(()=>{
        for(let i=0;i<roomUsers.length;i++){
            if(roomUsers[i].room===room && roomUsers[i].users.includes(username)){
                dispatch({type:"SET_ROOM",payload:room});
                dispatch({type:"SET_USERNAME",payload:username});
                history.push("/board/"+room+'/'+username);
            }
        }
    },[dispatch,roomUsers,room,username,history]);

    return (
        <>
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/" style={{textDecoration:"none"}}><Button> Logout </Button></Link>
        </Toolbar>
        </AppBar>
        <h1>Waiting For Acceptance!</h1>
        </>
    )
}

export default Wait;