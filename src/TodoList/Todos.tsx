import React,{useEffect} from "react";
import {
    FormControl,
    Select,
    MenuItem,
  Button,
  Grid,
  InputAdornment,
  FormHelperText,
  TextField,
  Box,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { Title as TitleIcon, Add as AddIcon } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SelectChangeEvent } from "@mui/material";
interface FormData{
        title:string;
        description:string;
        category:string;
        status:string;
}
interface ErrorData{
  titleError:string;
  descError:string;
  catError:string
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


interface TodoProps{
    formData:FormData;
    setFormData:React.Dispatch<React.SetStateAction<FormData>>;
    categerioes:string[];
    setCategerioes:React.Dispatch<React.SetStateAction<string[]>>;
    category:string;
    setCategory:React.Dispatch<React.SetStateAction<string>>;
    catopen:boolean;
    setcatOpen:React.Dispatch<React.SetStateAction<boolean>>;
    finalcat:string;
    setFinalCat:React.Dispatch<React.SetStateAction<string>>;
    newCatError:string;
    setnewCatError:React.Dispatch<React.SetStateAction<string>>;
    error:ErrorData;
    setError: React.Dispatch<React.SetStateAction<ErrorData>>;
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
    existingTodo:Todo | null;
    setExistingTodo:React.Dispatch<React.SetStateAction<Todo | null>>;
    Edit: boolean;
    setIEdit:React.Dispatch<React.SetStateAction<boolean>>;
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    todoState:todoState;
    setTodoState:React.Dispatch<React.SetStateAction<todoState>>
}
const Todos:React.FC<TodoProps>=({formData,setFormData,categerioes,setCategerioes,category,setCategory,catopen,setcatOpen,finalcat,setFinalCat,newCatError,setnewCatError, error,setError,todos,setTodos,existingTodo,setExistingTodo,Edit,setIEdit,open,setOpen,todoState, setTodoState})=>{
     useEffect(() => {
      const savedCategories=localStorage.getItem("categrioes");
      // console.log(JSON.parse(savedCategories));
      if(savedCategories){
        console.log(JSON.parse(savedCategories));
        setCategerioes(JSON.parse(savedCategories))
      }
    }, []);
  console.log(categerioes);
   const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log("hello")
    const {name,value}=e.target;
    console.log(value);
    console.log(value);
    console.log(name);
    setFormData({...formData,[name]:value})
    if(name==="description"){
      setError({...error, descError:""})
    }
    if(name==="title"){
       setError({...error, titleError:""})
    }
    // setFormData(value);
    
    // const newArr = todos.map((todo, ind) =>
    //   ind === statusInd ? { ...todo, status: Val } : todo
    // );
    // console.log(Val);
    // console.log("helllllllllllll")
    // console.log(newArr);
    // // setStatus(Val);
    // setTodos(newArr);
    // // setFormData({...formData,status:e.target.value})
    // localStorage.setItem("todos", JSON.stringify(newArr));
    // console.log(todos);
  };
  const handleChangeCatogery=(e: SelectChangeEvent<string>)=>{
    console.log("dkfjldfksf")
    const value=e.target.value || "";
     if(value.trim()!==""){
      console.log("*****************8")
      setnewCatError("")
      setError({ ...error, catError: "" })
    }
    // console.log(e.target.type);
    console.log(value)
    setCategory(value)

  }
  const handleCatogire=()=>{
    console.log("hello")
    console.log(catopen)
    console.log(category)
    setcatOpen(true)
  }
  const handleAdd = () => {
    console.log(formData);
    let hasError = false;
    let newError = { titleError: "", descError: "",catError:""};
    if (!formData.title) {
      console.log("hello");
      newError.titleError = "Title is required";
      hasError = true;
    }

    if (!formData.description) {
      newError.descError = "Description is required";
      hasError = true;
    }
    if(!category){
      newError.catError="select a category"
      hasError=true;
    }
    if (hasError) {
      setError(newError);
      return;
    }
    console.log(finalcat);
    const obj = {
      title: formData.title,
      description: formData.description,
    status: formData.status || "Todo",


      category:finalcat?finalcat:category
    };
    
    console.log(obj);
    console.log(todos);
    let updatedarr;
    const newtodo = todos[todos.length - 1]?.title;
    console.log(todos);
    console.log(newtodo);
    const duplicates = todos.find((todo) => todo.title === formData.title);
    setExistingTodo(duplicates||null);
    console.log(duplicates);
    if (Edit) {
      console.log(todoState.editIndex);
      updatedarr = [...todos];
      console.log(updatedarr);
      console.log(updatedarr);
      if (todoState.editIndex !== null) {
          updatedarr[todoState.editIndex] = obj;
      }
      // updatedarr[todoState.editIndex] = obj;
      setTodos(updatedarr);
      localStorage.setItem("todos", JSON.stringify(updatedarr))
      console.log(updatedarr);
      console.log(todos);
      setIEdit(false);
    } else if (duplicates) {
      console.log(duplicates);
      console.log("hello");
      // setExistingTodo(duplicates);
      setOpen(true);
      return;
    } else {
      const updatedTodos=[...todos,obj];
      setTodos(updatedTodos);
      localStorage.setItem("todos",JSON.stringify(updatedTodos))
      // setNewTodo(obj);
      // setTodos((prevTodos) => [...prevTodos, obj]);
      // setTodos([...todos,newtodo]);
      // const existingtodos = JSON.parse(localStorage.getItem("todos")) || [];
      // localStorage.setItem("todos", JSON.stringify([...existingtodos, newTodo]));

    }
    console.log(todos);
    console.log(existingTodo);
    setFormData({ title: "", description: "", category: "", status: "Todo" });

    // setFormData({ title: "", description: "" });
    setError({ titleError: "", descError: "" ,catError:""});
    setCategory("")
  };
  
