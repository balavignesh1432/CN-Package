import React from "react";
import './App.css';

//Routing
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Material UI
import { AppBar,Button,Toolbar, Typography } from "@material-ui/core";

//Pages
import Register from './pages/Register';
import BoardPage from "./pages/BoardPage";
import Login from './pages/Login';
import Create from "./pages/Create";
import Join from "./pages/Join";
import Wait from "./pages/Wait";
import Success from "./pages/Success";

function App() {
  return (
    <div className="App">
    <Router>
    
      <Switch>
        <Route exact path="/">
        <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h4" className="brandName">Project Board Manager</Typography>
          <Link to="/register" style={{textDecoration:"none"}}><Button> Register </Button></Link>
          <Link to="/login" style={{textDecoration:"none"}}><Button> Login </Button></Link>
        </Toolbar>
        </AppBar>
        </Route>
        <Route path="/board/:room/:username">
          <BoardPage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/wait/:room/:username">
          <Wait />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/join">
           <Join />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
