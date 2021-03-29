import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme)=>({
    boardLists:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        [theme.breakpoints.down("sm")]:{
            flexDirection: "column",
            alignItems:"center",
        }
      },
      team:{
        //   margin:"75px 50px 50px 50px",
          marginTop:"50px",
          display:"flex",
          justifyContent:"space-around",
          width:"100%",
          [theme.breakpoints.down("sm")]:{
              flexDirection:"column",
              alignItems:"center",
              margin:"0"
          },
        } 
}));

export default useStyle;