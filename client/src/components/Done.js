//React 
import React,{ useState,useEffect } from "react";

//Material UI
import { List, ListItem, ListItemText, Paper, TextField,Button,Typography,Menu ,MenuItem, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//Redux
import {useSelector, useDispatch} from 'react-redux';
import {putDone,deleteDone} from '../redux/actions/index';

function Done(){
    const [newItem,setNewItem]=useState('');        //New Item
    const [current,setCurrent]=useState('');        //Current Clicked
    const [anchorEl, setAnchorEl] = useState(null); //Menu Position

    const options=['Move','Delete'];        //Menu Options
    const open=Boolean(anchorEl);           //Menu Open

    //Redux
    const doneList = useSelector((state)=>state.doneReducer);
    const dispatch = useDispatch();
    
    //Set Current Clicked Item
    function handleItem(event){
        // console.log(event.target.innerHTML);
        setCurrent(event.target.innerHTML);
    }
    function handleMenuOpen(item){
        // console.log(item);
        setCurrent(item);
    }

    //Add New Item
    function submitNewItem(){
        if(newItem!==''){
        dispatch(putDone(newItem));
        setNewItem('');
        }
    }

    //Close Menu 
    function handleMenuClose(menuType){
        dispatch(deleteDone(current));
        setAnchorEl(null);
        setCurrent('');
    }

    useEffect(()=>{

    },[]);

    return (
        <div>
            <Paper elevation={5} className="paperList">
            <Typography variant="h3" align="center">Done</Typography>
            <div className="addItem">
            <TextField className="inputField" label="Item" value={newItem} onChange={(event)=>setNewItem(event.target.value)} inputProps={{ maxLength: 35 }}/>
            <Button variant="contained" color="primary" onClick={submitNewItem}>Add</Button>
            </div>
            <div className="listComponent">
            <List>
                {doneList.map((item,index)=>{
                    return(
                    <ListItem button key={index} onClick={handleItem}>
                        <ListItemText primary={item}></ListItemText>
                        <ListItemSecondaryAction>
                        <IconButton onClick={(event)=>{setAnchorEl(event.currentTarget);handleMenuOpen(item)}}>
                            <MoreVertIcon />
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
            </List>
            </div>
            </Paper>
        </div>
    );
}

export default Done;