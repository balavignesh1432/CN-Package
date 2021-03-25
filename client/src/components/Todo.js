//React 
import React,{ useState,useEffect } from "react";

//Material UI
import { List, ListItem, ListItemText, Paper, TextField,Button,Typography,Menu ,MenuItem, IconButton, ListItemSecondaryAction, Dialog, DialogTitle, DialogContent, DialogActions,Select, Snackbar } from '@material-ui/core';
import { Delete,MoreVert,Add } from "@material-ui/icons";
import Alert from '@material-ui/lab/Alert';
//Redux
import {useSelector, useDispatch} from 'react-redux';
import {getTodo,putTodo,deleteTodo,moveTodo,editTodo,} from '../redux/actions/index';


function Todo(){                

    const [listOpen,setListOpen]=useState(false);     //List Open State
    const [anchorEl, setAnchorEl] = useState(null);   //Position for opening menu
    const open=Boolean(anchorEl);                     //Menu Open State
    
    const [current,setCurrent]=useState('');            //Current clicked Item
    
    const [newItem,setNewItem]=useState('');            //New Item
    

    const [titleEdit,setTitleEdit]=useState('');                //Edit Title
    const [descriptionEdit,setDescriptionEdit]=useState('');    //Edit Description              
    const [teamEdit,setTeamEdit]=useState([]);                  //Edit Team Members
 
    const room = useSelector(state=>state.roomReducer);
    const roomUsers = useSelector(state=>state.roomUserReducer);

    const [assignList,setAssignList] = useState([]);  
    const options=['Move','Delete'];                            //Menu Options
    const [teamOpen,setTeamOpen] = useState(false);
    //Redux State
    const dispatch = useDispatch();
    const todoList = useSelector((state)=>state.todoReducer);

    useEffect(()=>{
        for(let i=0;i<roomUsers.length;i++){
            if(roomUsers[i].room===room){
                setAssignList(roomUsers[i].users);
            }
        }
    },[roomUsers,room]);
    
    //Fetch Todo Lists
    useEffect(()=>{
        dispatch(getTodo());
    },[dispatch]);
    
    //Add New Item
    function submitNewItem(){
        if(newItem!==''){
            dispatch(putTodo({name:newItem,description:'',team:[]}));       //Add Item to list
        }
        setNewItem('');
    }
    
    //Set Current Clicked Item
    function handleItem(event){
        setCurrent(event.target.innerHTML);
        
        for(let i=0;i<todoList.length;i++){                                 //Get details of clicked item
            if(todoList[i].name===event.target.innerHTML){
                setTitleEdit(todoList[i].name);
                setDescriptionEdit(todoList[i].description);
                setTeamEdit(todoList[i].team);
                break;
            }
        }
        setListOpen(true);
    }
    
    //Save item after edit
    function handleListClose(){
        setListOpen(false);
        dispatch(editTodo({name:current},{name:titleEdit,description:descriptionEdit,team:teamEdit}));
    }
    
    //Opening Menu
    function handleMenuOpen(itemName){
        setCurrent(itemName);                                               //Get details of clicked item
        for(let i=0;i<todoList.length;i++){
            if(todoList[i].name===itemName){
                setTitleEdit(todoList[i].name);
                setDescriptionEdit(todoList[i].description);
                setTeamEdit(todoList[i].team);
                break;
            }
        }
    }

    //Closing Menu
    function handleMenuClose(menuType){
        if(menuType==='Delete'){
            dispatch(deleteTodo({name:current}));                                           
        }
        if(menuType==='Move'){                                                              //Move to Doing List
            dispatch(moveTodo({name:current,description:descriptionEdit,team:teamEdit}));       
        }
        setAnchorEl(null);
        setCurrent('');
    }

    //Add Team Member
    function handleTeam(teamMember){
        let flag=0;
        for(let i=0;i<teamEdit.length;i++){                     //Check if team member already added
            if(teamEdit[i]===teamMember){
                setTeamOpen(true);
                flag=1;
                break
            }
        }
        if(flag===0){
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
            <Typography variant="h3" align="center">To Do</Typography>
            <div className="addItem">
                <TextField className="inputField" label="Item" value={newItem} onChange={(event)=>setNewItem(event.target.value.trim())} inputProps={{ maxLength: 35 }}/>
                <IconButton variant='contained' color="primary" onClick={submitNewItem}><Add /></IconButton>
            </div>
            <div className="listComponent">
            <List>
                {todoList.map((item,index)=>{   
                return(
                    <ListItem button key={index} >
                        <ListItemText  onClick={handleItem} primary={item.name}></ListItemText>
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
                            <MenuItem onClick={()=>{handleMenuClose(option)}} key={index}>
                                {option}      
                            </MenuItem>
                            );
                    })}
                </Menu>
                
                <Dialog open={listOpen} onClose={handleListClose}>
                    <DialogTitle>To Do</DialogTitle>
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
                            style={{marginTop:"20px"}}
                            value={descriptionEdit}
                            onChange={(event)=>setDescriptionEdit(event.target.value)}
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

export default Todo;