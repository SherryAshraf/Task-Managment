import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";


const Home = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onTaskAdded={() => window.location.reload()} />
      <TaskList />
    </div>
  );
};

export default Home;
