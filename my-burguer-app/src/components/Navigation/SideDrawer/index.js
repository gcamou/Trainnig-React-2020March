import React from 'react';

import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import Backdrop from '../../UI/Backdrop';
import Aux from '../../../hoc/Aux';

import classes from './styles.css';

const sidedrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </Aux>
    );
};

export default sidedrawer;