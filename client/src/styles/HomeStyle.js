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
    main:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        marginTop:"50px",
        marginBottom:'150px',
        [theme.breakpoints.down("sm")]:{
            flexDirection:"column",
            alignItems:"center",
            marginTop:"50px",
            marginBottom:"50px",
        }
    },
    secondary:{
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        marginBottom:'50px',
        [theme.breakpoints.down("sm")]:{
            flexDirection:"column-reverse",
            alignItems:"center",
            marginBottom:"30x",
        }
    },
    image:{
        width:"40%",
        marginTop:"30px",
        [theme.breakpoints.down("sm")]:{
            width:"90%",
            height:"80%",
        }
    },
    text:{
        width:"50%",
        [theme.breakpoints.down("sm")]:{
            width:"100%",
        }
    },
    button:{
        width:"40%",
        marginTop:"50px",
        marginBottom:"50px",
        [theme.breakpoints.down("sm")]:{
            width:"40%",
        }   
    },
    menu:{
        width:"50%",
        marginTop:"150px",
        margin:"auto",
        [theme.breakpoints.down("sm")]:{
            width:"100%",
            marginTop:"50px",
        }
    }
}));

export default useStyle;   