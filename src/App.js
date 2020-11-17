import React, {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import ToDo from './components/ToDo';
import Form from './components/Form';
import ActionButton from './components/ActionButton';
import './App.css';
import './componentStyles/ToDo.css';

const ACTION_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const ACTION_NAMES = Object.keys(ACTION_MAP);


function App(props) {
  let [tasks, setTasks] = useState(props.tasks);
  let [filter, setFilter] = useState('All');


  const toggleTaskCompleted = (id)=>{
    const updatedTask = tasks.map(task => {
      // if this task has the same ID as the edited task
      if(id === task.id){
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTask);
  };


  const editTask = (id, newName)=>{
    const editedTask = tasks.map(task => {
      if(task.id === id){
        return {...task, name: newName};
      }
      return task;
    });
    setTasks(editedTask);
  };


  const deleteTask = (id)=>{
    const remainingTasks = tasks.filter(task => id !== task.id);

    setTasks(remainingTasks);
  };  


  const deleteAllHandler = (e)=>{
    const deleteAllCompletedTasks = tasks.filter(task =>(
      task.completed !== true
    ));
    setTasks(deleteAllCompletedTasks);
  }

  const tasklist = tasks
    .filter(ACTION_MAP[filter])
    .map(task => (
      <ToDo 
        key={task.id}
        name={task.name}
        id={task.id}
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask} />
    ));
  


  const actionList = ACTION_NAMES.map(name => (
    <ActionButton 
      key={name} 
      actionName={name}
      filterName = {filter}
      isPressed={name === filter}
      setFilter={setFilter} />
  ));



  const addTask = (name)=>{
    const newTask = {
      id: `todo-${nanoid()}`,
      name: name,
      completed: false
    };
    
    setTasks(tasks => [...tasks, newTask]);
  };


  useEffect(() => {
    const newData = JSON.parse(localStorage.getItem('data') || '[]');

    setTasks(newData);
  }, []);

  useEffect(()=>{
    localStorage.setItem('data', JSON.stringify(tasks));
  },[tasks]);


  const taskNoun = tasklist.length > 1 ? 'tasks' : 'task';
  const tasksText = `${tasklist.length} ${taskNoun} ${filter !== 'Completed' ? 'remaining' : 'completed'}`;

 

  return (

      <>
      <div className="App">
        <h1>#todo</h1>
        
        <div className="Actions">
          {actionList}
        </div>
    
        <Form addTask={addTask}/>
                
    
        <div className="Todos">
            <ul 
                className="todoItems" 
                >
                <h3 className="NumTasks">
                {tasksText}
                </h3>
                {tasklist}
            </ul>
            {filter === 'Completed' && (<button className='BtnDelAll'
            onClick={deleteAllHandler}>
              <div className='BtnDel'>
              <span className="material-icons DelOutline">
                delete_outline
              </span> 
              <span className='DelAll'>delete all</span>
              </div>
            </button>)}
        </div>
      </div>
      </>
  );
}

export default App;
