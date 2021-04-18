import React,{useState} from 'react';
import { AppBar,Button,Toolbar, Typography,useMediaQuery,useTheme,Menu,MenuItem,Divider,IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from 'react-router-dom';
import useStyle from '../styles/HomeStyle';


function Home(){
    const classes = useStyle();
    const history = useHistory();
    const theme=useTheme();
    const isMobile=useMediaQuery(theme.breakpoints.down("sm"));
    const [anchorEl,setAnchorEl] = useState(null);

    return (
        <div>
            <AppBar position="static">
            <Toolbar>
            <div className={classes.appbar}>
            <Typography className={classes.brand} variant={!isMobile?"h4":"h6"}>Project Board Manager</Typography>
            </div>
            {!isMobile?
            <div>
            <Button  style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/register")}> Register </Button>
            <Button  style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/login")}> Login </Button>
            </div>
            :<IconButton onClick={(event)=>setAnchorEl(event.currentTarget)}><MenuIcon /></IconButton>}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)}>
              <MenuItem style={{width:"175px"}} onClick={()=>history.push("/register")}>
                  <Typography variant='h6' style={{margin:"auto"}}>Register</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={()=>history.push("/login")}>
                <Typography variant='h6' style={{margin:"auto"}}>Login</Typography>
              </MenuItem>
            </Menu>
            </Toolbar>
            </AppBar>
            <div className={classes.main}>
                <div className={classes.text} >
                    <Typography variant={!isMobile?"h3":"h4"}>It’s more than work. It’s a way of working together.</Typography>
                    <Typography variant={!isMobile?"h5":"h6"} style={{marginTop:"30px"}}>Manage projects, organize tasks, and build team spirit—all in one place.</Typography>
                </div>
                <img src='https://www.pngitem.com/pimgs/m/22-225462_isometric-team-vector-png-transparent-png.png' alt="Team" className={classes.image}/>
            </div>
            <div className={classes.secondary}>
                <img src='https://d112uwirao0vo9.cloudfront.net/wp-content/uploads/2018/11/Kanban-Board-Todo-Doing-Done.png' alt="Board" className={classes.image} />
                <div className={classes.text}>
                    <Typography variant={!isMobile?"h3":"h4"}>Collaborate, manage projects, and reach new productivity peaks.</Typography>
                </div>
            </div>
            <div className={classes.menu}>
                <Typography variant={!isMobile?"h3":"h4"}>Sign up and get started today. A world of productive teamwork awaits!</Typography>
                <Button variant="contained" color="secondary" onClick={()=>history.push("/register")} size="large" className={classes.button} style={isMobile?{marginRight:"10px"}:{marginRight:"30px"}}>Sign Up</Button>
                <Button variant="outlined" color="secondary" onClick={()=>history.push("/login")} size="large" className={classes.button}>Sign In</Button>
            </div>
        </div>
    )
}

export default Home;