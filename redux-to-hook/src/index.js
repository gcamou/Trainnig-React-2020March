import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
// import ProductsContext from './context/products-context';
import configureProductsStore from './hook-store/poducts-store';

configureProductsStore();

ReactDOM.render(
// <ProductsContext>
<BrowserRouter>
  <App />
</BrowserRouter>,
// </ProductsContext>,
document.getElementById('root')
);
