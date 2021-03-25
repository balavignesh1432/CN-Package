import React,{useEffect} from "react";
import { AppBar,Toolbar,Button,Typography } from "@material-ui/core";
import {useSelector} from 'react-redux';
import { useHistory } from "react-router";

function Success(){

    const history= useHistory();

    const isLogged = useSelector(state=>state.loggedReducer);

    useEffect(()=>{
        if(!isLogged){
            history.push("/login");        
        }
    },[isLogged,history]);
    
    function handleJoin(){
        history.push("/join");
    }
    function handleCreate(){
        history.push("/create");
    }
    return (
        <>
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Button variant="text" style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/create")}> Create </Button>
          <Button variant="text" style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/join")}> Join </Button>
          <Button variant="text" style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/")}> Logout </Button>
        </Toolbar>
        </AppBar>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly",margin:"50px 0 0 0"}}>
            <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",margin:'100px 0 50px 70px'}}>
                <div style={{width:"600px"}} >
                    <Typography variant="h2">Create Room</Typography>
                    <Typography variant="h4" style={{marginTop:"30px"}}>Create new room, add people to your team and start colloborating!</Typography>
                    <Button variant="contained" color='secondary' onClick={handleCreate} size="large" style={{margin:"50px 0 0 0",width:"400px"}}>Create</Button>
                </div>
                <img src='https://thumbs.dreamstime.com/b/building-house-work-process-buildings-construction-machinery-flat-vector-concept-building-house-work-process-buildings-125839121.jpg' alt="Create" style={{width:"600px"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",margin:'100px 50px 50px 50px'}}>
                <img src='https://image.freepik.com/free-vector/businessman-enter-open-door-concept_48369-6111.jpg' alt="Join" style={{width:"600px"}} />
                <div style={{width:"600px"}}>
                    <Typography variant="h2">Join Room</Typography>
                    <Typography variant="h4" style={{marginTop:"30px"}}>Join an existing room to start working with the team!</Typography>
                    <Button variant="contained" color='secondary' onClick={handleJoin} size="large" style={{margin:"50px 0 0 0",width:"400px"}}>Join</Button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Success;