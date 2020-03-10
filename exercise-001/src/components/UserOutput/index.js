import React from 'react';

import './style.css'

const userOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>User Name: {props.userName}</p>
            <p>Secound paragraph</p>
        </div>
    );
}

export default userOutput;