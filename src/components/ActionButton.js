import React from 'react';
import '../componentStyles/ToDo.css';

const ActionButton = ({actionName, isPressed, setFilter, filterName}) => {
    return (
        <div>
            <button 
                className={filterName === actionName ? 'Btn ToggleBtn' : 'Btn'}
                type='button'
                aria-pressed={isPressed}
                onClick={()=> setFilter(actionName)}>
                <span>{actionName}</span>
            </button>      
        </div>
    )
}

export default ActionButton
