//React
import React,{useEffect, useState} from 'react';

//Material UI
import { Button, TextField,Paper,AppBar,Toolbar,Typography} from "@material-ui/core";

//Routing
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../redux/actions';

function Login(){

    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    
    //Routing History
    const history=useHistory();

    //Redux
    const dispatch = useDispatch();
    const users = useSelector((state)=>state.userReducer);

    useEffect(()=>{
        dispatch(getUser());
    },[dispatch]);
    
    function handleClick(){
        let flag=0;
        for(let i=0;i<users.length;i++){
            if(users[i].username===username && users[i].password===password){
                flag=1;
                break
            }
        }
        if(flag===1){
            dispatch({type:"SET_USERNAME",payload:username});
            dispatch({type:"SET_LOG"});
            history.push("/success");
        }else{
            alert("Invalid Username or password");
        }
    }

    return (
        <>
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/register" style={{textDecoration:"none"}}><Button> Register </Button></Link>
          <Link to="/" style={{textDecoration:"none"}}><Button> Home </Button></Link>
        </Toolbar>
        </AppBar>
        <Paper elevation={10} className="loginPaper">
            <div className="login">
                <Typography variant="h3">Enter Login</Typography>
                <TextField label="Username" className="loginInput" value={username} onChange={(event)=>setUsername(event.target.value)}/>
                <TextField label="Password" className="loginInput" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                <Button variant="contained" color="primary" onClick={handleClick}>Login</Button>
            </div>
        </Paper>
        </>
    );
}

export default Login;