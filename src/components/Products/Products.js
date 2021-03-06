import React, { Component } from 'react';
import './style.scss';
import { request } from '../../utils/request';
import { COMPARE_PRODUCTS_URL } from '../../constants/urls';
import helpers from '../../utils/helpers';

import Sidebar from '../Sidebar/Sidebar';
import ProductHeader from '../ProductHeader/ProductHeader';
import ProductItem from '../ProductItem/ProductItem';

/* 
  In attantion to the reviewer :) 

  1. I had an issue with sorting API response object keys as Alphapetically as you wanted
   so made a diffrent approach here
   and created an array from Object keys, 
   sorted them and added as a new property on response objects.

  2. I've used class component here and for other components I used function components just to show you that I can use them.
    Normally I use class components if I only use redux store connection for component.
*/

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: props.products || null,
      diffKeys: null
    }

    this.helpers = helpers;

    this.sidebarFeatureList = [
      "Keurmerk",
      "Artikelnummer",
      "Hardheid",
      "Inwendige diameter",
      "Kleur",
      "Maat volgens AS568",
      "Materiaal",
      "Snoerdikte",
      "stepQuantity",
      "Temperatuurgebied",
      "Toepassing"
    ]
  }

  async componentDidMount() {
    const data = await request(COMPARE_PRODUCTS_URL, 'GET');
    const products = data.products.map((item) => this.helpers.sortKeyAlphabetic(item));

    this.setState({ products });

    await this.getDiffs();
  }

  getDiffs = async () => {

    const { products } = this.state;

    const diffKeys = [];
    let searchIndex = 1;
    let curIndex = 0;

    /* Loop through each product per product recursevily to find diffrent values */ 
    const getObjDiffs = async () => {
      for (const key in products[curIndex]) {
        if (products[curIndex][key] && products[searchIndex] && products[searchIndex][key]) {
          if(products[curIndex][key] !== products[searchIndex][key] && diffKeys.indexOf(key) === -1){
            diffKeys.push(key);
          }
        }
      }

      if(curIndex < products.length) {
        if(searchIndex < products.length) {
          searchIndex += 1;
          await getObjDiffs();
        }
  
        if(searchIndex === products.length) {
          curIndex += 1;
          searchIndex = curIndex + 1;
          await getObjDiffs();
        }
      }
    }

    await getObjDiffs();

    this.setState({ diffKeys });
  }

  async handleItemSelect(item, checked) {

    this.setState((prevState) => ({
      products: prevState.products.map((product) => {
        if(product.Artikelnummer === item.Artikelnummer) {
          product.display = checked;
        }

        return product;
      })
    }))
  }

  handleRemoveProduct = async (item) => {
    this.setState((prevState) => ({
      products: prevState.products.filter((product => product.Artikelnummer !== item.Artikelnummer))
    }), async () => {
      await this.getDiffs();
    });
  }

  render() {
    const { products, diffKeys } = this.state;

    return (

      <>
        <div className="page-header">
          <h1 className="page-title">{`${products && products.length} Producten vergelijken`}</h1>
        </div>

        <div className="products-container">

          {products && <Sidebar
            products={products}
            diffKeys={diffKeys}
            sidebarFeatureList={this.sidebarFeatureList}
            handleItemSelect={(item, checked) => this.handleItemSelect(item, checked)}
          />} 

          <div className="products-wrapper">
            {products && products.map((item, i) => (
              <>
                {item.display && <div className="product" data-testid={`products-product-item-${i + 1}`}>

                  <ProductHeader productItem={item} handleRemoveProduct={this.handleRemoveProduct}/>
                  
                  <div className="product-content">
                    <ul className="product-feature-list">
                      <ProductItem productItem={item} diffKeys={diffKeys}/>
                    </ul>
                  </div>

                </div>}
              </>

            ))}
          </div>
        
        </div>

      </>

    )
  }
}

export default Products;