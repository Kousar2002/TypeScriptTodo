import React from "react";
import {
  Input,
  Button,
  Grid,
  InputAdornment,
  FormHelperText,
  TextField,
  Box,
} from "@mui/material";
interface Todo {
  title: string;
  description: string;
  category: string;
  status: string;
}
interface StatusProps {
  todos: Todo[];
}
const Status:React.FC<StatusProps>  = ({ todos }) => {
  console.log(todos);
  return (
    <Grid size={{ xs: 12 ,sm:6 }}>
      <Box sx={{ ...styles.StatusBox }}>
        <p>
          Completed:{" "}
          {todos?.filter((task) => task.status === "Completed").length}
        </p>
        <p>
          In Progress:{" "}
          {todos?.filter((task) => task.status === "Progress").length}
        </p>
        <p>To Do: {todos.filter((task) => task.status === "Todo").length}</p>
      </Box>
    </Grid>
  );
};
const styles={
    StatusBox:{
        display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          width: 400,
          height: 300,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          backgroundColor: "#E6D8C3",
    }
}
export default Status;
