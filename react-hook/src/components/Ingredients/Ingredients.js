import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

import useHttp from '../../hooks/http';

const ingredientReducer = (currentState, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentState, action.ingredient];
    case 'DELETE':
      return currentState.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Something was wrong!');
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, error, data, sendRequest, extra, identified, clear } = useHttp();

  useEffect(() => {
    if (!isLoading && !error && identified === 'DELETE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: extra });
    } else if (!isLoading && !error && identified === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        ingredient: {
          id: data.name,
          ...extra
        }
      });
    }
  }, [data, extra, identified, isLoading, error]);


  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      'https://gcamou-green-market.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );
  }, [sendRequest]);

  const removeIngredientHandler = useCallback(id => {
    sendRequest(
      `https://gcamou-green-market.firebaseio.com/ingredients/${id}.json`,
      'DELETE',
      null,
      id,
      'DELETE_INGREDIENT');
  }, [sendRequest]);

  const loadIngrediantsHandler = useCallback(ingredients => {
    dispatch({ type: 'SET', ingredients: ingredients });
  }, []);

  const ingredientList = useMemo(() => {
    return (<IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />);
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm onAddIngrediant={addIngredientHandler} isLoading={isLoading} />

      <section>
        <Search onLoadIngredients={loadIngrediantsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
