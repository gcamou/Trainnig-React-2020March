import React from 'react'

import classes from './styles.css'
import BurgerIngredient from './Ingredient'

const burger = props => {

    let bugerIngredient = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey +i} type={igKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if(bugerIngredient.length === 0)
    {
        bugerIngredient = <p>Please, add ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {bugerIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;