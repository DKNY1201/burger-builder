import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFaild = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    }
}

export const purchaseOrderStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then(res => {
                console.log(res.data);
                dispatch(purchaseBurgerSuccess(res.data, orderData))
            })
            .catch(err => {
                dispatch(purchaseBurgerFaild(err));
            });
    }
}