import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button';

const orderSummary = (props) => {

    const summaryIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }} >{igKey}:</span> {props.ingredients[igKey]}
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
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.cancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continue}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;