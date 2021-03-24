import React, { useEffect,useState } from 'react';

//Material UI
import { Avatar, List, ListItem, ListItemText, Paper, Typography,Dialog, DialogContent, DialogActions,DialogTitle,Button } from "@material-ui/core";

//Redux
import { useSelector,useDispatch } from "react-redux";
import { getroomUser, getUser } from '../redux/actions';


function Team(){
    const [members,setMembers]= useState([]);
    const [userDetails,setUserDetails]=useState([]);
    const [name,setName]=useState('');
    const [contact,setContact]=useState('');
    const [open,setOpen]=useState(false);

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
                        <Avatar style={{backgroundColor:"blue",marginRight:"20px"}}>{user[0]}</Avatar>
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
                        <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"300px",justifyContent:"space-between"}}>
                        <h3>Name</h3>
                        <Typography variant="body1">{name}</Typography>
                        </div>
                        <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"300px",justifyContent:"space-between"}}>
                        <h3>Email</h3>
                        <Typography variant="body1">{contact}</Typography>        
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" variant="contained" onClick={handleDialogClose}>Close</Button>
                    </DialogActions>
                </Dialog>
        </div>
    );
}

export default Team;