import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './styles.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
)

export default logo;