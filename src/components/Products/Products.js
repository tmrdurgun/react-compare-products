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
      "BUP_Conversion",
      "BUP_UOM",
      "BUP_Value",
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

    this.setState({ products });
  }

  render() {
    const { products } = this.state;

    console.log('products: ', products);

    return (

      <>
        <div className="page-header">
          <h1 className="page-title">{`${products && products.length} Producten vergelijken`}</h1>
        </div>

        <div className="products-container">

          <div className="products-sidebar">
            <h4 className="sidebar-title">Je selectie</h4>

            <div className="sidebar-filter">
              <ul className="sidebar-filter-list">
                {products && products.map((item, i) => (
                  <li key={i + 1} className="sidebar-filter-list-item">
                    <label htmlFor={`product-cb-${i + 1}`}>
                      <input type="checkbox" name="" id={`product-cb-${i + 1}`} />
                      <span className="text-bold">{item.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-feature-container">
              <ul className="feature-list">
                {this.sidebarFeatureList.map((item, i) => (<li key={i + 1} className="feature-list-item list-item">{item}</li>))}
              </ul>
            </div>
          </div>

          <div className="products-page">
            {products && products.map((item, i) => (
              <>
                {item.display && <div className="product">

                  <div className="product-header">
                    <div className="product-header-picture">
                      <img src={productImg} alt="" />
                    </div>
                    <div className="product-header-name text-bold">{item.name}</div>
                    <div className="product-header-price">{item.salePrice}</div>
                    <div className="product-header-desc">per stuk / excl. btw</div>
                  </div>
                  
                  <div className="product-content">
                    <ul className="product-feature-list">
                      <li className="product-feature-list-item list-item badges"> <img src={badgesImg} alt="" /> </li>

                      {item.sortedKeys.map((key, keyIndex) => (
                        <>
                          {(key !== 'atp' && key !== 'display' && key !== 'grossPrice' && key !== 'listPrice'
                            && key !== 'manufacturerImage' && key !== 'manufacturerName' && key !== 'name'
                            && key !== 'productImage' && key !== 'salePrice' && key !== 'sortedKeys' && key !== 'badges') &&

                            <li key={keyIndex + 1} className="product-feature-list-item list-item">{item[key]}</li>}
                        </>
                      ))}
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