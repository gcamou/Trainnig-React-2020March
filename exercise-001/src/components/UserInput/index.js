import React from 'react';

import './style.css'

const userInput = (props) => {
    const style = {
        border: '2px solid red'
    }

    return (
        <div>
            <input 
                type="text" 
                style={style}
                onChange={props.changed}
                value={props.currentName} />
        </div>
    );
}

export default userInput;