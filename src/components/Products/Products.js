import React, { Component } from 'react';
import './style.scss';
import { request } from '../../utils/request';
import { COMPARE_PRODUCTS_URL } from '../../constants/urls';
import { helpers } from '../../utils/helpers';

import Sidebar from '../Sidebar/Sidebar';
import ProductHeader from '../ProductHeader/ProductHeader';
import ProductItem from '../ProductItem/ProductItem';

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null,
      diffKeys: null
    }

    this.helpers = helpers;

    this.sidebarFeatureList = [
      "Keurmerk",
      "Artikelnummer",
      "channel",
      "Hardheid",
      "Inwendige diameter",
      "Kleur",
      "Maat volgens AS568",
      "Materiaal",
      "minQuantity",
      "sku",
      "Snoerdikte",
      "stepQuantity",
      "Temperatuurgebied",
      "Toepassing",
      "uom"
    ]
  }

  async componentDidMount() {
    const data = await request(COMPARE_PRODUCTS_URL, 'GET');
    const products = data.products.map((item) => this.helpers.sortKeyAlphabetic(item));

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

    this.setState({ products, diffKeys });
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
                {item.display && <div className="product">

                  <ProductHeader productItem={item}/>
                  
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