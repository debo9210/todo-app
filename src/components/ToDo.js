import React, {useState} from 'react';
import '../componentStyles/ToDo.css';
import delLogo from '../delete_btn.svg';



const ToDo = ({
    name, 
    completed, 
    id, 
    toggleTaskCompleted, 
    deleteTask,
    editTask
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');


    const handleChange = (e)=>{
        setNewName(e.target.value);
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        editTask(id, newName);
        setNewName('');
        setIsEditing(false);
    };


    

    const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
        <div className="form-group">
        <label className="TodoLabel" htmlFor={id}>
            New name for {name}
        </label>
        <input 
            id={id} 
            className="TodoInputEdit" 
            type="text"
            value={newName}
            onChange={handleChange}
             />
        </div>
        <div className="BtnGroup">
        <button 
            type="button" 
            className="BtnEdit TodoCancel"
            title='cancel'
            onClick={()=> setIsEditing(false)}
            >
            <span className="material-icons matIcon">
            cancel_presentation
            </span>
        </button>
        <button 
            type="submit" 
            className="BtnEdit TodoEdit"
            title='save'>
            <span className="material-icons matIcon">
            save
            </span>
        </button>
        </div>
  </form>
    )


    const viewTemplate = (
        <div>
        <li className={completed ? 'TodoList Completed' : 'TodoList'}>
            <input 
                    type="checkbox" 
                    name="" 
                    id={id}
                    defaultChecked={completed}
                    onChange={()=>toggleTaskCompleted(id)}    
                    />
                {name}

                {completed && (<button 
                className='DelBtn'
                title='Delete'
                onClick={()=>deleteTask(id)}>
                    <img className='LogoDel' src={delLogo} alt=""/>
                </button>)}

                <button 
                className='EditBtn' 
                title='Edit'
                onClick={()=> setIsEditing(true)}>
                <span className="material-icons">
                    edit
                </span>
                </button>
            </li>   
        </div>
    )

    return (
        
        <div>
            {isEditing ? editingTemplate : viewTemplate}
        </div>
    )
}



export default ToDo