import React from "react";
import {Input,Button,Grid,InputAdornment,FormHelperText,TextField} from '@mui/material';
import {FormControl,InputLabel,Select,MenuItem,Box,Dialog, DialogTitle, DialogContent, DialogActions, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
interface Todo {
  title: string;
  description: string;
  category: string;
  status: string;
}
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
interface todoState {
    editIndex:number| null;
    expandIndex:number| null;
    delIndex: number|null;
}

interface DailogProps{
     todos: Todo[];
  formData: FormData;
  open: boolean;
  delopen: boolean;
  catopen: boolean;
  existingTodo: Todo | null;
  error: ErrorData;
  newCatError: string;
  todoState: todoState;
  category:string;
  categerioes:string[];
  // setFormData:React.Dispatch<React.SetStateAction<FormData>>
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setdelOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setcatOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTodoState:React.Dispatch<React.SetStateAction<todoState>>
    setIEdit:React.Dispatch<React.SetStateAction<boolean>>;
     setFormData: React.Dispatch<React.SetStateAction<FormData>>;
      setCategory:React.Dispatch<React.SetStateAction<string>>;
       setnewCatError :React.Dispatch<React.SetStateAction<string>>
        setFinalCat:React.Dispatch<React.SetStateAction<string>>;
       setCategerioes:React.Dispatch<React.SetStateAction<string[]>>;
    // handleAddCategorie: () => void;
      handleChangeCatogery: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Dailog:React.FC<DailogProps>=({todos,open,setOpen,delopen,setdelOpen,existingTodo,catopen,setcatOpen,error,newCatError, handleChangeCatogery,setTodoState,setIEdit,setFormData,setTodos,setCategory,todoState,  setnewCatError,setFinalCat,category,categerioes,setCategerioes,formData})=>{
  console.log(existingTodo)
  console.log(todoState?.delIndex)
  const handleClose = () => setOpen(false)
  const handledelClose = () => setdelOpen(false);
  const handlecatClose=()=>setcatOpen(false)
   const handlepopEdit = () => {
    const index = todos.findIndex((todo) => todo.title === existingTodo?.title);
    console.log("ccccccccccccccccccc")
    console.log(existingTodo)
    if (index !== -1) {
      setIEdit(true);
      setTodoState((prev) => ({
        ...prev,
        editIndex: index,
      }));
      setFormData({
  title: existingTodo?.title || "",
  description: existingTodo?.description || "",
  category: existingTodo?.category || "",
  status: existingTodo?.status || "pending",
});

    //   setFormData({
    //     title:existingTodo.title,
    //     description:existingTodo.description,
    //     category:existingTodo.category,
    //     status: existingTodo.status
    //   })
      setCategory(existingTodo?.category || "");
      setOpen(false);
    }
  };
   const handlePopdel = () => {
    console.log(todoState.delIndex);
    const newarr = todos.filter((val, ind) => ind != todoState?.delIndex);
    console.log(newarr);
    setTodos(newarr);
    localStorage.setItem("todos", JSON.stringify(newarr))
    setdelOpen(false);
  };
  const handleAddCategorie=()=>{
    console.log("kldsjfklsfjdkfljsdklfjfdks")
    console.log(category)
    const trimcate=category?.trim()
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
//    const handleChangeCatogery=(e)=>{
//     console.log("dkfjldfksf")
//      if(e.target.value.trim()!==""){
//       console.log("*****************8")
//       setnewCatError("")
//       // setError({ ...error, catError: "" })
//     }
//     console.log(e.target.type);
//     console.log(e.target.value)
//     setCategory(e.target.value)

//   }
    return(
        <div>
                  <Dialog open={open||delopen ||catopen} onClose={(event,reason)=>{
                    if(reason==="backdropClick" || reason=="escapeKeyDown"){
                      return;
                    }
                    handleClose()
                    handledelClose()
                    handlecatClose();
                  }}> 
                     {
                      open&&(
                        <>
                            <DialogTitle sx={{display:"flex",gap:"30px"}}>Todo Already Exists <CloseIcon onClick={handleClose}/></DialogTitle>
                              <DialogContent>
                                <Typography><strong>Title:</strong> {existingTodo?.title}</Typography>
                                <Typography><strong>Description:</strong> {existingTodo?.description}</Typography>
                                <Typography><strong>Category:</strong> {existingTodo?.category}</Typography>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handlepopEdit} variant="contained">Edit</Button>
                                <Button onClick={handleClose}>Close</Button>
                              </DialogActions>
                        </>
                      )
                     }
                     {
                       delopen&&(
                        <>
                            <DialogTitle sx={{display:"flex",gap:"30px"}}>Are you sure you want to delete this? <CloseIcon onClick={handledelClose}/> </DialogTitle>
                            <DialogActions>
                              <Button onClick={handlePopdel} variant="contained">Yes</Button>
                              <Button onClick={handledelClose} variant="contained">No</Button>
                            </DialogActions>
                        </>
                       )
                     }
                     {
                        catopen&&(
                          <>
                            <DialogTitle sx={{display:"flex",gap:"30px"}}>Are you sure you want to Add this? <CloseIcon onClick={handlecatClose}/> </DialogTitle>
                              <DialogContent>
                                    <Box sx={{height:"50px"}}>
                                            <TextField
                                              label="Enter Catogery"
                                              name="catogery"
                                              variant="outlined"
                                              // value={formData.title}
                                              onChange={handleChangeCatogery}
                                              // onKeyDown={handleEnter}
                                              sx={{
                                                width: 300,
                                                backgroundColor: "#fff",
                                                "& .MuiInputBase-root": { height: 50 },
                                              }}
                                            />
                                            <FormHelperText
                                              error
                                              style={{
                                                // visibility: error.titleError ? "visible" : "hidden",
                                                minHeight: "20px",
                                              }}
                                            >
                                              {newCatError|| ""} 
                                            </FormHelperText>
                                          </Box>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleAddCategorie} variant="contained">Yes</Button>
                                  <Button onClick={handlecatClose} variant="contained">No</Button>
                                </DialogActions>
                          </>
                        )
                     }

                  </Dialog>
        </div>
    )

}
export default Dailog;