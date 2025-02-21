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
      <h3 className="h5 border-bottom pb-2 mt-4">Task List</h3>
      <div className="d-flex gap-2 mb-3">
        {/* Filters */}
        <input
          className="form-control" placeholder="Filter by Title"
          type="text"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />
      </div>


      <select className="form-select" value={filterCompleted} onChange={(e) => setFilterCompleted(e.target.value)}>
        <option value="">All</option>
        <option value="true">Completed</option>
        <option value="false">Not Completed</option>
      </select>
{/* <button className="btn btn-secondary" onClick={loadTasks}>Apply Filters</button> */}




      {tasks.length === 0 ? (
          <p className="text-muted text-center">No tasks found.</p>
        ) : (
        tasks.map((task) => (

          <div key={task._id} className="d-flex justify-content-between align-items-center border p-3 mb-2 bg-white rounded shadow-sm" style={{ marginLeft: "20px" }}>

            <TaskItem key={task._id} task={task} onUpdate={updateTask} onDelete={deleteTask} />

          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
