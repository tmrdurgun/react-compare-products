import React from 'react';
import badgesImg from '../../assets/images/badges.png';

export default function ProductItem(props) {
  const { productItem, diffKeys } = props;

  return (
    <>
      {/* Badges urls were broken so I needed to add badges manually here as png.
        in normal case it should be something like item.badges.split('|')
      */}
      <li className="product-feature-list-item list-item badges"> <img src={badgesImg} alt="" /> </li>
      {productItem.sortedKeys.map((key, keyIndex) => (
        <>
          {(key !== 'atp' && key !== 'display' && key !== 'grossPrice' && key !== 'listPrice'
            && key !== 'manufacturerImage' && key !== 'manufacturerName' && key !== 'name' && productItem[key] !== ''
            && key !== 'productImage' && key !== 'salePrice' && key !== 'sortedKeys' && key !== 'badges') &&

            <li key={keyIndex + 1} 
              className={`product-feature-list-item list-item ${diffKeys && diffKeys.indexOf(key) !== -1 ? 'highlight' : ''}`}
              data-testid={`product-item-${keyIndex + 1}`}
              >{productItem[key]}</li>}
        </>
      ))}
    </>
  )
}