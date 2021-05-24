import React from 'react';
import { render, screen } from '@testing-library/react';
import Products from './Products';

const { productsJsonString } = JSON.parse(JSON.stringify(require('../../dummyData/productsJsonString')));

it('should render products correctly', () => {
  render(<Products products={productsJsonString} />);
  
  const element = screen.getByTestId('products-product-item-1');
  expect(element).toBeInTheDocument();

})