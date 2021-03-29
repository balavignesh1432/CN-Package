import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme)=>({
    appbar:{
        flex:"1",
        [theme.breakpoints.down('sm')]:{
            flex:"1",
        }
    },
    brand:{
        textAlign:"left",
        [theme.breakpoints.down("sm")]:{
        }
    },
    drawer:{
        width:"150px",        
    },
    content:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-evenly",
        margin:"50px 0 0 0",
    },
    card:{
        width:"95%",
        height:"300px",
        margin:"auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    paper:{
        width:"50%",
        background:"#F0F0F0",
        marginTop:"50px",
        margin:"auto",
        [theme.breakpoints.down("sm")]:{
            width:"100%",
            marginTop:"0px",
        }
    },
    button:{
        width:"40%",
        marginTop:"20px",
        [theme.breakpoints.down("sm")]:{
            width:"90%"
        }
    }
}));

export default useStyle;   