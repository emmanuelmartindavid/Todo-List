import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TaskList from './TaskList';
import TaskForm from './components/TaskForm';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const handleSaveTask = (updatedTask) => {
    if (!tasks.find((task) => task.id === updatedTask.id)) {
      console.error(`Task with id ${updatedTask.id} not found in task list.`);
      return;
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return { ...task, title: updatedTask.title, description: updatedTask.description };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  };

  return (
    <Container className="border p-4">
      <div className="image-container">
        <Container className="mt-4">
          <Row className="justify-content-center">
            <Col>
              <h1 className="text-center">Task Manager</h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm={8} md={6}>
              <TaskForm onSaveTask={handleAddTask} />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm={8} md={6}>
              {tasks && tasks.length > 0 ? (
                <TaskList tasks={tasks} setTasks={setTasks} onSaveTask={handleSaveTask} />
              ) : (
                <p>No tasks found.</p>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
}


export default App;
