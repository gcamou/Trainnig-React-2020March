import React from 'react';

import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle';

import classes from './styles.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.sideDrawerToggle} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default toolbar;