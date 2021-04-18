//React
import React,{useEffect, useState} from 'react';

import useStyle from '../styles/EntryStyles';
//Material UI
import { Button, TextField,Paper,AppBar,Toolbar,Typography,useTheme,useMediaQuery,IconButton,Menu,MenuItem,Divider} from "@material-ui/core";

//Routing
import { useHistory } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getUser, putUser } from "../redux/actions/index";
import  MenuIcon from '@material-ui/icons/Menu';

function Register(){

    const classes= useStyle();
    const theme=useTheme();
    const isMobile=useMediaQuery(theme.breakpoints.down("sm"));
    const [anchorEl,setAnchorEl] = useState(null);

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
          <Typography variant={!isMobile?"h4":"h6"} className="brandName">Project Board Manager</Typography>
          {!isMobile?<div>
          <Button onClick={()=>history.push("/login")}  style={{color:"whitesmoke"}} size="large"> Login </Button>
          <Button onClick={()=>history.push("/")}  style={{color:"whitesmoke"}} size="large"> Home </Button>
          </div>:<IconButton onClick={(event)=>setAnchorEl(event.currentTarget)}><MenuIcon /></IconButton>}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)}>
              <MenuItem style={{width:"150px"}} onClick={()=>history.push("/login")}>
                  <Typography variant='h6' style={{margin:"auto"}}>Login</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={()=>history.push("/")}>
              <Typography variant='h6' style={{margin:"auto"}}>Home</Typography>
              </MenuItem>
          </Menu>
        </Toolbar>
        </AppBar>
        <Paper elevation={10} className={classes.paper}>
            <div className={classes.card} style={{height:"400px"}}>
            <Typography variant={!isMobile?"h3":"h4"}>Enter Details</Typography>
            <TextField label="Name" style={{width:"90%"}} value={name} onChange={(event)=>setName(event.target.value.trim())}/>
            <TextField label="Email" style={{width:"90%"}} value={email} onChange={(event)=>setEmail(event.target.value.trim())}/>
            <TextField label="Username" style={{width:"90%"}} value={username} onChange={(event)=>setUsername(event.target.value.trim())}/>
            <TextField label="Password" style={{width:"90%"}} value={password} onChange={(event)=>setPassword(event.target.value.trim())}/>
            <Button variant="contained" color="primary" onClick={handleClick} className={classes.button}>Register</Button>
            </div>
        </Paper>
    </>
    )
}

export default Register;