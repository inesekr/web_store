import React from 'react';
import Products from './Products';

class ProductsFile extends React.Component {

    productsInit = (sourceObj) => {
        const headers = new Headers();
        const filename = this.props.filename
        headers.append("Content-type", "application/json");
        fetch("http://localhost/Accenture_final_web_store/backend/getFileContent.php", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(filename)
        }).then(function (response) {
            if (response.ok) {
                response.json().then(data => {
                    sourceObj.setProductTable(data.products);
                });
            }
        })
    }

    render() {
        return (
            <Products productsInit={this.productsInit} allNew={true}></Products>
        )
    }
}

export default ProductsFile