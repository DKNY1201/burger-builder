import React from 'react';

import logoImg from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={logoImg} alt="Burger Builder"/>
    </div>
);

export default logo;