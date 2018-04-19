import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENTS_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    salad: 0.5,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredients = updateObject(state.ingredients,
                {[action.ingredientName]: state.ingredients[action.ingredientName] + 1});
            const updatedState = updateObject(state, {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            })
            return updatedState;
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = updateObject(state.ingredients,
                {[action.ingredientName]: state.ingredients[action.ingredientName] - 1});
            const updatedSta = updateObject(state, {
                ingredients: updatedIng,
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            })
            return updatedSta;
        case actionTypes.INIT_INGREDIENTS:
            const updatingProperties = {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4
            };
            return updateObject(state, updatingProperties);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true})
        default: return state;
    }
}

export default reducer;