import React from 'react';
import { AppBar,Button,Toolbar, Typography } from "@material-ui/core";
import {useHistory} from 'react-router-dom';

function Home(){
    const history = useHistory();
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" className="brandName">Project Board Manager</Typography>
                    <Button variant="text" style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/register")}> Register </Button>
                    <Button variant="text" style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/login")}> Login </Button>
                </Toolbar>
            </AppBar>
            <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",margin:'100px 0 50px 70px'}}>
                <div style={{width:"600px"}} >
                    <Typography variant="h3">It’s more than work. It’s a way of working together.</Typography>
                    <Typography variant="h5" style={{marginTop:"30px"}}>Manage projects, organize tasks, and build team spirit—all in one place.</Typography>
                </div>
                <img src='https://www.pngitem.com/pimgs/m/22-225462_isometric-team-vector-png-transparent-png.png' alt="Team" style={{width:"600px"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",margin:'100px 50px 50px 50px'}}>
                <img src='https://d112uwirao0vo9.cloudfront.net/wp-content/uploads/2018/11/Kanban-Board-Todo-Doing-Done.png' alt="Board" style={{width:"600px"}} />
                <div style={{width:"600px"}}>
                    <Typography variant="h3">Collaborate, manage projects, and reach new productivity peaks.</Typography>
                </div>
            </div>
            <div style={{width:"550px",margin:"100px auto"}}>
                <Typography variant="h3">Sign up and get started today. A world of productive teamwork awaits!</Typography>
                <Button variant="contained" color="secondary" onClick={()=>history.push("/register")} size="large" style={{marginRight:"30px",marginTop:"50px",width:"200px"}}>Sign Up</Button>
                <Button variant="outlined" color="secondary" onClick={()=>history.push("/login")} size="large" style={{marginTop:"50px",width:"200px"}}>Sign In</Button>
            </div>
        </div>
    )
}

export default Home;