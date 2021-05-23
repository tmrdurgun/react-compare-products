import React from 'react';
import './style.scss';
import productImg from '../../assets/images/product.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function ProductHeader(props){
  const { productItem } = props;

  return (
    <div className="product-header" data-testid="product-header">
      <FontAwesomeIcon icon={faTrashAlt} id="remove-product-icon" onClick={() => props.handleRemoveProduct(productItem)} />
      <div className="product-header-picture">

        {/* Product picture url were broken from the API response object so I needed to add it manually here as png. */}

        <img src={productImg} alt="" />
      </div>
      <div className="product-header-name text-bold">{productItem.name}</div>
      <div className="product-header-price">{productItem.salePrice}</div>
      <div className="product-header-desc">per stuk / excl. btw</div>
    </div>
  )
}