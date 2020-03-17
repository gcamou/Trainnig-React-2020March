import React, { Component } from "react";

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger'
import BuildControls from '../../components/Burger/BuildControls';
import Model from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.4,
    bacon: 0.8,
    cheese: 0.5,
    meat: 1.4
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasabled: false,
        purchasing: false
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
        alert('continue please');
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }


        return (
            <Aux>
                <Model show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    cancelled={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler} />
                </Model>
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
    }
}

export default BurgerBuilder;