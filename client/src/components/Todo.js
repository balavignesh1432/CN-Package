//React 
import React,{ useState,useEffect } from "react";

//Material UI
import { List, ListItem, ListItemText, Paper, TextField,Button,Typography,Menu ,MenuItem, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//Redux
import {useSelector, useDispatch} from 'react-redux';
import {putTodo,deleteTodo,moveTodo} from '../redux/actions/index';

function Todo(){
    const [newItem,setNewItem]=useState('');            //New Item
    const [anchorEl, setAnchorEl] = React.useState(null);   //Position for opening menu
    const [current,setCurrent]=useState('');            //Current clicked Item
    
    const open=Boolean(anchorEl);               //Menu Open 
    const options=['Move','Delete'];            //Options in list item

    //Redux State
    const todoList = useSelector((state)=>state.todoReducer);
    const dispatch = useDispatch();
    
    
    
    //Set Current Clicked Item
    function handleItem(event){
        //console.log(event.target.innerHTML);
        setCurrent(event.target.innerHTML);
    }
    function handleMenuOpen(item){
        setCurrent(item);
        // console.log(item);        
    }

    //Add New Item
    function submitNewItem(){
        if(newItem!==''){
        dispatch(putTodo(newItem));
        setNewItem('');
        }
    }

    //Closing Menu
    function handleMenuClose(menuType){
        if(menuType==='Delete'){
            dispatch(deleteTodo(current));
        }
        if(menuType==='Move'){
            dispatch(moveTodo(current));
        }
        setAnchorEl(null);
        setCurrent('');
    }

    useEffect(()=>{

    },[]);


    return (
        <div>
            <Paper elevation={5} className="paperList">
            <Typography variant="h3" align="center">To Do</Typography>
            <div className="addItem">
                <TextField className="inputField" label="Item" value={newItem} onChange={(event)=>setNewItem(event.target.value)} inputProps={{ maxLength: 35 }}/>
                <Button variant="contained" color="primary" onClick={submitNewItem}>Add</Button>
            </div>
            <div className="listComponent">
            <List>
                {todoList.map((item,index)=>{
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
                            <MenuItem onClick={()=>{handleMenuClose(option)}} key={index}>
                                {option}      
                            </MenuItem>
                            );
                    })}
                </Menu>
            </List>
            </div>
            </Paper>
        </div>
    );
}

export default Todo;