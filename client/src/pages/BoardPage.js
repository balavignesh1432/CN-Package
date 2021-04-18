import { useEffect, useState } from 'react';

//Components
import Todo from '../components/Todo';
import Doing from '../components/Doing';
import Done from '../components/Done';
import Team from '../components/Team';
import Progress from '../components/Progress';

//Material UI
import { Menu,MenuItem,Button,Typography,AppBar,Toolbar, List,ListItem, Divider, ListItemText,Badge,Snackbar,useTheme,useMediaQuery, IconButton} from '@material-ui/core';
import { Notifications} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { Alert } from "@material-ui/lab";

import useStyle from '../styles/BoardStyles';

//Redux
import { acceptUser, getroomUser, getwaitUser, removeWaitUser } from "../redux/actions/index";
import { useDispatch, useSelector } from 'react-redux';

//Routing
import {useHistory, useParams} from 'react-router-dom';

function BoardPage(){
    
    const theme=useTheme();
    const isMobile=useMediaQuery(theme.breakpoints.down("sm"));
    const [anchorElRes,setAnchorElRes] = useState(null);

    const classes = useStyle();

    const {room}=useParams();
    const {username}=useParams();

    const [anchorEl, setAnchorEl] = useState(null);   //Position for opening menu
    const open=Boolean(anchorEl);                     //Menu Open State
    
    const history = useHistory();
    const [acceptOpen,setAcceptOpen]=useState(false);
    const [rejectOpen,setRejectOpen]=useState(false);
    
    const dispatch=useDispatch();
    
    const roomUsers = useSelector(state=>state.roomUserReducer);
    const waitUsers = useSelector((state)=>state.waitUserReducer);

    useEffect(()=>{
        dispatch(getroomUser());
        dispatch(getwaitUser());
    },[dispatch]);

    useEffect(()=>{
        let flag=0;
        for(let i=0;i<roomUsers.length;i++){
            if(roomUsers[i].room===room && roomUsers[i].users.includes(username)){
                flag=1;
                break
            }
        }
        if(flag===0){
            //history.push("/login");
        }
    },[history,room,username,roomUsers]);
    
    const handleAcceptClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAcceptOpen(false);
      };
    const handleRejectClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setRejectOpen(false);
    };
    return(
        <div>
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant={!isMobile?"h4":"h6"} className="brandName">Project Board Manager</Typography>
          {!isMobile?<div>
          <Button onClick={(event)=>{dispatch(getwaitUser());setAnchorEl(event.currentTarget)}} style={{color:"whitesmoke"}}>
            Requests
          <Badge color="secondary" badgeContent={waitUsers.length}><Notifications /></Badge>
          </Button>
          <Button style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/")}>Logout</Button>
          </div>:
          <>
          <Button onClick={(event)=>{dispatch(getwaitUser());setAnchorEl(event.currentTarget)}} style={{color:"whitesmoke"}}>
            {/* Requests */}
          <Badge color="secondary" badgeContent={waitUsers.length}><Notifications /></Badge>
          </Button>
          <IconButton><MenuIcon onClick={(event)=>setAnchorElRes(event.currentTarget)}/></IconButton>
          </>}
          <Menu anchorEl={anchorElRes} open={Boolean(anchorElRes)} onClose={()=>setAnchorElRes (null)}>
              {/* <MenuItem style={{width:"175px"}} onClick={()=>history.push("/join")}>
                  <Typography variant='h6' style={{margin:"auto"}}>Requests</Typography>
                  <Badge color="secondary" badgeContent={waitUsers.length}><Notifications /></Badge>
              </MenuItem>
              <Divider /> */}
              <MenuItem onClick={()=>history.push("/")} style={{width:"130px"}}>
              <Typography variant='h5' style={{margin:"auto"}}>Logout</Typography>
              </MenuItem>
          </Menu>
        </Toolbar>
        </AppBar>
        <Snackbar open={acceptOpen} anchorOrigin={{vertical:'top',horizontal:'center'}} autoHideDuration={2000} onClose={handleAcceptClose}>
            <Alert onClose={handleAcceptClose} severity="success">
                Request Accepted        
            </Alert>
        </Snackbar>
        <Snackbar open={rejectOpen} anchorOrigin={{vertical:'top',horizontal:'center'}} autoHideDuration={2000} onClose={handleRejectClose}>
            <Alert onClose={handleRejectClose} severity="info">
                Request Rejected        
            </Alert>
        </Snackbar>
        <Menu 
        anchorEl={anchorEl}
        open={open} 
        onClose={()=>setAnchorEl(null)}
        style={{padding:"0"}}
        >
        <Typography variant="h5" style={{textAlign:"center",margin:"5px 10px 2px 10px"}}>Pending Requests</Typography>
        <List>
            {waitUsers.length!==0 ? waitUsers.map((user,index)=>{
                return(     
                    <ListItem key={index}>  
                    <Typography variant="body1" style={{marginRight:"50px"}}>{user}</Typography>
                    <Button variant="contained" color="primary" size="small" style={{marginRight:"3px"}} onClick={()=>{setAcceptOpen(true);dispatch(acceptUser(user))}}>Accept</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={()=>{setRejectOpen(true);dispatch(removeWaitUser(user))}}>Reject</Button>
                    <Divider />
                    </ListItem>
                );
            }):<ListItem><ListItemText primary="No Requests Available" style={{textAlign:"center"}}/></ListItem>} 
        </List>
        <Button style={{width:"100px"}} variant="contained" color="secondary" onClick={()=>setAnchorEl(null)} size="small">Close</Button>
        </Menu>
        <Progress />
        <div className={classes.boardLists}>
            <Todo />
            <Doing />
            <Done />
        </div>
        <Team />
        {/* <Chat /> */}
        </div>
    )
}

export default BoardPage;