  const addarr=categerioes.filter((val,ind)=>val==="Add");
  console.log(addarr)
    return(
       <Box sx={{...styles.TodoBox}}>
      <Box sx={{...styles.InputBox}}>
        <TextField
          label="Enter Title"
          name="title"
          variant="outlined"
          value={formData.title}
        onChange={handleChange}
        //   onKeyDown={handleEnter}
          sx={{
            width: 300,
            backgroundColor: "#fff",
            "& .MuiInputBase-root": { height: 50 },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <TitleIcon />
              </InputAdornment>
            ),
          }}
        />
         <FormHelperText
          error
          style={{
            visibility: error.titleError ? "visible" : "hidden",
            minHeight: "20px",
          }}
        >
          {error.titleError || ""}
        </FormHelperText>

      </Box>

      {/* Description Input */}
      <Box sx={{...styles.InputBox}}>
        <Textarea
          placeholder="Enter Description"
          name="description"
          minRows={3}
          value={formData.description}
          onChange={handleChange}
        //   onKeyDown={handleEnter}
          sx={{
            width: 300,
            height: 80,
            overflowY: "auto",
            overflowX:"hidden",
            resize: "none",
          }}
        />
          <FormHelperText
          error
          style={{
            visibility: error.descError ? "visible" : "hidden",
            minHeight: "20px",
          }}
        >
          {error.descError || ""}
        </FormHelperText>
      </Box>
         <Box sx={{}}>
<FormControl
  variant="standard"
  sx={{
    minWidth: 200,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  }}
>
  <Select
    displayEmpty
    value={category}
    onChange={handleChangeCatogery}
      IconComponent={KeyboardArrowDownIcon}
    // label="Select Category"
          // name="Category"
          variant="outlined"
    sx={{
      flex: 1,
      fontSize: "0.9rem",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      paddingX: 1,
      "& .MuiSelect-select": {
        py: 1,
      },
    }}
  >
    <MenuItem disabled value="">
      <em>Select Category</em>
    </MenuItem>
   {categerioes?.map((val, i) =>
      val!=="Add"&&(<MenuItem key={i} value={val}>
          {val}
        </MenuItem>)
    )}
         <MenuItem>
             <Button
                variant="contained"
                 color="primary"
                 sx={{
                  height: 36,
                  borderRadius: "8px",
                   textTransform: "none",
                   fontSize: "0.85rem",
                   marginLeft:8
                 }}
                 onClick={handleCatogire}
               >
                 {addarr[0]}
             </Button>
         </MenuItem>
    
  </Select>
</FormControl>
 <FormHelperText
          error
          style={{
            visibility: error.catError ? "visible" : "hidden",
            minHeight: "20px",
          }}
        >
          {error.catError || ""}
        </FormHelperText>

          </Box>
      <Button
        variant="contained"
        // startIcon={<AddIcon />}
        sx={{ height: "30px", width: "100px", marginTop: "15px"}}
         onClick={handleAdd}
      > Add
      </Button>

    </Box>
  );
};
const styles = {
    TodoBox:{
       display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        width: 400,
        height: 300,
       
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#E6D8C3",
        
    },
    InputBox:{
       display: "flex", flexDirection: "column"
    }

    
}
export default Todos;