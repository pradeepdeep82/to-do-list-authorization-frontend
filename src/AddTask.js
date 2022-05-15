import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export function AddTask({ setTask, task, settaskActive, allTask }) {
  const [text, setText] = useState("");
 const history=useHistory();
  const handleSubmit = (event) => {
    if(!text){
      alert("Please Enter the Task")
    }else{
    event.preventDefault();
const data={
  task:text,
  username:localStorage.getItem("currentUser")
}
    // fetch("http://localhost:4000/allTask",{
      fetch("https://to-do-app-pradeep.herokuapp.com/allTask",{
       method:"POST",
       headers:{
         "content-Type":"application/json",
         "x-auth-token":localStorage.getItem("token")
       },
       body:JSON.stringify(data)
     })
     .then(data=>data.json())
     .then((data)=>{
       if(data.statusCode===200){
         console.log(text)
         alert(data.message);
         allTask();
         history.push("/allTask")
         setText("");
       }
     })
  
    }
    // if (text !== "") {
    //   setTask([...task, { text, isCompleted: false }]);
    //   settaskActive([...task, { text, isCompleted: false }]);
    //   setText("");
    // }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          value={text}
          onChange={(event) => setText(event.target.value)}
          label="New Task..."
          id="newTask" />
        <Button type="submit" variant="contained" endIcon={<AddIcon />}>
          Add Task
        </Button>
      </form>
    </div>
  );
}
