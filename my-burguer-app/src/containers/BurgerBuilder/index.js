import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger'
import BuildControls from '../../components/Burger/BuildControls';
import Model from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import axios from '../../hoc/axios-orders/axios-orders';
import Spinner from '../../components/UI/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions/';

export class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdd={this.props.onAddedIngredient}
                        ingredientRemove={this.props.onRemovedIngredient}
                        disabled={disabledInfo}
                        price={this.props.totPrice}
                        purchasabled={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated} />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.totPrice}
                cancelled={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler} />
        }

        if (this.state.loading)
            orderSummary = <Spinner />

        return (
            <Aux>
                <Model show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Model>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddedIngredient: (ingName) => dispatch(actionCreator.addIngredient(ingName)),
        onRemovedIngredient: (ingName) => dispatch(actionCreator.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionCreator.initIngredients()),
        onPurchaseInit: () => dispatch(actionCreator.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreator.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));