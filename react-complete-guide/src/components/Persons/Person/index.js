import React from 'react';
import classes from './Person.css';

const person = (props) => {
    return (
        <div className={classes.Person}>
            <h1>Card...</h1>
            <p onClick={props.click}>I'm {props.name} and I my age is: {props.age}</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    );
};

export default person;