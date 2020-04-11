import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchasedInit = (state, action) => {
    return updateObject(state, { purchased: false });
}

const purchasedBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const purchasedBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {
        id: action.orderId
    });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}

const purchasedBurgerFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
}

const fetchOrderFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchasedInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchasedBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESSFUL: return purchasedBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchasedBurgerFail(state, action);
        case actionTypes.FETCH_ORDER_START: return fetchOrderStart(state, action);
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDER_FAIL: return fetchOrderFail(state, action);
        default: return state;
    }
}

export default reducer;