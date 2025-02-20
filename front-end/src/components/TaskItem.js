import React, { useState } from "react";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(() => task.title); // ✅ Use function for initial state
  const [description, setDescription] = useState(() => task.description);

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title cannot be empty!");
      return;
    }

    const updatedTask = {
      title: title.trim() || task.title, // Send new title if changed, otherwise old
      description: description.trim() || task.description, // Send new description if changed, otherwise old
      completed: task.completed, 
    };

    if (typeof onUpdate === "function") {
      onUpdate(task._id, updatedTask);
    } else {
      console.error("onUpdate is not a function");
    }

    setIsEditing(false);
  };

  const handleDelete = () => {
    if (typeof onDelete === "function") {
      onDelete(task._id);
    } else {
      console.error("onDelete is not a function");
    }
  };

  return (
    <div className="task">
      {isEditing ? (
        <>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>{task.description || "No description"}</p>
          <p>Status: {task.completed ? "Completed" : "Not Completed"}</p>
          <button onClick={() => onUpdate(task._id, { completed: !task.completed })}>
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
