import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from '../Products/Products';


const { productsJsonString } = JSON.parse(JSON.stringify(require('../../dummyData/productsJsonString')));

it('should render products correctly', () => {
  render(<Products products={productsJsonString} />);
  
  const element = screen.getByTestId('products-product-item-1');
  expect(element).toBeInTheDocument();

})

it('hides product correctly after sidebar product item clicked', async () => {
  render(<Products products={productsJsonString} />);
  
  const sidebarProduct = screen.getByTestId('sidebar-product-item-1');
  const productItem = screen.getByTestId('products-product-item-1');

  fireEvent.click(sidebarProduct);

  expect(sidebarProduct).toBeInTheDocument();
  expect(productItem).not.toBeInTheDocument();
})