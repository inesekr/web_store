import React from 'react';

class InputProduct extends React.Component {

    constructor() {
        super();
        this.state = {
            brand: "",
            model: "",
            price: ""
        }
    }

    onSave = (event) => {
        let self = this;
        const headers = new Headers();
        headers.append("Content-type", "application/json");
        fetch("http://localhost/Accenture_final_web_store/backend/createProduct.php", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(self.state)
        }).then(function (response) {
            response.json().then((body) => {
                alert(body);
            })
        })
    }

    onBrandChange = (event) => {
        this.setState({ brand: event.target.value });
    }

    onModelChange = (event) => {
        this.setState({ model: event.target.value });
    }

    onPriceChange = (event) => {
        this.setState({ price: event.target.value });
    }
    render() {
        return (

            <form onSubmit={this.onSave}>
                <div className="form-group">
                    <label htmlFor="brand">Brand</label>
                    <input id="brand"
                        fieldname="brand" value={this.state.brand}
                        onChange={this.onBrandChange}></input>
                    <label htmlFor="model">Model</label>
                    <input id="model"
                        fieldname="model" value={this.state.model}
                        onChange={this.onModelChange}></input>

                    <label htmlFor="price">Price</label>
                    <input id="price"
                        fieldname="price" value={this.state.price}
                        onChange={this.onPriceChange}></input>
                    <button className="btn btn-primary">Save</button>
                </div>
            </form>

        );
    }
}

export default InputProduct;