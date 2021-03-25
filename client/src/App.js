import React from "react";
import './App.css';

//Routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import Register from './pages/Register';
import BoardPage from "./pages/BoardPage";
import Login from './pages/Login';
import Create from "./pages/Create";
import Join from "./pages/Join";
import Wait from "./pages/Wait";
import Success from "./pages/Success";
import Home from "./pages/Home";
import { Typography } from "@material-ui/core";

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
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
    <Typography style={{marginTop:"50px"}}>© Copyright Bala Vignesh</Typography>
    </div>
  );
}

export default App;
