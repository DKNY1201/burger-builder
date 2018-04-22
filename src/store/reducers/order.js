import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, {id: action.orderId});
            var updatingProperties = {
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            };
            return updateObject(state, updatingProperties);
        case actionTypes.PURCHASE_BURGER_FAIL:
            var updatingProperties = {
                loading: false,
                purchased: true
            };
            return updateObject(state, updatingProperties);
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {loading: true});
        case actionTypes.PURCHASE_BURGER_INIT:
            return updateObject(state, {purchased: false});
        case actionTypes.FETCH_ORDER_SUCCESS:
            var updatingProperties = {
                orders: action.orders,
                loading: false
            };
            return updateObject(state, updatingProperties);
        case actionTypes.FETCH_ORDER_FAIL:
            return updateObject(state, {loading: false});
        case actionTypes.FETCH_ORDER_START:
            return updateObject(state, {loading: true});
        default:
            return state;
    }
}

export default reducer;