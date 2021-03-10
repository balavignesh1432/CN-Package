import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import BoardPage from "./pages/BoardPage";
import Home from './pages/Home';
import { AppBar,Button,Toolbar, Typography } from "@material-ui/core";
function App() {
  return (
    <div className="App">
    <Router>
    <AppBar position="static" className="appbar">
      <Toolbar>
        <Typography variant="h4" className="brandName">Project Board Manager</Typography>
        <Link to="/"><Button> Logout </Button></Link>
      </Toolbar>
    </AppBar>
      <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/board">
          <BoardPage />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
