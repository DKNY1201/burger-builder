import React from 'react';

import classes from './Spinner.css';

const spinner = () => (
    <div className={classes.SkCubeGrid}>
        <div className={[classes.SkCube, classes.SkCube1].join(' ')}></div>
        <div className={[classes.SkCube, classes.SkCube2].join(' ')}></div>
        <div className={[classes.SkCube, classes.SkCube3].join(' ')}></div>
        <div className={[classes.SkCube, classes.SkCube4].join(' ')}></div>
        <div className={[classes.SkCube, classes.SkCube5].join(' ')}></div>
        <div className={[classes.SkCube, classes.SkCube6].join(' ')}></div>
        <div className={[classes.SkCube, classes.SkCube7].join(' ')}></div>
        <div className={[classes.SkCube, classes.SkCube8].join(' ')}></div>
        <div className={[classes.SkCube, classes.SkCube9].join(' ')}></div>
    </div>
);

export default spinner;