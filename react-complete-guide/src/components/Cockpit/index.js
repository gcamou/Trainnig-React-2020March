import React from 'react'

import classes from './style.css'

const cockpit = (props) => {
    const assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }

    if (props.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }
    return (
        <div className={classes.Cockpit}>
            <h1>This is a React baby...</h1>
            <p className={assignedClasses.join(' ')}>This is a message</p>
            <button className={btnClass} onClick={props.clicked}>Toggle Persons</button>

        </div>
    );
}

export default cockpit; 