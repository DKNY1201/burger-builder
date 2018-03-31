import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for (let igName in props.ingredients) {
        ingredients.push({
            name: igName,
            amount: props.ingredients[igName]
        })
    }

    let ingredientsOutput = ingredients.map(ig => {
        return <span key={ig.name} style={{border: '1px solid #ccc', padding: '5px', margin: '0 5px', textTransform: 'capitalize'}}>
            {ig.name} ({ig.amount})
        </span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;