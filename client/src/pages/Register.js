//React
import React,{useEffect, useState} from 'react';

//Material UI
import { Button, TextField,Paper,AppBar,Toolbar,Typography} from "@material-ui/core";

//Routing
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getUser, putUser } from "../redux/actions/index";

function Register(){

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');

    //Routing History
    const history=useHistory();

    //Redux
    const dispatch=useDispatch();
    
    const users=useSelector((state)=>state.userReducer);
    
    useEffect(()=>{
        dispatch(getUser());
    },[dispatch]);

    function handleClick(){
        let flag=0
        for(let i=0;i<users.length;i++){
            if(users[i].username===username){
                flag=1;
                break;
            }
        }
        if(flag===0){
            dispatch(putUser({name,email,username,password}));
            alert("Registration Successful!");
            history.push("/");
        }else{
            alert("Username already exists");
        }
        
    }

    return (
        <>
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/login" style={{textDecoration:"none"}}><Button> Login </Button></Link>
          <Link to="/" style={{textDecoration:"none"}}><Button> Home </Button></Link>
        </Toolbar>
        </AppBar>
        <Paper elevation={10} className="loginPaper" style={{height:"400px"}}>
        <div className="login" style={{height:"400px"}}>
        <Typography variant="h4">Enter Details</Typography>
        <TextField label="Name" className="loginInput" value={name} onChange={(event)=>setName(event.target.value.trim())}/>
        <TextField label="Email" className="loginInput" value={email} onChange={(event)=>setEmail(event.target.value.trim())}/>
        <TextField label="Username" className="loginInput" value={username} onChange={(event)=>setUsername(event.target.value.trim())}/>
        <TextField label="Password" className="loginInput" value={password} onChange={(event)=>setPassword(event.target.value.trim())}/>
        <Button variant="contained" color="primary" onClick={handleClick} style={{width:"400px"}}>Register</Button>
    </div>
    </Paper>
    </>
    )
}

export default Register;