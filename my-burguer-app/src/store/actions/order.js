import * as actionTypes from '../actions/actionTypes';
import axios from '../../hoc/axios-orders/axios-orders';

export const purchaseBurgerSuccessful = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESSFUL,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESSFUL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(res => {
                console.log(res.data);
                dispatch(purchaseBurgerSuccessful(res.data.name, orderData))
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err));
            });
    }
}

export const fetchOrderSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = error => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('orders.json')
            .then(res => {
                const fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrderSuccess(fetchOrders));
            })
            .catch(err => {
                dispatch(fetchOrderFail(err))
            });
    }
}