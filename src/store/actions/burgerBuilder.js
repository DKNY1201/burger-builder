import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-orders';

export const addIngredient = (igName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: igName
    }
}

export const removeIngredient = (igName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: igName
    }
}

export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("/ingredients.json")
            .then(res => {
                dispatch(setIngredient(res.data))
            })
            .catch(err => {
                dispatch(fetchIngredientFailed())
            });
    }
}