import React from 'react';

import Aux from '../../hoc/Aux';

import classes from './styles.css'

const layout = (props) => (
    <Aux>
        <div> Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;