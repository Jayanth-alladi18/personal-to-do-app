// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let tasks = [];

// Welcome Route
app.get('/', (req, res) => {
  res.send('Welcome to your Personal To-Do API!');
});

// Create Task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  const task = {
    id: uuidv4(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date()
  };
  tasks.push(task);
  res.status(201).json(task);
});

// Get All Tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get Task by ID
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// Update Task
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  const { title, description, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// Delete Task
app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  const [deleted] = tasks.splice(index, 1);
  res.json(deleted);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Personal To-Do API running at http://localhost:${PORT}`);
});
