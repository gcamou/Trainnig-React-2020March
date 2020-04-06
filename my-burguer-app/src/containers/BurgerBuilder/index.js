import React, { Component } from "react";

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger'
import BuildControls from '../../components/Burger/BuildControls';
import Model from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import axios from '../../hoc/axios-orders/axios-orders';
import Spinner from '../../components/UI/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.4,
    bacon: 0.8,
    cheese: 0.5,
    meat: 1.4
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasabled: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data });
            })
            .catch(err => {
                this.setState({ error: true })
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);

        this.setState({ purchasabled: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updateCount = oldCount + 1
        const updateIngredient = {
            ...this.state.ingredients
        };
        updateIngredient[type] = updateCount;

        const oldPrice = this.state.totalPrice;
        const ingredientPrice = INGREDIENT_PRICE[type];
        const newPrice = oldPrice + ingredientPrice;

        this.setState({ totalPrice: newPrice, ingredients: updateIngredient })
        this.updatePurchaseState(updateIngredient)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1
        const updateIngredient = {
            ...this.state.ingredients
        };
        updateIngredient[type] = updateCount;

        const oldPrice = this.state.totalPrice;
        const ingredientPrice = INGREDIENT_PRICE[type];
        const newPrice = oldPrice - ingredientPrice;

        this.setState({ totalPrice: newPrice, ingredients: updateIngredient })
        this.updatePurchaseState(updateIngredient)
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        let queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice)
        let queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdd={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasabled={this.state.purchasabled}
                        ordered={this.purchaseHandler} />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);