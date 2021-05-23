import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductItem from './ProductItem';

const dummyProduct = {
  "Artikelnummer": "115E19",
  "BUP_Conversion": "",
  "BUP_UOM": "",
  "BUP_Value": "",
  "Hardheid": "70",
  "Inwendige diameter": "1.25",
  "Kleur": "Zwart",
  "Maat volgens AS568": "102",
  "Materiaal": "EPDM",
  "Snoerdikte": "2.62",
  "Temperatuurgebied": "van  -50  tot  150",
  "Toepassing": "Voedsel en dranken",
  "channel": "nl_NL",
  "display": true,
  "grossPrice": "1.71",
  "listPrice": "1.41",
  "manufacturerImage": "",
  "manufacturerName": "",
  "minQuantity": "5",
  "salePrice": "1.41",
  "sku": "115E19",
  "sortedKeys": ["Artikelnummer", "atp", "badges", "BUP_Conversion", "BUP_UOM", "BUP_Value", "channel", "display",
    "grossPrice", "Hardheid", "Inwendige diameter", "Kleur", "listPrice", "Maat volgens AS568", "manufacturerImage",
    "manufacturerName", "Materiaal", "minQuantity", "name", "productImage", "salePrice", "sku", "Snoerdikte",
    "stepQuantity", "Temperatuurgebied", "Toepassing", "uom"],
  "stepQuantity": "5",
  "uom": "Stuk",
}

it('renders correctly', () => {
  render(<ProductItem productItem={dummyProduct} diffKeys={[]} />);

  const element = screen.getByTestId('product-item-1');
  expect(element).toBeInTheDocument();
})