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

    console.log('diffKeys: ', diffKeys);  

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
                      <input type="checkbox" id={`product-cb-${i + 1}`} checked={item.display} onChange={(e) => this.handleItemSelect(item, e.target.checked)} />
                      <span className="text-bold">{item.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-feature-container">
              <ul className="feature-list">
                {this.sidebarFeatureList.map((item, i) => (<li key={i + 1} 
                  className={`feature-list-item list-item ${diffKeys && diffKeys.indexOf(item) !== -1 ? 'highlight' : ''}`}>{item}</li>))}
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
                            && key !== 'manufacturerImage' && key !== 'manufacturerName' && key !== 'name' && item[key] !== ''
                            && key !== 'productImage' && key !== 'salePrice' && key !== 'sortedKeys' && key !== 'badges') &&

                            <li key={keyIndex + 1} className={`product-feature-list-item list-item ${diffKeys && diffKeys.indexOf(key) !== -1 ? 'highlight' : ''}`}>{item[key]}</li>}
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