import React from 'react';

import classes from './styles.css';
import BuildControl from './BuildControl';

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
    { label: "Bacon", type: "bacon" },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total Price <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => {
            return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdd(ctrl.type)}
                removed={() => props.ingredientRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        })}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasabled}
            onClick={props.ordered} >
            ORDER NOW
        </button>
    </div>
);

export default buildControls;
