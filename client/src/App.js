import React from "react";
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Material UI
import { AppBar,Button,Toolbar, Typography } from "@material-ui/core";

//Redux
// import { useSelector } from "react-redux";

//Pages
import Register from './pages/Register';
import BoardPage from "./pages/BoardPage";
import Login from './pages/Login';
import Create from "./pages/Create";
import Join from "./pages/Join";
import Wait from "./pages/Wait";
import Success from "./pages/Success";

function App() {
  // const isLogged = useSelector((state)=>state.loggedReducer);
  return (
    <div className="App">
    <Router>
    
      <Switch>
        <Route exact path="/">
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/register"><Button> Register </Button></Link>
          <Link to="/login"><Button> Login </Button></Link>
        </Toolbar>
        </AppBar>
        </Route>
        <Route path="/board/:room/:username">
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/request"><Button> Requests </Button></Link>
          <Link to="/"><Button> Logout </Button></Link>
        </Toolbar>
        </AppBar>
          <BoardPage />
        </Route>
        <Route path="/login">
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/register"><Button> Register </Button></Link>
          <Link to="/"><Button> Home </Button></Link>
        </Toolbar>
        </AppBar>
          <Login />
        </Route>
        <Route path="/register">
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/login"><Button> Login </Button></Link>
          <Link to="/"><Button> Home </Button></Link>
        </Toolbar>
        </AppBar>
          <Register />
        </Route>
        <Route path="/success">
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/create"><Button> Create </Button></Link>
          <Link to="/join"><Button> Join </Button></Link>
          <Link to="/"><Button> Logout </Button></Link>
        </Toolbar>
        </AppBar>
          <Success />
        </Route>
        <Route path="/wait/:room/:username">
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/"><Button> Logout </Button></Link>
        </Toolbar>
        </AppBar>
          <Wait />
        </Route>
        <Route path="/create">
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/join"><Button> Join </Button></Link>
          <Link to="/"><Button> Logout </Button></Link>
        </Toolbar>
        </AppBar>
          <Create />
        </Route>
        <Route path="/join">
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/create"><Button> Create </Button></Link>
          <Link to="/"><Button> Logout </Button></Link>
        </Toolbar>
        </AppBar>
          <Join />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
