const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tasks = []; 

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { id: Date.now(), ...req.body };
  tasks.push(task);
  res.json(task);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.map(task => task.id == id ? { ...task, ...req.body } : task);
  res.json({ success: true });
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(task => task.id != req.params.id);
  res.json({ success: true });
});

app.listen(5000, () => console.log('Server running on port 5000'));
