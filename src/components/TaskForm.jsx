import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import './task.css';

export default function TaskForm({ onSaveTask }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSaveTask === 'function') {
      const newTask = {
        id: Math.floor(Math.random() * 10000),
        title: taskTitle,
        description: taskDescription,
        completed: false,
      };
      onSaveTask(newTask);
      setTaskTitle('');
      setTaskDescription('');
    } else {
      console.error('onSaveTask is not a function');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="task-form">
      <Form.Group controlId="title">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" className="btn-custom-gradient task-form-button">
        Add Task
      </Button>
    </Form>
  );
}

TaskForm.propTypes = {
  onSaveTask: PropTypes.func.isRequired,
};
