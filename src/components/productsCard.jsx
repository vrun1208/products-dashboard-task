import React from 'react';
//import { Card, CardContent, Typography, Grid } from '@mui/material';
import '../styles/card.css';

const ProductCard = ({ totalProducts, productsAdded, productsDeleted }) => {
  return (
    <div className='card'>
    <div className='card-component'>
            <p>Total Products</p>
            <h3>{totalProducts}</h3>
    </div>
    <div className='card-component'>
            <p>Products added</p>
            <h3>{productsAdded}</h3>
    </div>
    <div className='card-component'>
            <p>Products deleted</p>
            <h3>{productsDeleted}</h3>
    </div>
    </div>
    
  );
};

export default ProductCard;
