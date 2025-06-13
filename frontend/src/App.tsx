

import './App.css'



import { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000' });



function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleSubmit = async () => {
    if (editId) {
      await api.put(`/tasks/${editId}`, form);
    } else {
      await api.post('/tasks', form);
    }
    setForm({ name: '', description: '' });
    setEditId(null);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setForm({ name: task.name, description: task.description });
    setEditId(task.id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Task Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        {editId ? 'Update Task' : 'Add Task'}
      </button>

      <h2 className="text-xl font-bold mt-6">Task List</h2>
      {tasks.map(task => (
        <div key={task.id} className="mt-4 p-3 border rounded flex justify-between items-center">
          <div>
            <p className="font-semibold">{task.name}</p>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleEdit(task)} className="border px-3 py-1 rounded">Edit</button>
            <button onClick={() => handleDelete(task.id)} className="border px-3 py-1 rounded text-red-500 border-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default App
