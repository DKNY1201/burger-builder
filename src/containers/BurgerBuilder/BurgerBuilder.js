import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {
        const sumIngredients = Object.values(ingredients).reduce((sum, el) => sum + el, 0);
        this.setState({purchasable: sumIngredients > 0});
    }

    addIngredientHandler = (type) => {
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newIngredients[type] + 1;
        const newTotalPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.setState({
            ingredients: newIngredients,
            totalPrice: newTotalPrice
        })
        this.updatePurchaseState(newIngredients);
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
        });
        this.updatePurchaseState(newIngredients);
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    cancelOrderHandler = () => {
        this.setState({purchasing: false});
    }

    continueOrderHandler = () => {
        alert('You continued!');
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
                <Modal show={this.state.purchasing} modalClosed={this.cancelOrderHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}
                        cancelledOrder={this.cancelOrderHandler}
                        continuedOrder={this.continueOrderHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;