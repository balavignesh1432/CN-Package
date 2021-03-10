import { Button, TextField,Paper} from "@material-ui/core";
import { Link } from "react-router-dom";
function Home(){
    return (
    <Paper elevation={10} className="loginPaper">
    <div className="login">
        <TextField label="Name" className="loginInput"/>
        <TextField label="Room" className="loginInput"/>
        <Link to="/board" style={{textDecoration:'none'}}><Button variant="contained" color="primary">Login</Button></Link>
    </div>
    </Paper>
    );
}

export default Home;