import React from 'react';

import classes from './BackDrop.css';

const backDrop = (props) => props.show ? <div className={classes.BackDrop} onClick={props.clicked}></div> : '';

export default backDrop;

