import React, { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../api";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("");

  useEffect(() => {
    loadTasks();
  }, [filterTitle, filterCompleted]); // Reload when filters change

  const loadTasks = async () => {
    try {
      const filters = {};
      if (filterTitle) filters.title = filterTitle;
      if (filterCompleted !== "") filters.completed = filterCompleted; // "true" or "false"

      const response = await getTasks(filters);
      if (response.data && response.data.Status === "Succeeded" && Array.isArray(response.data.Response)) {
        setTasks(response.data.Response);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error getting tasks:", error);
      setTasks([]);
    }
    };


    const handleUpdate = async (id, updatedFields) => {
      try {
        await updateTask(id, updatedFields);
        loadTasks(); // Refresh tasks after update
      } catch (error) {
        console.error("Error updating task:", error);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await deleteTask(id);
        loadTasks(); // Refresh tasks after deletion
      } catch (error) {
        console.error(" Error deleting task:", error);
      }
    };

    
  return (
    <div>
      <h2>Task List</h2>

      {/* Filters */}
      <input
        type="text"
        placeholder="Filter by title"
        value={filterTitle}
        onChange={(e) => setFilterTitle(e.target.value)}
      />
      <select value={filterCompleted} onChange={(e) => setFilterCompleted(e.target.value)}>
        <option value="">All</option>
        <option value="true">Completed</option>
        <option value="false">Not Completed</option>
      </select>
      <button onClick={loadTasks}>Apply Filters</button>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (

          <div key={task._id} style={{ marginLeft: "20px" }}>

          <TaskItem key={task._id} task={task} onUpdate={updateTask} onDelete={deleteTask} />

          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
