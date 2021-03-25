import React, { useEffect,useState } from 'react';

//Material UI
import { Avatar, List, ListItem, ListItemText, Paper, Typography,Dialog, DialogContent, DialogActions,DialogTitle,Button, Divider } from "@material-ui/core";
import {Person,Email} from '@material-ui/icons';

//Redux
import { useSelector,useDispatch } from "react-redux";
import { getroomUser, getUser } from '../redux/actions';


function Team(){
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
        <div className="Team" style={{margin:"75px 50px 50px 50px",display:"flex",justifyContent:"space-between"}}>
        <Paper elevation={10} style={{width:"450px"}}>
        <Typography variant="h4" style={{margin:"10px 0 10px 0"}}>Team Members</Typography>
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
        <Paper elevation={10} style={{width:"800px"}}>
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