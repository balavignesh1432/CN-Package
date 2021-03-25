//React 
import React,{ useState,useEffect } from "react";

//Material UI
import { List, ListItem, ListItemText, Paper, TextField,Button,Typography,Menu ,MenuItem, IconButton, ListItemSecondaryAction,Dialog,DialogTitle,DialogContent,DialogActions,Select,Snackbar } from '@material-ui/core';
import { Delete,MoreVert,Add } from "@material-ui/icons";
import Alert from '@material-ui/lab/Alert';

//Redux
import {useSelector, useDispatch} from 'react-redux';
import {getDone,putDone,deleteDone,editDone} from '../redux/actions/index';

function Done(){
    const [listOpen,setListOpen]=useState(false);     //List Open State
    const [anchorEl, setAnchorEl] = useState(null);   //Position for opening menu
    const open=Boolean(anchorEl);                     //Menu Open State

    const [teamOpen,setTeamOpen]=useState(false);


    const [current,setCurrent]=useState('');            //Current clicked Item
    
    const [newItem,setNewItem]=useState('');            //New Item

    const [titleEdit,setTitleEdit]=useState('');                //Edit Title
    const [descriptionEdit,setDescriptionEdit]=useState('');    //Edit Description              
    const [teamEdit,setTeamEdit]=useState([]);                  //Edit Team Members
    
    const room = useSelector(state=>state.roomReducer);
    const roomUsers = useSelector(state=>state.roomUserReducer);

    const [assignList,setAssignList] = useState([]);

    const options=['Delete'];        //Menu Options

    //Redux
    const dispatch = useDispatch();
    const doneList = useSelector((state)=>state.doneReducer);

    useEffect(()=>{
        for(let i=0;i<roomUsers.length;i++){
            if(roomUsers[i].room===room){
                setAssignList(roomUsers[i].users);
            }
        }
    },[roomUsers,room]);

    //Fetch Done Lists
    useEffect(()=>{
        dispatch(getDone());
    },[dispatch]);
    
    //Add New Item
    function submitNewItem(){
        if(newItem!==''){
            dispatch(putDone({name:newItem,description:'',team:[]}));
        }
        setNewItem('');
    }

    //Set Current Clicked Item
    function handleItem(event){
        setCurrent(event.target.innerHTML);
        
        for(let i=0;i<doneList.length;i++){                     //Get details of clicked item
            if(doneList[i].name===event.target.innerHTML){
                setTitleEdit(doneList[i].name);
                setDescriptionEdit(doneList[i].description);
                setTeamEdit(doneList[i].team);
                break;
            }
        }
        setListOpen(true);
    }

    //Save item after edit
    function handleListClose(){
        setListOpen(false);
        dispatch(editDone({name:current},{name:titleEdit,description:descriptionEdit,team:teamEdit}));
    }

    //Opening Menu
    function handleMenuOpen(itemName){
        setCurrent(itemName);
        for(let i=0;i<doneList.length;i++){                     //Get details of clicked item
            if(doneList[i].name===itemName){
                setTitleEdit(doneList[i].name);
                setDescriptionEdit(doneList[i].description);
                setTeamEdit(doneList[i].team);
                break;
            }
        }
    }

    //Closing Menu 
    function handleMenuClose(menuType){
        if(menuType==='Delete'){
            dispatch(deleteDone({name:current,description:descriptionEdit,team:teamEdit}));
        }
        setAnchorEl(null);
        setCurrent('');
    }

    //Add Team Member
    function handleTeam(teamMember){
        let flag=0;
        for(let i=0;i<teamEdit.length;i++){             //Check if team member already added
            if(teamEdit[i]===teamMember){
                setTeamOpen(true);
                flag=1;
                break
            }
        }
        if(flag===0 && teamMember!==''){
        setTeamEdit((prev)=>[...prev,teamMember]);
        }
    }

    //Remove Team Member
    function handleDeleteMember(member){
        setTeamEdit(teamEdit.filter((item)=>item!==member)); 
    }
 
    function handleAssigned(event){
        handleTeam(event.target.value);
    }

    const handleTeamClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setTeamOpen(false);
      };
    
    return (
        <div>
            <Snackbar open={teamOpen} anchorOrigin={{vertical:'top',horizontal:'center'}} autoHideDuration={2000} onClose={handleTeamClose}>
                <Alert onClose={handleTeamClose} severity="error">
                    Already Assigned        
                </Alert>
            </Snackbar>
            <Paper elevation={5} className="paperList">
            <Typography variant="h3" align="center">Done</Typography>
            <div className="addItem">
            <TextField className="inputField" label="Item" value={newItem} onChange={(event)=>setNewItem(event.target.value.trim())} inputProps={{ maxLength: 35 }}/>
            <IconButton variant="contained" color="primary" onClick={submitNewItem}><Add/></IconButton>
            </div>
            <div className="listComponent">
            <List>
                {doneList.map((item,index)=>{
                    return(
                    <ListItem button key={index} >
                        <ListItemText primary={item.name} onClick={handleItem}></ListItemText>
                        <ListItemSecondaryAction>
                        <IconButton onClick={(event)=>{setAnchorEl(event.currentTarget);handleMenuOpen(item.name)}}>
                            <MoreVert />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    );
                })}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}>
                    {options.map((option,index)=>{
                        return (
                            <MenuItem onClick={()=>handleMenuClose(option)} key={index}>
                                {option}      
                            </MenuItem>
                            )
                    })}
                </Menu>
                <Dialog open={listOpen} onClose={handleListClose}>
                    <DialogTitle>Done</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            style={{marginTop:"10px"}}
                            value={titleEdit}
                            onChange={(event)=>setTitleEdit(event.target.value)}
                        />
                       <TextField 
                            label="Description"
                            variant="outlined"
                            multiline
                            rowsMax={4}
                            fullWidth
                            value={descriptionEdit}
                            onChange={(event)=>setDescriptionEdit(event.target.value)}
                            style={{marginTop:"20px"}}
                        />
                        <Typography variant="h6" style={{marginTop:"20px"}}>Assigned Members</Typography>                    
                        
                        <div className="addItem">
                        <Select
                            style={{maxHeight:"50px",overflowY:"auto",overflowX:"hidden"}}
                            fullWidth
                            placeholder="Member"
                            value=""
                            onChange={handleAssigned}
                            MenuProps={{ PaperProps:{style:{maxHeight:"200px"}} }}
                        >
                        {assignList.map((user,index)=>{
                            return (
                                <MenuItem key={index}   value={user}>{user}</MenuItem>
                            )
                        })}
                        </Select>
                        </div>
                        <List>
                        {teamEdit.map((member,index)=>{
                            return(
                            <ListItem dense key={index}>
                                <ListItemText primary={member}></ListItemText>
                                <IconButton onClick={()=>handleDeleteMember(member)}>
                                <Delete fontSize="small" />
                                </IconButton>
                            </ListItem>);
                        })}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" variant="contained" onClick={handleListClose}>Save</Button>
                    </DialogActions>
                </Dialog>
            </List>
            </div>
            </Paper>
        </div>
    );
}

export default Done;