import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    salad: 0.5,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //
    //     }
    // }

    state = {
        ingredients: {
            meat: 0,
            salad: 0,
            bacon: 0,
            cheese: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newIngredients[type] + 1;
        const newTotalPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.setState({
            ingredients: newIngredients,
            totalPrice: newTotalPrice
        })
    }

    removeIngredientHandler = (type) => {
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newIngredients[type] - 1;
        if (newIngredients[type] < 0) {
            return;
        }
        const newTotalPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
        this.setState({
            ingredients: newIngredients,
            totalPrice: newTotalPrice
        })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price = {this.state.totalPrice}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;