//React 
import React,{ useState,useEffect } from "react";

//Material UI
import { List, ListItem, ListItemText, Paper, TextField,Button,Typography,Menu ,MenuItem, IconButton, ListItemSecondaryAction,Dialog,DialogTitle,DialogContent,DialogActions } from '@material-ui/core';
import { Delete,MoreVert,Add } from "@material-ui/icons";

//Redux
import {useSelector, useDispatch} from 'react-redux';
import {getDone,putDone,deleteDone,editDone} from '../redux/actions/index';

function Done(){
    const [listOpen,setListOpen]=useState(false);     //List Open State
    const [anchorEl, setAnchorEl] = useState(null);   //Position for opening menu
    const open=Boolean(anchorEl);                     //Menu Open State

    const [current,setCurrent]=useState('');            //Current clicked Item
    
    const [newItem,setNewItem]=useState('');            //New Item
    const [teamMember,setTeamMember]=useState('');      //New Member

    const [titleEdit,setTitleEdit]=useState('');                //Edit Title
    const [descriptionEdit,setDescriptionEdit]=useState('');    //Edit Description              
    const [teamEdit,setTeamEdit]=useState([]);                  //Edit Team Members
 

    const options=['Delete'];        //Menu Options

    //Redux
    const dispatch = useDispatch();
    const doneList = useSelector((state)=>state.doneReducer);

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
        setTeamMember('');
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
    function handleTeam(){
        let flag=0;
        for(let i=0;i<teamEdit.length;i++){             //Check if team member already added
            if(teamEdit[i]===teamMember){
                console.log("Already Exists");
                flag=1;
                break
            }
        }
        if(flag===0 && teamMember!==''){
        setTeamEdit((prev)=>[...prev,teamMember]);
        }
        setTeamMember('');
    }

    //Remove Team Member
    function handleDeleteMember(member){
        setTeamEdit(teamEdit.filter((item)=>item!==member)); 
     }
 
    return (
        <div>
            <Paper elevation={5} className="paperList">
            <Typography variant="h3" align="center">Done</Typography>
            <div className="addItem">
            <TextField className="inputField" label="Item" value={newItem} onChange={(event)=>setNewItem(event.target.value)} inputProps={{ maxLength: 35 }}/>
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
                        <TextField value={teamMember} onChange={(event)=>setTeamMember(event.target.value)} style={{flex:"1"}} inputProps={{ maxLength: 25 }}/>
                        <IconButton color="primary" variant="contained" onClick={handleTeam}><Add /></IconButton>
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