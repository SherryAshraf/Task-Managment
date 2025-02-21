import React, { useState } from "react";
import { addTask } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";



const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addTask(title, description);
    setTitle("");
    setDescription("");
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit}>

      <h3 className="h5 border-bottom pb-2">Add New Task</h3>
      <div className="input-group mb-3">
        <input className="form-control" type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input className="form-control" type="text" placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button  className="btn btn-primary" type="submit">Add Task</button>
      </div>

    </form>

  );
};

export default TaskForm;
