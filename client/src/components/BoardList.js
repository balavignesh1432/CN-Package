import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText,Paper, TextField,Button,Typography } from '@material-ui/core';
function BoardList(props){
    const listItem=[1,2,2,1,1,2,21,2,3,1,3,2,1,12,2,22,2,2,22,2]
    const [list,setList]=useState(listItem);
    const [newItem,setNewItem]=useState('');

    function submitNewItem(){
        if(newItem!==''){
        setList((prevList)=>[...prevList,newItem]);
        setNewItem('');
        }
    }
    
    useEffect(()=>{
        // console.log(newItem);
    },[newItem]);
    
    return (
        <div>
            <Paper elevation={5} className="paperList">
            <Typography variant="h3" align="center">{props.name}</Typography>
            <div className="addItem">
            <TextField className="inputField" label="Item" value={newItem} onChange={(event)=>setNewItem(event.target.value)}/>
            <Button variant="contained" color="primary" onClick={submitNewItem}>Add</Button>
            </div>
            <div className="listComponent">
            <List>
                {list.map((item,index)=>{
                return(
                    <ListItem button key={index}>
                        <ListItemText primary={item}></ListItemText>
                    </ListItem>
                    );
                })}
            </List>
            </div>
            </Paper>
        </div>
    );
}
export default BoardList;