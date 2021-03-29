import React, { useEffect,useState } from 'react';

//Material UI
import { Avatar, List, ListItem, ListItemText, Paper, Typography,Dialog, DialogContent, DialogActions,DialogTitle,Button, Divider,useTheme,useMediaQuery } from "@material-ui/core";
import {Person,Email} from '@material-ui/icons';

//Redux
import { useSelector,useDispatch } from "react-redux";
import { getroomUser, getUser } from '../redux/actions';
import useStyle from '../styles/BoardStyles';


function Team(){

    const classes= useStyle();
    const theme=useTheme();
    const isMobile=useMediaQuery(theme.breakpoints.down("sm"));

    const [open,setOpen]=useState(false);

    const [members,setMembers]= useState([]);
    const [userDetails,setUserDetails]=useState([]);
    
    const [name,setName]=useState('');
    const [contact,setContact]=useState('');
    
    const room = useSelector((state)=>state.roomReducer);
    const rooms= useSelector((state)=>state.roomUserReducer);
    const users = useSelector((state)=>state.userReducer);

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getroomUser());
        dispatch(getUser());
    },[dispatch]);

    useEffect(()=>{
        setUserDetails(users);
    },[users]);
    
    useEffect(()=>{
        for(let i=0;i<rooms.length;i++){
            if(rooms[i].room===room){
                setMembers(rooms[i].users);
                break;
            }
        } 
    },[rooms,room]);

    function handleUserDetails(username){
        for(let i=0;i<userDetails.length;i++){
            if(userDetails[i].username===username){
                setName(userDetails[i].name);
                setContact(userDetails[i].email);
                break;
            }
        }
        setOpen(true);   
    }

    function handleDialogClose(){
        setOpen(false);
        setName('');
        setContact('');
    }

    return (
        <div className={classes.team}>
        <Paper elevation={10} style={!isMobile?{width:"30%",background:"#F0F0F0"}:{width:"90%",background:"#F0F0F0"}}>
        <Typography variant={!isMobile?"h4":"h5"} style={{margin:"10px 0 10px 0"}}>Team Members</Typography>
        <div className="teamList">
        <List>
            {members.map((user,index)=>{
                return (
                    <div key={index}>
                    <ListItem button onClick={()=>handleUserDetails(user)}>
                        <Avatar style={{backgroundColor:"red",marginRight:"20px"}}>{user[0]}</Avatar>
                        <ListItemText primary={user} />
                    </ListItem>
                    </div>
                );
            })}
        </List>
        </div>
        </Paper>
        <Paper elevation={10} style={!isMobile?{width:"50%",background:"#F0F0F0"}:{width:"90%",background:"#F0F0F0",marginTop:"20px"}}>
            <h1>Chat</h1>
        </Paper>
        <Dialog open={open} onClose={handleDialogClose}>
                    <DialogTitle>Member Details</DialogTitle>
                    <DialogContent>
                        <List style={{width:"300px"}}>
                            <ListItem >
                                <Person fontSize="large" style={{marginRight:"20px"}} />
                                <ListItemText primary="Name" secondary={name} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Email fontSize="large" style={{marginRight:"20px"}} />
                                <ListItemText primary="Email" secondary={contact} />
                            </ListItem>
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" variant="contained" onClick={handleDialogClose}>Close</Button>
                    </DialogActions>
                </Dialog>
        </div>
    );
}

export default Team;