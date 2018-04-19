import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    }
}

export const purchaseOrderStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseOrder = (orderData) => {
    return dispatch => {
        dispatch(purchaseOrderStart());
        axios.post('/orders.json', orderData)
            .then(res => {
                console.log(res.data);
                dispatch(purchaseBurgerSuccess(res.data, orderData))
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err));
            });
    }
}