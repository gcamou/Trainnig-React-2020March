import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger'
import BuildControls from '../../components/Burger/BuildControls';
import Model from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import axios from '../../hoc/axios-orders/axios-orders';
import Spinner from '../../components/UI/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions/';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    //const { onInitIngredients } = props;

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const totPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const dispatch = useDispatch();
    const onAddedIngredient = (ingName) => dispatch(actionCreator.addIngredient(ingName));
    const onRemovedIngredient = (ingName) => dispatch(actionCreator.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actionCreator.initIngredients()), [dispatch]);
    const onPurchaseInit = () => dispatch(actionCreator.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actionCreator.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onPurchaseInit();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...ings
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can`t loading</p> : <Spinner />

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdd={onAddedIngredient}
                    ingredientRemove={onRemovedIngredient}
                    disabled={disabledInfo}
                    price={totPrice}
                    purchasabled={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    isAuthenticated={isAuthenticated} />
            </Aux>
        );

        orderSummary = <OrderSummary
            ingredients={ings}
            price={totPrice}
            cancelled={purchaseCancelHandler}
            continue={purchaseContinueHandler} />
    }

    if (props.loading)
        orderSummary = <Spinner />

    return (
        <Aux>
            <Model show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Model>
            {burger}
        </Aux>
    );
};

export default (withErrorHandler(BurgerBuilder, axios));