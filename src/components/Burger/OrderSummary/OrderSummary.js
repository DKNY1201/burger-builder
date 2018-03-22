import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredientsList = Object.keys(props.ingredients)
        .map(ingKey => (
            <li key={ingKey}>
                <span style={{'textTransform': 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}</li>
        ));

    return (
        <Aux>
            <h4>Order Summary</h4>
            <p>Your delicious burger with following ingredients</p>
            <ul>
                {ingredientsList}
            </ul>
            <p>Continue checkout?</p>
        </Aux>
    )
}

export default orderSummary;