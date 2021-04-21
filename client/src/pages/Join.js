//React
import React,{useState,useEffect} from 'react';

//Material UI
import { Button, TextField,Paper,Typography,AppBar,Toolbar,useTheme,useMediaQuery,IconButton,Menu,MenuItem,Divider} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import useStyle from '../styles/EntryStyles';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getroomUser,setwaitUser } from "../redux/actions/index";

//Routing
import { useHistory } from 'react-router';

function Create(){

    const classes= useStyle();
    const theme=useTheme();
    const isMobile=useMediaQuery(theme.breakpoints.down("sm"));
    const [anchorEl,setAnchorEl] = useState(null);


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
    <AppBar position="static">
        <Toolbar>
            <div className={classes.appbar}>
                <Typography className={classes.brand} variant={!isMobile?"h4":"h6"}>Project Board Manager</Typography>
            </div> 
            {!isMobile?<div>         
            <Button  style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/create")}> Create </Button>
            <Button  style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/")}> Logout </Button>
            </div>:<IconButton onClick={(event)=>setAnchorEl(event.currentTarget)} style={{color:"white"}}><MenuIcon /></IconButton>}  
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)}>
              <MenuItem style={{width:"175px"}} onClick={()=>history.push("/create")}>
                  <Typography variant='h6' style={{margin:"auto"}}>Create</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={()=>history.push("/")}>
                <Typography variant='h6' style={{margin:"auto"}}>Logout</Typography>
              </MenuItem>
            </Menu>
        </Toolbar>
    </AppBar>
    <Paper elevation={10} className={classes.paper}>
        <div className={classes.card}>
            <Typography variant={!isMobile?"h3":"h4"}>Join Room</Typography>
            <TextField label="Room" style={{width:"90%"}} value={room} onChange={(event)=>setRoom(event.target.value.trim())}/>
            <Button variant="contained" color="primary" onClick={handleClick} className={classes.button}>Join</Button>
        </div>
    </Paper>
    </>
);
}

export default Create;