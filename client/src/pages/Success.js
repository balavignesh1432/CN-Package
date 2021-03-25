import React,{useEffect} from "react";
import { AppBar,Toolbar,Button,Typography,Card,CardHeader,CardContent,CardActions } from "@material-ui/core";
import {useSelector} from 'react-redux';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

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
          <Link to="/create" style={{textDecoration:"none"}}><Button> Create </Button></Link>
          <Link to="/join" style={{textDecoration:"none"}}><Button> Join </Button></Link>
          <Link to="/" style={{textDecoration:"none"}}><Button> Logout </Button></Link>
        </Toolbar>
        </AppBar>
        <h1>Create or Join Room!</h1>
        <div style={{display:"flex",justifyContent:"space-evenly",margin:"50px 0 0 0"}}>
        <Card style={{width:"450px"}} elevation={10}>
          <CardHeader title="Create Room" />
          <CardContent>
            <Typography variant="h6" color="textSecondary">Create new room and add people to your team to collobarate.</Typography> 
          </CardContent>
          <CardActions>
              <Button color="secondary" variant="contained" fullWidth onClick={handleCreate}>Create</Button>
          </CardActions>
        </Card>
        <Card style={{width:"450px"}} elevation={10}>
          <CardHeader title="Join Room" />
          <CardContent>
            <Typography variant="h6" color="textSecondary">Join already existing room to work on the project with your team.</Typography>
          </CardContent>
          <CardActions>
              <Button color="secondary" variant="contained" fullWidth onClick={handleJoin}>Join</Button>
          </CardActions>
        </Card>
        </div>
        </>
    );
}

export default Success;