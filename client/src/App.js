import React from "react";
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Material UI
import { AppBar,Button,Toolbar, Typography } from "@material-ui/core";

//Redux
// import { useSelector } from "react-redux";

//Components
import Register from './pages/Register';
import BoardPage from "./pages/BoardPage";
import Login from './pages/Login.js';

function App() {
  // const isLogged = useSelector((state)=>state.loggedReducer);
  return (
    <div className="App">
    <Router>
    <AppBar position="static" className="appbar">
      <Toolbar>
        <Typography variant="h4" className="brandName">Project Board Manager</Typography>
        <Link to="/register"><Button> Register </Button></Link>
        <Link to="/login"><Button> Login </Button></Link>
        <Link to="/"><Button> Logout </Button></Link>
      </Toolbar>
    </AppBar>
      <Switch>
        <Route exact path="/">
        </Route>
        <Route path="/board">
          <BoardPage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
