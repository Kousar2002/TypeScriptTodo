import React from "react";
import {  Grid,Box, Button, FormControl, Select, MenuItem } from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Add,
} from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
interface FormData{
        title:string;
        description:string;
        category:string;
        status:string;
}

interface Todo {
  title: string;
  description: string;
  category: string;
  status: string;
}
interface todoState {
    editIndex:number| null;
    expandIndex:number| null;
    delIndex: number|null;
}


interface ItemProps{
    todos:Todo[];
    formData:FormData;
    status:string;
    isHovered:number|null;
    setIsHovered: React.Dispatch<React.SetStateAction<number | null>>;
     todoState:todoState;
     setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
      setTodoState:React.Dispatch<React.SetStateAction<todoState>>
      setIEdit:React.Dispatch<React.SetStateAction<boolean>>;
      setFormData: React.Dispatch<React.SetStateAction<FormData>>;
      setCategory:React.Dispatch<React.SetStateAction<string>>;
      setdelOpen:React.Dispatch<React.SetStateAction<boolean>>;
      setcatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Items:React.FC<ItemProps> = ({
  todos,
  formData,
  status,
  isHovered,
  setIsHovered,
  todoState,
  setTodos,
  setTodoState,
  setIEdit,
  setdelOpen,
  setcatOpen,
   setCategory,
   setFormData

  
}) => {
  console.log(todos);
  console.log(status);
  todos.map((val,ind)=>{
    console.log(val);
  })
  console.log(formData);
  const handleChange = (statusInd:number, Val:string) => {
    const newArr = todos.map((todo, ind) =>
      ind === statusInd ? { ...todo, status: Val } : todo
    );
    console.log(Val);
    console.log("helllllllllllll")
    console.log(newArr);
    // setStatus(Val);
    setTodos(newArr);
    // setFormData({...formData,status:e.target.value})
    localStorage.setItem("todos", JSON.stringify(newArr));
    console.log(todos);
  };
   const handleExpand = (expindex:number) => {
        setTodoState((prev) => ({
      ...prev,
      expandIndex: prev.expandIndex === expindex ? null : expindex,
    }));

    // setTodoState(todoState?.expandIndex === expindex ? null : expindex);
  };
  const handleEdit = (editindex:number) => {
    setIEdit(true);
    console.log(formData);
    setTodoState((prev) => ({
      ...prev,
      editIndex: editindex,
    }));
    console.log(todos[editindex].category);
    const todoToEdit = todos[editindex];
    setFormData({
      title: todoToEdit.title,
      description: todoToEdit.description,
      category: todoToEdit.category,
      status: todoToEdit.status,
    });

    setCategory(todos[editindex].category)
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos))
  };
  const handleDelete = (deleteindex:number) => {
    console.log("dddkkkkkkkkkkkkkkkkkkkk")
    console.log(deleteindex);
    console.log("hello");
     console.log(todos);
    if (deleteindex !== undefined) {
      setdelOpen(true);
      console.log(todos);
      setTodoState((prev) => ({
        ...prev,
        delIndex: deleteindex,
      }));
    }
  };
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={5}
      marginTop={8}
      justifyContent="center"
    >
      {/* size={{ xs: 12, md: 6, lg: 4 }} */}
      {/* size={{ xs: 12, sm: 6, md: 4 }} */}
      {todos.map((val, ind) => (
        <Grid size={{xs:12,sm:6,md:4,lg:3}} key={ind}>
          <Box
            onMouseEnter={() => setIsHovered(ind)}
            onMouseLeave={() => setIsHovered(null)}
            sx={getItemBoxStyles(val.status)}
          >
            <Box sx={{ ...styles.DropDownBox }}>
              <Box component={"span"}>Status:</Box>
              <FormControl variant="standard">
                <Select
                  value={val.status}
                  IconComponent={KeyboardArrowDownIcon}
                  sx={{
                    border: "none",
                    "&:before,&:after": {
                      border: "none",
                    },
                  }}
                  onChange={(e) => handleChange(ind, e.target.value)}
                >
                  <MenuItem value="Todo">Todo</MenuItem>
                  <MenuItem value="Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <p style={getCatBoxStyles(val.status)}>
                <strong>Category</strong>
                <Box component={"span"} sx={{ ...styles.TitleAndDes }}>
                  {val.category}
                </Box>
              </p>
              <p style={getTitleBoxStyles(val.status)}>
                <strong>Title:</strong>
                <Box component={"span"} sx={{ ...styles.TitleAndDes }}>
                  {val.title}
                </Box>
              </p>
              {/* style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}} */}
              <p
                style={getDescBoxStyles(val.status, todoState.expandIndex, ind)}
                onClick={() => handleExpand(ind)}
              >
                <strong>Description:</strong>
                <Box component={"span"} sx={{ ...styles.TitleAndDes }}>
                  {val.description}
                </Box>
              </p>
            </Box>
            {isHovered === ind && (
              <Box sx={getIconsBoxStyles(isHovered, ind)}>
                <Button onClick={() => handleEdit(ind)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => handleDelete(ind)}>
                  <DeleteIcon color="error" />
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
const styles = {
    DropDownBox:{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
    },
    TitleAndDes:{
        color: "white"
    }
}
const getItemBoxStyles=(status:string)=>({
  border: "1px solid black",
  backgroundColor:
    status === "Todo"
      ? "#FFA4A4"
      : status === "Progress"
      ? "#FFBDBD"
      : status === "Completed"
      ? "#BADFDB"
      : "#fff",
  borderRadius: "10px",
  p: 2,
  width:"250px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  overflow: "hidden",
  boxSizing: "border-box",
  transition: "all 0.3s ease",

})
const getIconsBoxStyles = (isHovered:number|null, ind:number) => ({
  display: "flex",
  opacity: isHovered === ind ? 0.4 : 1,
  justifyContent: "center",
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-60%)",
});
const getCatBoxStyles = (status:string) => ({
  textDecoration: status === "Completed" ? "line-through" : "none",
});

const getTitleBoxStyles = (status:string) => ({
  textDecoration: status === "Completed" ? "line-through" : "none",
});

const getDescBoxStyles = (status:string, expandIndex:number|null, ind:number) => ({
  cursor: "pointer",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical" as const,
  WebkitLineClamp: expandIndex === ind ? "unset" : 2,
  textDecoration: status === "Completed" ? "line-through" : "none",
});

export default Items;
