import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import BoardPage from "./pages/BoardPage";
import { AppBar,Button,Toolbar, Typography } from "@material-ui/core";
function App() {
  return (
    <div>
    <AppBar position="static" className="appbar">
      <Toolbar>
        <Typography variant="h4" className="brandName">Project Board Manager</Typography>
        <Button> Logout </Button>
      </Toolbar>
    </AppBar>
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <h1>React App</h1>
          </div>
        </Route>
        <Route path="/list">
          <BoardPage />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
