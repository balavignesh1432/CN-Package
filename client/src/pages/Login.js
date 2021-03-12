//React
import React,{useState} from 'react';

//Material UI
import { Button, TextField,Paper} from "@material-ui/core";

//Routing
import { useHistory } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";

function Home(){

    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [room,setRoom]=useState('');
    
    //Routing History
    const history=useHistory();

    //Redux
    const dispatch = useDispatch();
    
    function handleClick(){
        if(username!=='' && password!=='' && room!==''){
            history.push("/board");
            dispatch({type:"SET_LOG"});
        }
    }

    return (
        <Paper elevation={10} className="loginPaper">
            <div className="login">
                <TextField label="Username" className="loginInput" value={username} onChange={(event)=>setUsername(event.target.value)}/>
                <TextField label="Password" className="loginInput" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                <TextField label="Room" className="loginInput" value={room} onChange={(event)=>setRoom(event.target.value)}/>
                <Button variant="contained" color="primary" onClick={handleClick}>Login</Button>
            </div>
        </Paper>
    );
}

export default Home;