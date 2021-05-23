import React from 'react';
import './style.scss';
import productImg from '../../assets/images/product.png';

export default function ProductHeader(props){
  const { productItem } = props;

  return (
    <div className="product-header">
      <div className="product-header-picture">
        <img src={productImg} alt="" />
      </div>
      <div className="product-header-name text-bold">{productItem.name}</div>
      <div className="product-header-price">{productItem.salePrice}</div>
      <div className="product-header-desc">per stuk / excl. btw</div>
    </div>
  )
}