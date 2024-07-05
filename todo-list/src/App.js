import { useState } from "react";
import "./App.css";

function TasksPanel({ tasks }) {
  return (
    <div className="taskspanel">
      {tasks.map((task) => (
        <Tasks key={task.id} text={task.text} />
      ))}
    </div>
  );
}

function Tasks({ text,ondelete }) {
  const [hover,sethover] = useState(true)
  const [complete,setcomplete] = useState(false)
  const style = {
    height: "10vh",
    width: "90%",
    margin: "10px",
    backgroundColor: hover ?"rgba(208, 226, 226, 0.823)":"rgb(107, 115, 115)",
    border: "black 1px solid",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
  const txtstyle = {
    color: "#888", 
    textDecoration: "line-through", 

    padding: "5px",
    fontStyle: "italic"
  }
  const handledel = ()=>{
    console.log({text})
    ondelete({text})
  }

  return (
    <div style={{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-evenly"
    }}>
    <div style={style} onMouseEnter={()=>sethover(false)} onMouseLeave={()=>sethover(true)} onClick={()=>setcomplete(!complete)}>
      <h1 style={complete?txtstyle:{}}>{text}
      </h1>
    </div>
        <button onClick={handledel}>delete</button>
    </div>
  );
}

function AddtaskPanel({ onAddTask }) {
  const [submit, setSubmit] = useState('');
  const [id, setId] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTask({ id, text: submit });
    setId(id + 1);
    setSubmit('');
  };

  return (
    <div className="addtaskpanel">
      <form onSubmit={handleSubmit} className="form" >
        <input
        className="entry"
          value={submit}
          onChange={(e) => setSubmit(e.target.value)}
          type="text"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="playground">
      <AddtaskPanel onAddTask={handleAddTask} />
      <TasksPanel tasks={tasks} />
    </div>
  );
}
