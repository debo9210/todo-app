import React, {useState, useRef} from 'react';
import '../componentStyles/ToDo.css';

const Form = ({addTask}) => {
    const [taskName, setTaskName] = useState('');

    const inputRef = useRef(null);


    const handleSubmit = (e)=>{
        e.preventDefault();

        if(inputRef.current.value === '') return;

        addTask(taskName);
        setTaskName('');
    };

    const handleOnChange = (e)=>{
        setTaskName(e.target.value);
    };

    return (
        <>
            <form onSubmitCapture={handleSubmit}>
                <div className="InputDiv">
                    <input 
                        type="text" 
                        placeholder="add details"
                        className="todoInput"
                        onChange={handleOnChange}
                        value={taskName}
                        ref={inputRef}
                        />
                    <button 
                        className="AddBtn"
                        type="submit"
                        >
                        Add
                    </button>
                </div>
            </form>
        </>
    )
}

export default Form
