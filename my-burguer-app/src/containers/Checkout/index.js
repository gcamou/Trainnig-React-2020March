import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData';

const Checkout = props => {

    const checkoutCancelledHanlder = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    const purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;
    return (
        <div>
            {purchaseRedirect}
            <CheckoutSummary
                ingredients={props.ings}
                checkoutCancelled={checkoutCancelledHanlder}
                checkoutContinued={checkoutContinuedHandler}
            />
            <Route
                path={props.match.path + '/contact-data'}
                component={ContactData} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);