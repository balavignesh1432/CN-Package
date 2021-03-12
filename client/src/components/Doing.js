//React 
import React,{ useState,useEffect } from "react";

//Material UI
import { List, ListItem, ListItemText, Paper, TextField,Button,Typography,Menu ,MenuItem, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//Redux
import {useSelector, useDispatch} from 'react-redux';
import {putDoing,deleteDoing,moveDoing} from '../redux/actions/index';

function Doing(){
    const [newItem,setNewItem]=useState('');        //New Item
    const [current,setCurrent]=useState('');        //Current Clicked Item
    const [anchorEl, setAnchorEl] = React.useState(null);   //Menu position

    const options=['Move','Delete'];            //Item Options
    const open=Boolean(anchorEl);               //Menu Open state

    //Redux
    const doingList = useSelector((state)=>state.doingReducer);         
    const dispatch = useDispatch();
    
    //Add New Item
    function submitNewItem(){
        if(newItem!==''){
        dispatch(putDoing(newItem));
        setNewItem('');
        }
    }
    
    //Set Current clicked item
    function handleItem(event){
        // console.log(event.target.innerHTML);
        setCurrent(event.target.innerHTML);
    }
    function handleMenuOpen(item){
        // console.log(item);
        setCurrent(item);
    }
    
    //Close Menu 
    function handleMenuClose(menuType){
        if(menuType==='Delete'){
            dispatch(deleteDoing(current));
        }
        if(menuType==='Move'){
            dispatch(moveDoing(current));
        }
        setAnchorEl(null);
        setCurrent('');
    }

    useEffect(()=>  {

    },[]);

    return (
        <div>
            <Paper elevation={5} className="paperList">
            <Typography variant="h3" align="center">Doing</Typography>
            <div className="addItem">
            <TextField className="inputField" label="Item" value={newItem} onChange={(event)=>setNewItem(event.target.value)} inputProps={{ maxLength: 35 }}/>
            <Button variant="contained" color="primary" onClick={submitNewItem}>Add</Button>
            </div>
            <div className="listComponent">
            <List>
                {doingList.map((item,index)=>{
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
                    onClose={handleMenuClose}
                >
                    {options.map((option,index)=>{
                        return (
                            <MenuItem onClick={()=>{handleMenuClose(option)}} key={index}>
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

export default Doing;