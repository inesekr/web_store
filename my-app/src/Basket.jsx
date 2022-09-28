import { useState, useEffect } from "react";
import Products from "./Products";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

function Basket() {

    const [products, changeProducts] = useState([]);

    useEffect(() => {
        if (sessionStorage.getItem("basket") === null) {
            sessionStorage.setItem("basket", JSON.stringify([]));
        }
        else {

            const productsBasket = JSON.parse(sessionStorage.getItem("basket"));
            changeProducts(productsBasket);
        }
    }, [])

    const clearBasket = () => {
        sessionStorage.setItem("basket", JSON.stringify([]));
        changeProducts([]);
        sessionStorage.removeItem("products");
        window.location.reload();
    }

    const changeQuantity = (id, quantity) => {
        let basket = JSON.parse(sessionStorage.getItem("basket"));

        const productInBasket = basket.find((product) => {
            return product.id == id;
        })

        if (productInBasket.quantityInBasket === -quantity) {
            removeProductFromBasket(id);
            return;
        }
        productInBasket.quantityInBasket += quantity;

        const productsUpdated = JSON.parse(sessionStorage.getItem("products"));
        const product = productsUpdated.find((product) => {
            return product.id === id;
        });

        product.quantity += -quantity;

        if (product.quantity < 0) {
            alert("No more items available!");
            return;
        }

        sessionStorage.setItem("products", JSON.stringify(productsUpdated));
        sessionStorage.setItem("basket", JSON.stringify(basket));
        window.location.reload();
    }

    const removeProductFromBasket = (id) => {

        let basket = JSON.parse(sessionStorage.getItem("basket"));
        const productInBasket = basket.find((product) => {
            return product.id == id;
        })
        const productsUpdated = JSON.parse(sessionStorage.getItem("products"));
        const product = productsUpdated.find((product) => {
            return product.id === id;
        });
        product.quantity += productInBasket.quantityInBasket;
        basket = basket.filter(function (product) {
            return product.id !== id;//remove product from basket
        })

        sessionStorage.setItem("products", JSON.stringify(productsUpdated));
        sessionStorage.setItem("basket", JSON.stringify(basket));
        window.location.reload();
    }

    const onCheckout = (id) => {

        // let basket = JSON.parse(sessionStorage.getItem("basket"));

        // const product = basket.find((product) => {
        //     return product.id === id;
        // });

        const productsToUpdate = JSON.parse(sessionStorage.getItem("products"));

        // const product = productsToUpdate.find((product) => {
        //     return product.id === id;
        // });

        const headers = new Headers();
        headers.append("Content-type", "application/json");

        fetch("http://localhost/Accenture_final_web_store/backend/checkout.php", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ "products": productsToUpdate })
        })
            .then((response) => {
                response.json().then((body) => {

                    alert(body);
                    clearBasket();

                    const productsInit = products;
                    // setProductTable(productsInit);
                    // setState({ productsToCheckout: [] });
                })
            })
    }


    function calculateTotal() {
        let total = 0;

        // const productInBasket = basket.find((product) => {
        //     return product.id == id;
        // })

        // const product = productsUpdated.find((product) => {
        //     return product.id === id;
        // });

        // let basket = JSON.parse(sessionStorage.getItem("basket"));
        // console.log(basket);
        // let subtotal = document.getElementsById("subtotal").value;
        // console.log(subtotal);

        // for (let i = 0; i < basket.length; i++) {

        //     total += subtotal;
        // }
        return total;

        // for (let i = 0; i < productsInBasket.length; i++) {
        //     total += productsInBasket.value;
        // }



        // console.log(basket.length);
        // let productsInBasket = basket.find((product) => {
        //     return product.id == id;
        // });
        // console.log(id);
        // for (let i = 0; i < productsInBasket.length; i++) {
        //     let productInBasket =
        //         console.log(productInBasket);
        // }

        // const productsUpdated = JSON.parse(sessionStorage.getItem("products"));

        // const price = Number(productsUpdated.price);

        // const quantity = Number(productsUpdated.quantityInBasket);
        // let productValue = Number(price * quantity);

        // total += productValue[i];

    }



    return (
        <div className="container my-5">
            <div>
                {products.map((product) => {
                    return (
                        <div className="row" key={product.id}>
                            <div className="col">
                                {product.item}
                            </div>
                            <div className="col">
                                {product.price}
                            </div>
                            <div className="col">
                                <button className="btn">
                                    <FontAwesomeIcon icon={faMinus}
                                        onClick={() => {
                                            changeQuantity(product.id, -1)
                                        }}
                                        className="plusminus click" /></button>
                                {product.quantityInBasket}
                                <button className="btn"><FontAwesomeIcon icon={faPlus}
                                    className="plusminus click"
                                    onClick={() => {
                                        changeQuantity(product.id, 1)
                                    }}
                                /></button>
                            </div>
                            <div className="col">
                                <a className="click" onClick={() => {
                                    removeProductFromBasket(product.id);
                                }}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </a>
                            </div>

                            <div className="col">
                                subtotal: EUR
                            </div>
                            <div id="subtotal" className="col">
                                {Number(product.quantityInBasket * product.price)}
                            </div>
                        </div>
                    )
                })}


                <div>Total:  <i>Here will be total sum for order</i></div>
                <div>
                    {calculateTotal()}
                </div>

                <button onClick={onCheckout} className="btn btn-success">Checkout</button>
                <button onClick={clearBasket} className="btn btn-danger">Clear Basket</button>


            </div >
        </div>
    )
}

export default Basket;