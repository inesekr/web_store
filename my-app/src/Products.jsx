import React from 'react';
import { useEffect, useState } from "react";
import Basket from './Basket';
import HomePage from './pages/HomePage';

class Products extends React.Component {

    constructor() {
        super();

        this.state = {
            products: [],
            productsInit: [],
            editable: false,
            productToUpdate: [],
            numberOfPages: 0,
            currentPage: 1,
            productsShown: [],
            user: JSON.parse(sessionStorage.getItem("user"))
        }
    }

    setPageShown = () => {
        const startPos = (this.state.currentPage - 1) * 9;
        let endPosit = startPos + 9;
        if (endPosit + 1 > this.state.products.length)
            endPosit = this.state.products.length;

        const productsShown = [];
        for (let i = startPos; i < endPosit; i++)
            productsShown.push(this.state.products[i]);
        this.setState({ productsShown: productsShown });
    }

    componentDidMount() {
        this.props.productsInit(this);
        // this.setPageShown();
    }

    onChangeSave = () => {

        const productToUpdate = JSON.parse(sessionStorage.getItem("products"));

        let productListUpdate = [];
        let link;

        if (this.props.allNew) {
            productListUpdate = this.state.products;
            link = "http://localhost/Accenture_final_web_store/backend/createProducts.php"
        }
        else {
            for (let i = 0; i < this.state.productToUpdate.length; i++) {
                if (this.state.productToUpdate[i] !== true)
                    continue;
                const productId = i;
                const product = this.state.products.find((product) => {
                    return product.id === productId;
                })
                productListUpdate.push(product);
            }
            link = "http://localhost/Accenture_final_web_store/backend/updateProduct.php";
        }

        console.log(productListUpdate);

        const headers = new Headers();
        headers.append("Content-type", "application/json");
        const self = this;
        fetch(link, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(productListUpdate)
        }).then(function (response) {
            response.json().then((body) => {
                alert(body);
                const productsInit = self.state.products;
                self.setProductTable(productsInit);
                self.setState({ productToUpdate: [] });
            })
        })

    }

    updateProduct = (id, fieldname, value) => {
        const products = this.state.products;//copy the array
        const productUpd = products.find((product) => {
            return product.id === id;
        })
        productUpd[fieldname] = value;
        const productsToUpdateIds = this.state.productToUpdate;
        productsToUpdateIds[id] = true;

        this.setState({ products: products, productToUpdate: productsToUpdateIds });
    }

    setProductTable(productsLoad) {
        const initProducts = [];
        productsLoad.map((obj) => {
            initProducts.push(Object.assign({}, obj));
        })
        const pagesNo = Math.ceil(productsLoad.length / 10);
        this.setState({
            products: initProducts,
            productsInit: productsLoad, numberOfPages: pagesNo
        }, this.setPageShown);
    }

    setEditable = () => {
        const editable = !this.state.editable;
        this.setState({ editable: editable });
    }

    onInputChange = (event, id) => {
        const fieldname = event.target.getAttribute("fieldname");
        const value = event.target.value;
        this.updateProduct(id, fieldname, value);
    }

    onCancel = () => {
        const products = this.state.productsInit;
        this.setProductTable(products);
        this.setEditable();
    }
    switchPageEvent = (event) => {
        this.switchPage(
            Number(event.target.innerHTML));
    }

    switchPage = (pageNo) => {
        this.setState({ currentPage: pageNo });
        this.setPageShown();
    }

    nextPage = () => {
        this.switchPage(++this.state.currentPage);
    }

    previousPage = () => {
        this.switchPage(--this.state.currentPage);
    }

    generatePageItems = () => {
        const pagesArr = [];
        if (this.state.currentPage > 1)
            pagesArr.push(<li className="page-item" key={"prev"}>
                <button type='button' className="btn btn-primary"
                    onClick={this.previousPage}>Previous</button>
            </li>)
        for (let i = 1; i <= this.state.numberOfPages; i++) {
            pagesArr.push(<li className="page-item" key={i}>
                <button type='button' className={this.state.currentPage
                    === i ? "btn btn-primary" : "btn"}
                    onClick={this.switchPageEvent}>{i}</button>
            </li>);
        }
        if (this.state.currentPage < this.state.numberOfPages)
            pagesArr.push(<li className="page-item" key={"next"}>
                <button type='button' className="btn btn-primary"
                    onClick={this.nextPage}>Next</button>
            </li>)
        return pagesArr;
    }

    onAddProduct = (productid) => {

        const id = productid;

        const products = this.state.products;

        let basket = JSON.parse(sessionStorage.getItem("basket"));
        if (basket === null) {
            basket = [];
        }
        let productInBasket = basket.find((product) => {
            return product.id == id;
        })

        const product = products.find((product) => {
            return product.id === id;
        })

        let quantity = product.quantity;

        if (productInBasket === undefined) {
            quantity--;
            const item = product.item;
            const price = product.price;

            productInBasket = { id: id, item: item, price: price, quantityInBasket: 1, quantity: quantity };
            basket.push(productInBasket);
        }
        else {
            productInBasket.quantity--;
            productInBasket.quantityInBasket++;
            quantity--;
        }

        if (quantity < 0) {
            alert("No more items available!");
            // product.quantity++;
            // quantity++;
            return;
        }

        product.quantity--;
        this.setState({
            products: this.state.products
        });

        sessionStorage.setItem("basket", JSON.stringify(basket));
        sessionStorage.setItem("products", JSON.stringify(this.state.products));
    }

    render() {
        return (
            <form method='POST'>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {this.generatePageItems()}
                    </ul>
                </nav>

                {this.state.user.roleID === 1 &&
                    <div>
                        <button className='btn btn-outline-primary
                        ' type='button' onClick={this.setEditable}>
                            Edit
                        </button>
                        <button className='btn btn-outline-success' onClick={() => { this.onChangeSave() }} type="button">
                            Save
                        </button>
                        <button className='btn btn-outline-danger' onClick={this.onCancel} type="button">
                            Cancel
                        </button>
                    </div>
                }

                <div className="products my-5 ">
                    {!(this.state.productsShown === undefined) && this.state.productsShown.map((product) => {
                        return (
                            <div className="card" key={product.id} onChange={
                                (e) => this.onInputChange(e, product.id)}>
                                {/* <div className="card-body p-4 text-center"> */}
                                <div className="card-title">
                                    <div hidden={this.state.editable}>
                                        <h4>{product.item}</h4>
                                    </div>
                                    <input hidden={!this.state.editable}
                                        fieldname="item"
                                        defaultValue={product.item}></input>
                                </div>
                                <div className="card-price">
                                    <div hidden={this.state.editable}>
                                        <sup>€</sup><span className="text-dark display-5
                                        ">{product.price}</span>
                                    </div>
                                    <input hidden={!this.state.editable}
                                        fieldname="price"
                                        defaultValue={product.price}></input>
                                </div>

                                <div className="card-text">
                                    <div hidden={this.state.editable}>
                                        <p>Quantity available:{product.quantity}</p>
                                    </div>
                                    <input hidden={!this.state.editable}
                                        fieldname="quantity"
                                        defaultValue={product.quantity}></input>
                                </div>

                                <div className="card-img">
                                    {/* <div hidden={!this.state.editable}>
                                        <p>{product.picturefile}</p>
                                    </div> */}
                                    <input hidden={!this.state.editable}
                                        fieldname="picturefile"
                                        defaultValue={product.picturefile}></input>
                                    <img src={product.picturefile} width="200" height="200" />
                                </div>

                                <div className="space-before">
                                    <p></p>
                                </div>

                                <div productid={product.id}>
                                    <button className='btn btn-secondary' onClick={(productid) => this.onAddProduct(product.id)} type="button">
                                        Add to Cart
                                    </button>
                                </div>
                                <div className="space">
                                    <p></p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </form>
        );
    }
}

export default Products;

