import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { ActiveTask } from "./ActiveTask.js";
import { AllTask } from "./AllTask.js";
import { CompltedTask } from "./CompltedTask.js";
import { AddTask } from "./AddTask.js";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { LoginPage } from "./Login.js";
import { ForgotPassword } from "./ForgotPassword.js";
import { ResetPassword } from "./ResetPassword.js";
import { SignUp } from "./Signup.js";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { useEffect } from "react";

function App() {
  const token = localStorage.getItem("token");

  const [task, setTask] = useState([]);
  //   {
  //     text: "Create theme",
  //     isCompleted: false,
  //   },
  //   {
  //     text: "complete the assignment",
  //     isCompleted: false,
  //   },
  //   {
  //     text: "Organize office main department",
  //     isCompleted: false,
  //   },
  //   {
  //     text: "Solve the errors",
  //     isCompleted: false,
  //   },
  // ]);
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    history.push("/login");
  };
  // const [taskCompleted, setTaskCompleted] = useState("");
  // const [taskActive, settaskActive] = useState("");
  const toggleTask = (index) => {

  //  fetch("http://localhost:4000/toggletask", {
    fetch("https://to-do-app-pradeep.herokuapp.com/toggletask", {
     method:"PUT",
     headers:{
       "x-auth-token":localStorage.getItem("token"),
       "username":localStorage.getItem("currentUser"),
       "index":index
     }
   })
   .then(data=>data.json())
   .then((data)=>{
    console.log([...data.task]);
    const newTask = [...data.task];
    setTask(newTask);
    allTask();
   })




    // const newTask = [...task];

    // if (newTask[index].isCompleted) {
    //   newTask[index].isCompleted = false;
    // } else {
    //   newTask[index].isCompleted = true;
    // }
    // setTask(newTask);
  };

  // const removeTaskCompleted = (index) => {
  //   const completedRemainingTask = [...taskCompleted];
  //   completedRemainingTask.splice(index, 1);
  //   setTaskCompleted(completedRemainingTask);
  //   const newTask = task.filter((task) => task.isCompleted === false);
  //   setTask([...completedRemainingTask, ...newTask]);
  // };

  // const removeTaskActive = (index) => {
  //   const activeRemainingTask = [...taskActive];
  //   activeRemainingTask.splice(index, 1);
  //   settaskActive(activeRemainingTask);
  //   const newTask = task.filter((task) => task.isCompleted === true);
  //   setTask([...newTask, ...activeRemainingTask]);
  // };
  const removeTaskAll = (index) => {
    // fetch("http://localhost:4000/allTask", {
      fetch("https://to-do-app-pradeep.herokuapp.com/allTask", {
      method:"PUT",
      headers:{
        "content-Type":"application/json",
        "x-auth-token":localStorage.getItem("token"),
        "username":localStorage.getItem("currentUser"),
          "index":index
      }
    })
    .then(data=>data.json())
    .then((data)=>{
      console.log([...data.task]);
      const remainingTask = [...data.task];
        setTask(remainingTask);

    })





    // const remainingTask = [...task];
    // remainingTask.splice(index, 1);
    // setTask(remainingTask);
  };

  // const activeTask = () => {
  //   const newTask = task.filter((task) => task.isCompleted === false);
  //   settaskActive(newTask);
  // };
  const allTask = () => {
   
      // fetch("http://localhost:4000/allTask",{
        fetch("https://to-do-app-pradeep.herokuapp.com/allTask",{
        method:"GET",
        headers:{
          "content-Type":"application/json",
          "x-auth-token":localStorage.getItem("token"),
          "username":localStorage.getItem("currentUser")
        }
      })
      .then(data=>data.json())
      .then((data)=>{
        console.log([...data.task])
        const newTask = [...data.task];
        setTask(newTask);
      })
    }

useEffect(()=>allTask,[])

  // const completedTask = () => {
  //   const newTask = task.filter((task) => task.isCompleted === true);
  //   setTaskCompleted(newTask);
  // };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/allTask">
          <Button
            onClick={logout}
            style={{ color: "blue", position: "absolute", right: "1vw", border:"none" }}
            variant="outlined"
            startIcon={<LogoutIcon />}
          ></Button>
          <br/>
          <h4>Hi, {localStorage.getItem("currentUser")}</h4>
          <h2>Todo App</h2>

          <AddTask
            setTask={setTask}
            task={task}
            allTask={allTask}
            // settaskActive={settaskActive}
          />
          <Link onClick={() => allTask()} className="link" to="/">
            All Task
          </Link>
          {/* <Link onClick={() => activeTask()} className="link" to="/activeTask">
            Active
          </Link>
          <Link
            onClick={() => completedTask()}
            className="link"
            to="/completedTask"
          >
            Completed
          </Link> */}
          <AllTask
            task={task}
            toggleTask={toggleTask}
            removeTaskAll={removeTaskAll}
          />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/login/forgot-password">
          <ForgotPassword />
        </Route>
        <Route exact path="/reset-password/:username/:token">
          {/* <Route exact path="/reset-password"> */}
          <ResetPassword />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        {/* <Route exact path="/completedTask">
          <Button
            onClick={logout}
            style={{ color: "blue", position: "absolute", right: "5vw" }}
            variant="outlined"
            startIcon={<LogoutIcon />}
          ></Button>
          <h4>Hi, {localStorage.getItem("currentUser")}</h4>
          <h2>Todo App</h2>
          <AddTask
            setTask={setTask}
            task={task}
            settaskActive={settaskActive}
          />
          <Link onClick={() => allTask()} className="link" to="/">
            All
          </Link>
          <Link onClick={() => activeTask()} className="link" to="/activeTask">
            Active
          </Link>
          <Link
            onClick={() => completedTask()}
            className="link"
            to="/completedTask"
          >
            Completed
          </Link>
          <CompltedTask
            taskCompleted={taskCompleted}
            toggleTask={toggleTask}
            removeTaskCompleted={removeTaskCompleted}
          />
        </Route>
        <Route exact path="/activeTask">
          <Button
            onClick={logout}
            style={{ color: "blue", position: "absolute", right: "5vw" }}
            variant="outlined"
            startIcon={<LogoutIcon />}
          ></Button>
          <h4>Hi, {localStorage.getItem("currentUser")}</h4>
          <h2>Todo App</h2>
          <AddTask
            setTask={setTask}
            task={task}
            settaskActive={settaskActive}
          />
          <Link onClick={() => allTask()} className="link" to="/">
            All
          </Link>
          <Link onClick={() => activeTask()} className="link" to="/activeTask">
            Active
          </Link>
          <Link
            onClick={() => completedTask()}
            className="link"
            to="/completedTask"
          >
            Completed
          </Link>
          <ActiveTask
            taskActive={taskActive}
            toggleTask={toggleTask}
            removeTaskActive={removeTaskActive}
          />
        </Route> */}
        
        <Route exact path="/">
          {token ? <Redirect to="/allTask" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
