//React
import React,{useEffect, useState} from 'react';

//Material UI
import { Button, TextField,Paper,AppBar,Toolbar,Typography,useTheme,useMediaQuery,IconButton,Menu,MenuItem, Divider} from "@material-ui/core";
import  MenuIcon  from '@material-ui/icons/Menu';

//Routing
import { useHistory } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../redux/actions';
import useStyle from '../styles/EntryStyles';

function Login(){

    const classes= useStyle();
    const theme=useTheme();
    const isMobile=useMediaQuery(theme.breakpoints.down("sm"));
    const [anchorEl,setAnchorEl] = useState(null);

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
        <div className={classes.appbar}>
            <Typography className={classes.brand} variant={!isMobile?"h4":"h6"}>Project Board Manager</Typography>
        </div>
          {!isMobile?<div>
          <Button  style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/register")}> Register </Button>
          <Button  style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/")}> Home </Button>
          </div>:<IconButton onClick={(event)=>setAnchorEl(event.currentTarget)} style={{color:"white"}}><MenuIcon /></IconButton>}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)}>
              <MenuItem style={{width:"175px"}} onClick={()=>history.push("/register")}>
                  <Typography variant='h6' style={{margin:"auto"}}>Register</Typography>
              </MenuItem>
              <Divider />
              <MenuItem  onClick={()=>history.push("/")}>
              <Typography variant='h6' style={{margin:"auto"}}>Home</Typography>
              </MenuItem>
          </Menu>
        </Toolbar>
        </AppBar>
        <Paper elevation={10} className={classes.paper}>
            <div className={classes.card}>
                <Typography variant={!isMobile?"h3":"h4"}>Enter Login</Typography>
                <TextField label="Username" style={{width:"90%"}} value={username} onChange={(event)=>setUsername(event.target.value.trim())}/>
                <TextField label="Password" style={{width:"90%"}} value={password} onChange={(event)=>setPassword(event.target.value.trim())}/>
                <Button variant="contained" color="primary" onClick={handleClick} className={classes.button}>Login</Button>
            </div>
        </Paper>
        </>
    );
}

export default Login;