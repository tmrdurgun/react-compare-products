import React, { Component } from 'react';
import './style.scss';
import { request } from '../../utils/request';
import { COMPARE_PRODUCTS_URL } from '../../constants/urls';
import { helpers } from '../../utils/helpers';
import productImg from '../../assets/images/product.png';
import badgesImg from '../../assets/images/badges.png';

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null
    }

    this.helpers = helpers;

    this.sidebarFeatureList = [
      "Artikelnummer",
      "badges",
      "BUP_Conversion",
      "BUP_UOM",
      "BUP_Value",
      "channel",
      "grossPrice",
      "Hardheid",
      "Inwendige diameter",
      "Kleur",
      "listPrice",
      "Maat volgens AS568",
      "manufacturerImage",
      "manufacturerName",
      "Materiaal",
      "minQuantity",
      "name",
      "productImage",
      "salePrice",
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

    this.setState({ products });
  }

  render() {
    const { products } = this.state;

    console.log('products: ', products);

    return (

      <div className="products-container">
        <div className="products-header">4 Producten vergelijken</div>

        <div className="products-sidebar">
          <h4 className="sidebar-title">Je selectie</h4>

          <div className="sidebar-filter">
            <ul className="sidebar-filter-list">
              {products && products.map((item, i) => {
                return (<li key={i + 1} className="sidebar-filter-list-item">{item.name}</li>)
              })}
            </ul>
          </div>

          <div className="sidebar-feature-container">
            <ul className="feature-list">
              { this.sidebarFeatureList.map((item, i) => {
                return (<li key={i + 1} className="feature-list-item">{item}</li>)
              })}
            </ul>
          </div>
        </div>

        <div className="products-page">
        {products && products.map((item, i) => (<div className="product">
            <div className="product-header">
              <div className="product-picture">
                <img src={productImg} alt="" />
              </div>
              <div className="product-name">{item.name}</div>
              <div className="product-price">{item.salePrice}</div>
              <div className="product-desc">per stuk / excl. btw</div>
            </div>
            <div className="product-content">
              <ul className="product-feature-list">
                {item.sortedKeys.map((key, keyIndex) => {
                  if(key !== 'atp' && key !== 'display') {
                    return (
                      <li key={keyIndex + 1} className="products-feature-list-item">{item[key]}</li> 
                    )
                  } else {
                    return <li></li>
                  }
                })}
              </ul>
            </div>
          </div>))}

          
        </div>
      </div>

    )
  }
}

export default Products;