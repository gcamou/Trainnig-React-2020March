import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order';
import axios from '../../hoc/axios-orders/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner';
import * as actionCreator from '../../store/actions';

const Orders = props => {
    const { onFetchOrder } = props;
    useEffect(() => {
        onFetchOrder(props.token, props.userId);
    }, [onFetchOrder]);

    let order = <Spinner />

    if (!props.loading) {
        order = props.orders.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        ))
    }
    return (
        <div>
            {order}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token, userId) => dispatch(actionCreator.fetchOrder(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));