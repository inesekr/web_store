import React from 'react';

class InputProduct extends React.Component {

    constructor() {
        super();
        this.state = {
            item: "",
            price: "",
            quantity: ""
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

    onItemChange = (event) => {
        this.setState({ item: event.target.value });
    }

    onPriceChange = (event) => {
        this.setState({ price: event.target.value });
    }

    onQuantityChange = (event) => {
        this.setState({ quantity: event.target.value });
    }

    onPicturefileChange = (event) => {
        this.setState({ picturefile: event.target.value });
    }

    render() {
        return (

            <form onSubmit={this.onSave}>
                <div className="form-group">
                    <label htmlFor="item">Item</label>
                    <input id="item"
                        fieldname="item" value={this.state.item}
                        onChange={this.onItemChange}></input>
                    <label htmlFor="price">Price</label>
                    <input id="price"
                        fieldname="price" value={this.state.price}
                        onChange={this.onPriceChange}></input>
                    <label htmlFor="quantity">Quantity</label>
                    <input id="quantity"
                        fieldname="quantity" value={this.state.quantity}
                        onChange={this.onQuantityChange}></input>
                    <label htmlFor="picturefile">Picture File</label>
                    <input id="picturefile"
                        fieldname="picturefile" value={this.state.picturefile}
                        onChange={this.onPicturefileChange}></input>
                    <button className="btn btn-primary">Save</button>
                </div>
            </form>
        );
    }
}

export default InputProduct;