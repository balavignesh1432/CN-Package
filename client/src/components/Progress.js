import React from 'react';
import { Box,LinearProgress,Typography } from "@material-ui/core";
import { useSelector } from 'react-redux';

function Progress(){

    const todoItems=useSelector(state=>state.todoReducer);
    const doingItems=useSelector(state=>state.doingReducer);
    const doneItems=useSelector(state=>state.doneReducer);
    
    const totalLength = todoItems.length + doingItems.length + doneItems.length; 
    const doneLength = doneItems.length;
    const progress = totalLength!==0?(doneLength/totalLength) * 100: 0;
    
    function LinearProgressWithLabel(props) {
        return (
          <Box display="flex" alignItems="center" justifyContent="center" margin="10px 0 50px 0">
            <Box width="80%" mr={1}>
              <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="h6" >
              {`${Math.round(props.value,)}%`}
              </Typography>
            </Box>
          </Box>
        );
    }
    return(
        <div className="progress">
        <Typography variant="h4" style={{marginTop:"20px"}}>Project Completion</Typography>
        <LinearProgressWithLabel value={progress} />
        </div>
    );
}

export default Progress;