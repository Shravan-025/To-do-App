import { useState } from "react";
import "./App.css";

function App() {
  // State for tasks
  const [tasks, setTask] = useState([
    {
      text: "Work",
      completed: false,
    },
  ]);

  // State for input
  const [input, setInput] = useState("");

  // State for error message
  const [error, setError] = useState("");

  // Add Task
  const addTask = () => {
    if (!input.trim()) {
      setError("Task cannot be empty");
      return;
    }

    const newTask = {
      text: input,
      completed: false,
    };

    setTask((prev) => [...prev, newTask]);
    setInput("");
    setError("");
  };

  // Toggle completed
  const tick = (index) => {
    setTask((prev) =>
      prev.map((task, i) =>
        i === index
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete Task
  const delTask = (index) => {
    setTask((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear All
  const clrAll = () => {
    setTask([]);
  };

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          className="task-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);

            if (error) {
              setError("");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />

        <button className="add-btn" onClick={addTask}>
          +
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {/* Task Section */}
      <div className="task-section">
        <div className="task-header">
          <h3>Tasks</h3>

          <button className="clear-btn" onClick={clrAll}>
            Clear All
          </button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-text">No tasks available.</p>
          ) : (
            tasks.map((task, index) => (
              <div className="task-item" key={index}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => tick(index)}
                />

                <span
                  className={
                    task.completed
                      ? "task-text completed"
                      : "task-text"
                  }
                >
                  {task.text}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => delTask(index)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;