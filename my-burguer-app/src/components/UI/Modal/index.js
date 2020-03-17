import React from 'react';

import classes from './styles.css'

const modal = (props) => (
    <div className={classes.Modal}>
        {props.children}
    </div>
);

export default modal;