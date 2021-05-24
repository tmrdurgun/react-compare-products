import React from 'react';
import './style.scss';

export default function Sidebar(props) {
  const { products, diffKeys, sidebarFeatureList } = props;

  return (
    <div className="products-sidebar">
      <h4 className="sidebar-title">Je selectie</h4>

      <div className="sidebar-filter">
        <ul className="sidebar-filter-list">
          {products && products.map((item, i) => (
            <li key={i + 1} className="sidebar-filter-list-item">
              <label htmlFor={`product-cb-${i + 1}`} data-testid={`sidebar-product-item-${i + 1}`}>
                <input type="checkbox" id={`product-cb-${i + 1}`} checked={item.display} onChange={(e) => props.handleItemSelect(item, e.target.checked)} />
                <span className="text-bold">{item.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-feature-container">
        <ul className="feature-list">
          {sidebarFeatureList.map((item, i) => (<li key={i + 1}
            className={`feature-list-item list-item ${diffKeys && diffKeys.indexOf(item) !== -1 ? 'highlight' : ''}`}>{item}</li>))}
        </ul>
      </div>
    </div>

  )
}