//React
import React,{useEffect, useState} from 'react';

//Material UI
import { Button, TextField,Paper, Typography,AppBar,Toolbar,useMediaQuery, IconButton,useTheme,Menu,MenuItem,Divider} from "@material-ui/core";
import { useDispatch,useSelector } from 'react-redux';
import useStyle from '../styles/EntryStyles';

//Redux
import { getroomUser,setroomUser } from "../redux/actions/index";
 
//Routing
import { useHistory } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';

function Create(){

    const classes= useStyle();
    const theme=useTheme();
    const isMobile=useMediaQuery(theme.breakpoints.down("sm"));
    const [anchorEl,setAnchorEl] = useState(null);

    const [room,setRoom]=useState('');

    const history= useHistory();

    const dispatch= useDispatch();

    const isLogged = useSelector(state=>state.loggedReducer);
    const roomUsers = useSelector((state)=>state.roomUserReducer);
    const username = useSelector((state)=>state.usernameReducer);

    useEffect(()=>{
        dispatch(getroomUser());
    },[dispatch]);

    useEffect(()=>{
        if(!isLogged){
            history.push("/login");        
        }
    },[isLogged,history]);

    function handleClick(){
        console.log(roomUsers);
        let flag=0;
        for(let i=0;i<roomUsers.length;i++){
            if(roomUsers[i].room===room){
                flag=1;
                break;
            }
        }
        if(flag===0){
            dispatch(setroomUser({room,username}));
            dispatch({type:"SET_ROOM",payload:room});
            history.push("/board/"+room+'/'+username);
        }else{
            alert("Room already Exists");
        }
    }

return (
    <>
    <AppBar position="static" >
        <Toolbar>
            <div className={classes.appbar}>
                <Typography className={classes.brand} variant={!isMobile?"h4":"h6"}>Project Board Manager</Typography>
            </div> 
            {!isMobile?<div>         
            <Button variant="text" style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/join")}> Join </Button>
            <Button variant="text" style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/")}> Logout </Button>
            </div>:<IconButton onClick={(event)=>setAnchorEl(event.currentTarget)}><MenuIcon /></IconButton>}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)}>
              <MenuItem style={{width:"175px"}} onClick={()=>history.push("/join")}>
                  <Typography variant='h6' style={{margin:"auto"}}>Join</Typography>
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
            <Typography variant={!isMobile?"h3":"h4"}>Create Room</Typography>
            <TextField label="Room" style={{width:"90%"}} value={room} onChange={(event)=>setRoom(event.target.value.trim())}/>
            <Button variant="contained" color="primary" onClick={handleClick} className={classes.button}>Create</Button>
        </div>
    </Paper>
    </>
);
}

export default Create;