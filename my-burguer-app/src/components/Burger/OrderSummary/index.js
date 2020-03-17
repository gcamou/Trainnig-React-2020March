import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {

    const summaryIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <spam style={{ textTransform: 'capitalize' }} >{igKey}:</spam> {props.ingredients[igKey]}
                </li>
            );
        });

    return (
        <Aux>
            <h3>Your Order!</h3>
            <p>have the next following ingredients:</p>
            <ul>
                {summaryIngredients}
            </ul>
        </Aux>
    );
}

export default orderSummary;