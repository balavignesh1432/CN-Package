import React,{useEffect, useState} from "react";
import { AppBar,Toolbar,Button,Typography,useTheme,useMediaQuery, IconButton,Menu,MenuItem,Divider } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import {useSelector} from 'react-redux';
import { useHistory } from "react-router";
import useStyle from "../styles/SuccessStyle";

function Success(){

    const classes=useStyle();
    const theme=useTheme();
    const isMobile=useMediaQuery(theme.breakpoints.down("sm"));
    const [anchorEl,setAnchorEl] = useState(null);

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
        <AppBar position="static">
        <Toolbar>
        <div className={classes.appbar}>
          <Typography className={classes.brand} variant={!isMobile?"h4":"h6"}>Project Board Manager</Typography>
        </div>
          {!isMobile?
          <div>
          <Button  style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/create")}> Create </Button>
          <Button  style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/join")}> Join </Button>
          <Button  style={{color:"whitesmoke"}} size="large" onClick={()=>history.push("/")}> Logout </Button>
          </div>
          :<IconButton onClick={(event)=>setAnchorEl(event.currentTarget)}><MenuIcon /></IconButton>}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)}>
              <MenuItem style={{width:"150px"}} onClick={()=>history.push("/create")}>
                  <Typography variant='h6' style={{margin:"auto"}}>Create</Typography>
              </MenuItem>
              <Divider />
              <MenuItem style={{width:"150px"}} onClick={()=>history.push("/join")}>
                  <Typography variant='h6' style={{margin:"auto"}}>Join</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={()=>history.push("/")}>
              <Typography variant='h6' style={{margin:"auto"}}>Logout</Typography>
              </MenuItem>
          </Menu>
        </Toolbar>
        </AppBar>
        <div className={classes.content}>
            <div className={classes.create}>
                <div className={classes.text} >
                    <Typography variant={!isMobile?"h2":"h4"}>Create Room</Typography>
                    <Typography variant={!isMobile?"h4":"h5"} style={{marginTop:"30px"}}>Create new room, add people to your team and start colloborating!</Typography>
                    {isMobile && <img src='https://www.kareo.com/sites/default/files/styles/kfile_800x600/public/kfm/img/2015/5-steps-to-creating-website-01.jpg?itok=WLTTcMRa' alt="Create" className={classes.image}/> }
                    <Button variant="contained" color='secondary' onClick={handleCreate} size="large" className={classes.button}>Create</Button>
                </div>
                {!isMobile && <img src='https://www.kareo.com/sites/default/files/styles/kfile_800x600/public/kfm/img/2015/5-steps-to-creating-website-01.jpg?itok=WLTTcMRa' alt="Create" className={classes.image}/> }
            </div>
            <div className={classes.join}>
                {!isMobile && <img src='https://www.emscorporate.com/hs-fs/hubfs/EMS%20Blog%20Media/Why%20Your%20Small%20Business%20Should%20Join%20a%20Local%20Chamber%20of%20Commerce/Why%20Join%20Your%20Local%20Chamber%20of%20Commerce.jpg' alt="Join" className={classes.image} /> }
                <div className={classes.text}>
                    <Typography variant={!isMobile?"h2":"h4"}>Join Room</Typography>
                    <Typography variant={!isMobile?"h4":"h5"} style={{marginTop:"30px"}}>Join an existing room to start working with the team!</Typography>
                    {isMobile && <img src='https://www.emscorporate.com/hs-fs/hubfs/EMS%20Blog%20Media/Why%20Your%20Small%20Business%20Should%20Join%20a%20Local%20Chamber%20of%20Commerce/Why%20Join%20Your%20Local%20Chamber%20of%20Commerce.jpg' alt="Join" className={classes.image} /> }
                    <Button variant="contained" color='secondary' onClick={handleJoin} size="large" className={classes.button}>Join</Button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Success;

//https://www.emscorporate.com/hs-fs/hubfs/EMS%20Blog%20Media/Why%20Your%20Small%20Business%20Should%20Join%20a%20Local%20Chamber%20of%20Commerce/Why%20Join%20Your%20Local%20Chamber%20of%20Commerce.jpg

//https://www.kareo.com/sites/default/files/styles/kfile_800x600/public/kfm/img/2015/5-steps-to-creating-website-01.jpg?itok=WLTTcMRa