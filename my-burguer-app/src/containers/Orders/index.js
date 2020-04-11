import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order';
import axios from '../../hoc/axios-orders/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner';
import * as actionCreator from '../../store/actions';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrder();
    }

    render() {
        let order = <Spinner />

        if (!this.props.loading) {
            order = this.props.orders.map(order => (
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
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: () => dispatch(actionCreator.fetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));