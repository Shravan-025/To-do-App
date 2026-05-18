import { useState } from 'react';
import './App.css';

function App() {
  
  //Creating state for add element
  const [tasks,settask] = useState([
    {text:"Work",completed: false}
  ]);
  const [error, seterror] = useState("");

  //Function for add task
  let addtask = function(){
    let data = document.querySelector(".task-input").value;
    if(!data.trim()){
      seterror("Task cannot be empty");
      return;  
    }
    let obj = {
      text:data,completed:false
    };
    document.querySelector(".task-input").value = "";
    settask(prev => [...prev,obj]);
    seterror("");
  }

  //Creating function for checking list
  let tick = function(i){
    tasks[i].completed = !tasks[i].completed;
    settask(prev => [...prev])
  }

  //Creating function to delete element
  let del_task = function(i){
    settask(prev =>
    prev.filter((task, index) => index !== i)
  );
  }

  //Creating function to clear all element
  let clr_all = function(){
    settask(prev => [])
  }
  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>

      {/* Input Section */}
      <div className="input-section">
        <input 
          type="text" 
          placeholder="Enter a task..." 
          className="task-input"
        />
        <button className="add-btn" onClick={addtask}>+</button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {/* Task Section */}
      <div className="task-section">
        <div className="task-header">
          <h3>Tasks</h3>
          <button className="clear-btn" onClick={clr_all}>Clear All</button>
        </div>

        <div className="task-list">
          {/* Sample task by array */}
          {
            tasks.map((task,index)=>(
              <div className="task-item" key={index}>
                <input type="checkbox" onClick={()=>tick(index)} />
                <span className={task.completed ? "task-text completed" : "task-text"}>{task.text}</span>

                {/* ❌ Delete Button */}
                <button className="delete-btn" onClick={()=>del_task(index)}>✕</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;