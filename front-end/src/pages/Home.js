import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";


const Home = () => {
  return (
    <div className="container mt-5 p-4 bg-light rounded shadow">
    <h2 className="text-center mb-4">Task Manager</h2>
      <TaskForm onTaskAdded={() => window.location.reload()} />
      <TaskList />
    </div>
  );
};

export default Home;
