import React, { useContext } from 'react';

import Card from '../UI/Card';
import './ProductItem.css';
// import { ProductContext } from '../../context/products-context';
import { useStore } from '../../hook-store/store';

const ProductItem = props => {
  // const toggleFav = useContext(ProductContext).toggleFav;

  console.log('RENDER');
  const dispatch = useStore()[1];
  const toggleFavHandler = () => {
    dispatch('TOGGLE_FAV', props.id);
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
