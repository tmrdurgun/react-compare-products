import React, {Component} from 'react';
import './style.scss';
import { request } from '../../utils/request';
import { COMPARE_PRODUCTS_URL } from '../../constants/urls';

class Products extends Component {
    constructor(props){
        super(props);

        this.state = {
            products: null
        }
    }

    async componentDidMount() {
        const products = await request(COMPARE_PRODUCTS_URL, 'GET');

        this.setState({products});
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