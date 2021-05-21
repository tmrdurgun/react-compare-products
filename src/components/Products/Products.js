import React, {Component} from 'react';
import './style.scss';

class Products extends Component {
    constructor(props){
        super(props);

        this.state = {
            products: null
        }
    }

    componentDidMount() {

    }

    render() {
        const { products } = this.state;

        console.log('products: ', products);

        return (
            <div className="page-container">
                <div className="products-container">
                    PRODUCTS
                </div>
            </div>
        )
    }
}

export default Products;