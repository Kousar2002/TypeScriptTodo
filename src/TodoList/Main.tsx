import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Grid,
  InputAdornment,
  FormHelperText,
  TextField,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import {
  Title as TitleIcon,
  Description as DescriptionIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Add,
} from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import Todos from "./Todos";
import Items from "./Items";
import Status from "./Status";
import MyDialog from "./Dailog";
import Piechart from "./Piechart";
interface Todo {
  title: string;
  description: string;
  category: string;
  status: string;
}

interface IState{
    formData:{
        title:string;
        description:string;
        category:string;
        status:string;
    };
    ErrorData:{
        titleError:string;
        descError:string;
        catError:string;
    };
    categories:string[];
    TodoState:{
      editIndex: number|null;
      expandIndex:number|null;
      delIndex:number | null;
    }
  }
const Main:React.FC=()=>{
  const [formData, setFormData] = useState<IState["formData"]>({
    title: "",
    description: "",
    category:"",
    status:""
  });
   const [error, setError] = useState<IState["ErrorData"]>({
    titleError: "",
    descError: "",
    catError:"",
  });
  const [categerioes,setCategerioes]=useState<IState["categories"]>([
    "Personal",
  "Professional",
  "Entertainment",
  "Add"
  ]);
    const [todoState, setTodoState] = useState<IState["TodoState"]>({
    editIndex: null,
    expandIndex: null,
    delIndex: null,
  });
  const [todos, setTodos] = useState<Todo[]>([]);
    const [status,setStatus]=useState<string>("");

  const [Edit, setIEdit] = useState<boolean>(false);
  const [category,setCategory]=useState<string>("");
  const [catopen,setcatOpen]=useState<boolean>(false);
   const [finalcat,setFinalCat]=useState<string>("");
  const [newCatError,setnewCatError]=useState<string>("");
   const [isHovered, setIsHovered] = useState<number | null>(null);
  const [existingTodo, setExistingTodo] = useState <Todo | null>(null);
  const [open, setOpen] = useState<boolean>(false);
   const [delopen, setdelOpen] = useState<boolean>(false);
   useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedCategories=localStorage.getItem("categories");
    console.log(savedTodos);
    if (savedTodos) {
      const newarr=JSON.parse(savedTodos)
      setTodos(newarr)
    }
    if(savedCategories){
      
      setCategerioes(JSON.parse(savedCategories))
    }
  }, []);
  console.log(todos);
    const handleAddCategorie=()=>{
    console.log(category)
    const trimcate=category.trim()
    const duplicatecategory=categerioes?.find((val,ind)=>val.toLowerCase()==trimcate.toLowerCase())
    console.log(duplicatecategory)
    if(!trimcate){
      // setError((prev)=>({...prev,catError:"category cannot be empty"}))
      setnewCatError("category cannot be empty")
      return;
    }
    if(duplicatecategory){
      console.log("****")
      setnewCatError("Category already exists")
    // setError((prev) => ({ ...prev, catError: "Category already exists" }));
    return;
    }
    console.log(category)
    setFinalCat(category);
    // const filterarr=categerioes.filter((val,ind)=>val!=="Add");
    setCategerioes([...categerioes,category])
    const newcatearr=[...categerioes,category]
    console.log(newcatearr);
     localStorage.setItem("categrioes", JSON.stringify(newcatearr))
    setFormData({ ...formData, category:category });
    setcatOpen(false)
    // setCategerioes(category);
  }
  const handleChangeCatogery=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    console.log("dkfjldfksf")
     if(e.target.value.trim()!==""){
      console.log("*****************8")
      setnewCatError("")
      setError({ ...error, catError: "" })
    }
    console.log(e.target.type);
    console.log(e.target.value)
    setCategory(e.target.value)

  }



  // const handleChange = (statusInd:number, Val:string) => {
  //   console.log(Val)
  // };
  //  const handleAdd = () => {
  //   console.log(formData);
  
   
  // }
console.log(todoState);
    return (
      <div>
        <Grid container spacing={2}  >
          {/* item size={{ xs: 12,sm:6}} */}
          {/* <Grid item xs={12} sm={6}> */}
          <Grid size={{xs:12,md:4}}>
            <Todos
              formData={formData}
              setFormData={setFormData}
              categerioes={categerioes}
              setCategerioes={setCategerioes}
              category={category}
              setCategory={setCategory}
              catopen={catopen}
              setcatOpen={setcatOpen}
              finalcat={finalcat}
              setFinalCat={setFinalCat}
              newCatError={newCatError}
              setnewCatError={setnewCatError}
              error={error}
              setError={setError}
              todos={todos}
              setTodos={setTodos}
              existingTodo={existingTodo}
              setExistingTodo={setExistingTodo}
              Edit={Edit}
              setIEdit={setIEdit}
              open={open}
              setOpen={setOpen}
              todoState={todoState}
              setTodoState={setTodoState}
            />
          </Grid>
          <Grid size={{xs:12,md:4}}>
            <Status todos={todos} />
          </Grid>
          <Grid size={{xs:12,md:4}}>
            <Piechart todos={todos} />
          </Grid>
        </Grid>
        <Items
          todos={todos}
          formData={formData}
          status={status}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          setTodos={setTodos}
          // handleChange={handleChange}
          todoState={todoState}
          setTodoState={setTodoState}
          setIEdit={setIEdit}
          setFormData={setFormData}
          setCategory={setCategory}
          setdelOpen={setdelOpen}
          setcatOpen={setcatOpen}
          // handleExpand={handleExpand}
          // handleEdit={handleEdit}
          // handleDelete={handleDelete}
          // handleCatogire={handleCatogire}
        />
        <MyDialog
          todos={todos}
          open={open}
          setOpen={setOpen}
          delopen={delopen}
          setdelOpen={setdelOpen}
          existingTodo={existingTodo}
          catopen={catopen}
          setcatOpen={setcatOpen}
          error={error}
          handleChangeCatogery={handleChangeCatogery}
          // handleAddCategorie={handleAddCategorie}
          newCatError={newCatError}
          setIEdit={setIEdit}
          todoState={todoState}
          setTodoState={setTodoState}
          setFormData={setFormData}
          setTodos={setTodos}
          category={category}
          setCategory={setCategory}
          categerioes={categerioes}
          setnewCatError={setnewCatError}
          setFinalCat={setFinalCat}
          setCategerioes={setCategerioes}
          formData={formData}
        />
      </div>
    );

}
export default Main;

// formData, error, handleChange, handleAdd, Edit,handleEnter ,categerioes,handleCatogire,category,handleChangeCatogery