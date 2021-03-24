import React,{useEffect} from "react";
import { AppBar,Toolbar,Button,Typography } from "@material-ui/core";
import {useSelector} from 'react-redux';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Success(){

    const history= useHistory();

    const isLogged = useSelector(state=>state.loggedReducer);

    useEffect(()=>{
        if(!isLogged){
            history.push("/login");        
        }
    },[isLogged,history]);
    
    return (
        <>
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/create" style={{textDecoration:"none"}}><Button> Create </Button></Link>
          <Link to="/join" style={{textDecoration:"none"}}><Button> Join </Button></Link>
          <Link to="/" style={{textDecoration:"none"}}><Button> Logout </Button></Link>
        </Toolbar>
        </AppBar>
        <h1>Create Or Join Room!</h1>
        </>
    );
}

export default Success;