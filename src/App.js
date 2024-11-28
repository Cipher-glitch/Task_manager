import React, { useState } from "react";

function App() {
  // App-wide styles
  const appStyle = {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "2rem",
  };

  const headerStyle = {
    backgroundColor: "#4CAF50",
    padding: "1rem",
    color: "white",
  };

  const dashboardStyle = {
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "1rem auto",
    maxWidth: "600px",
  };

  const taskListStyle = {
    listStyle: "none",
    padding: 0,
  };

  const taskItemStyle = {
    backgroundColor: "#fff",
    padding: "0.5rem 1rem",
    margin: "0.5rem 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const taskButtonStyle = {
    marginLeft: "0.5rem",
    padding: "0.25rem 0.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const addTaskStyle = {
    margin: "1rem 0",
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
  };

  // State for managing tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Handle adding a new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask(""); // Clear input field
    }
  };

  // Handle toggling task completion
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle deleting a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={appStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <h1>Manager App</h1>
        <p>Your personal assistant for managing tasks and resources.</p>
      </header>

      {/* Dashboard */}
      <main style={dashboardStyle}>
        <h2>Dashboard</h2>
        <p>Manage your tasks and track your progress below:</p>

        {/* Add Task Input */}
        <div style={addTaskStyle}>
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ddd",
              flex: "1",
            }}
          />
          <button
            onClick={addTask}
            style={{
              ...taskButtonStyle,
              backgroundColor: "#4CAF50",
              color: "white",
            }}
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        {tasks.length > 0 ? (
          <ul style={taskListStyle}>
            {tasks.map((task) => (
              <li key={task.id} style={taskItemStyle}>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    flex: "1",
                  }}
                >
                  {task.text}
                </span>
                <div>
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    style={{
                      ...taskButtonStyle,
                      backgroundColor: task.completed ? "#ff9800" : "#4CAF50",
                      color: "white",
                    }}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      ...taskButtonStyle,
                      backgroundColor: "#f44336",
                      color: "white",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks added yet. Start by adding a task above!</p>
        )}
      </main>
    </div>
  );
}

export default App;
