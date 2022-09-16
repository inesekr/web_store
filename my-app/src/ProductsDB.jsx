import React from 'react';
import Products from './Products';

class ProductsDB extends React.Component {

    productsInit = (me) => {
        const self = me;

        fetch("http://localhost/Accenture_final_web_store/backend/products.php", {
            method: "GET"
        }).then(function (response) {
            if (response.ok) {
                response.json().then(products => {
                    self.setProductTable(products);
                });
            }
        })
    }

    render() {
        return (
            <Products productsInit={this.productsInit}></Products>
        )
    }

}

export default ProductsDB;