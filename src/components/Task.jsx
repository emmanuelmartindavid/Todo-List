import React, { useState } from 'react';
import './task.css';

//component to display a task
const Task = (props) => {
  const { task, tasks, setTasks } = props;
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const { isEditing } = task;
  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  const handleEditTask = () => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, isEditing: !t.isEditing };
      }
      return t;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  const handleSaveTask = () => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          isEditing: !t.isEditing,
          title: taskTitle,
          description: taskDescription,
        };
      }
      return t;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };


  return (
    <div className="task">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <button className="task-btn" onClick={handleSaveTask}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button className="task-btn" onClick={handleEditTask}>Edit</button>
          <button className="task-btn" onClick={handleDeleteTask}>Delete</button>
        </div>
      )}
    </div>
  );
};


const CompletedTask = (props) => {
  const { task, tasks, setTasks } = props;
  const handleCheckboxChange = () => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          completed: !t.completed,
        };
      } else {
        return t;
      }
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleCheckboxChange}
      />
      <span>{task.description}</span>
    </div>
  );
};

export { Task, CompletedTask };
