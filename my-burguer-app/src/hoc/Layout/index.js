import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer';

import classes from './styles.css'

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const closeSideDrawerHandler = () => {
        setShowSideDrawer(false);
    }

    const toggleSideDrawerHandler = () => {
        setShowSideDrawer(!showSideDrawer);

    }
    return (
        <Aux>
            <Toolbar isAuthenticated={props.isAuthenticated} sideDrawerToggle={toggleSideDrawerHandler} />
            <SideDrawer
                isAuthenticated={props.isAuthenticated}
                open={showSideDrawer}
                closed={closeSideDrawerHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);