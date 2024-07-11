import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Task from "./components/Task";

const PORT = 5000;
const url = `http://localhost:${PORT}`;

function App() {
  // return (
  //   <div className="App">
  //     <div className="App-header">
  //       <h3>Todo List App</h3>
  //     </div>
  //   </div>
  // );
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(url);
    setTasks(response.data);
  };

  const addTask = async () => {
    if (newTaskText) {
      const response = await axios.post(url, {
        text: newTaskText,
      });
      setTasks([...tasks, response.data]);
      setNewTaskText("");
    }
  };

  const updateTask = async (id, updatedTask) => {
    const response = await axios.put(`${url}/${id}`, updatedTask);
    setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${url}/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteAllTasks = async () => {
    await axios.delete(url);
    setTasks([]);
  };

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };

  const saveEditing = async (id) => {
    await updateTask(id, { text: editingTaskText });
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  return (
    <div className="App">
      <div className="">
        <h2 className="pt-5 pb-3">Todo List App</h2>
        <Header
          newTaskText={newTaskText}
          setNewTaskText={setNewTaskText}
          addTask={addTask}
          deleteAllTasks={deleteAllTasks}
        />
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="d-flex justify-content-center">
              <Task
                updateTask={updateTask}
                setEditingTaskText={setEditingTaskText}
                editingTaskText={editingTaskText}
                saveEditing={saveEditing}
                setEditingTaskId={setEditingTaskId}
                editingTaskId={editingTaskId}
                startEditing={startEditing}
                deleteTask={deleteTask}
                task={task}
              />
            </li>
          ))}
        </ul>
        <div className="my-5">
          <button
            title="Double click to remove all tasks"
            className="btn btn-danger"
            onDoubleClick={deleteAllTasks}
          >
            (Double Click) To Delete All Tasks
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
