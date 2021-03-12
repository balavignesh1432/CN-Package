//React
import React,{useState} from 'react';

//Material UI
import { Button, TextField,Paper} from "@material-ui/core";

//Routing
import { useHistory } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/index";

function Register(){

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');

    //Redux
    const dispatch=useDispatch();
    
    //Routing History
    const history=useHistory();
    function handleClick(){
        dispatch(setUser({name,email,username,password}));
        history.push("/");
    }
    return (
        <Paper elevation={10} className="loginPaper">
        <div className="login">
        <TextField label="Name" className="loginInput" value={name} onChange={(event)=>setName(event.target.value)}/>
        <TextField label="Email" className="loginInput" value={email} onChange={(event)=>setEmail(event.target.value)}/>
        <TextField label="Username" className="loginInput" value={username} onChange={(event)=>setUsername(event.target.value)}/>
        <TextField label="Password" className="loginInput" value={password} onChange={(event)=>setPassword(event.target.value)}/>
        <Button variant="contained" color="primary" onClick={handleClick}>Register</Button>
    </div>
    </Paper>
    )
}

export default Register;