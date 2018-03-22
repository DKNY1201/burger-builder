import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => (
    <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        <BurgerIngredient type="salad" />
        <BurgerIngredient type="bacon" />
        <BurgerIngredient type="bread-bottom" />
    </div>
);

export default burger;