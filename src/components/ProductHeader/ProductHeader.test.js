import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductHeader from './ProductHeader';

const dummyProducts = require('../../dummyData/products.json');
const productsData = JSON.parse(JSON.stringify(dummyProducts)).products;

it('renders correctly', () => {
  render(<ProductHeader productItem={productsData[0]} />);

  const element = screen.getByTestId('product-header');
  expect(element).toBeInTheDocument();
})