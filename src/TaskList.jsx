import React from 'react';
import { Task } from './components/Task';

//component to display the list of tasks
const TaskList = ({ tasks, setTasks }) => {
  //method to complete a task
  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  //method to delete a task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  //method to edit a task
  const handleEditTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isEditing: !task.isEditing };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  //method to save a task
  const handleSaveTask = (taskId, taskTitle, taskDescription) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isEditing: !task.isEditing,
          title: taskTitle,
          description: taskDescription,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          tasks={tasks}
          setTasks={setTasks}
          onCompleteTask={handleTaskCompletion}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onSaveTask={handleSaveTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
