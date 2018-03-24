import React, {Component} from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

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
            <strong>Total price: {props.totalPrice.toFixed(2)}</strong>
            <p>Continue checkout?</p>
            <Button clicked={props.cancelledOrder} btnType="Danger">CANCEL</Button>
            <Button clicked={props.continuedOrder} btnType="Success">CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;