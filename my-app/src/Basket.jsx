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

    const onCheckout = () => {

        // let productsToCheckout = JSON.parse(sessionStorage.getItem("basket"));
        // console.log(productsToCheckout);

        // let link;
        // for (let i = 0; i < productsToCheckout.length; i++) {
        //     if (productsToCheckout[i] !== true)
        //         continue;
        //     const productId = i;
        //     const product = products.find((product) => {
        //         return product.id === productId;
        //     })
        //     productsToCheckout.push(product);
        // }

        const headers = new Headers();
        headers.append("Content-type", "application/json");

        fetch("http://localhost/Accenture_final_web_store/backend/Checkout.php", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ "basket": products })
            // body: JSON.parse({ "basket": products })
            // body: JSON.parse(sessionStorage.getItem("basket"))
            // body: { "basket": products }
        })
            .then((response) => {
                // response.json().then((body) => {

                // alert(body);
                clearBasket();

                //         // const productsInit = products;
                //         // setProductTable(productsInit);
                //         // setState({ productsToCheckout: [] });
                // })
            })
    }



    return (
        <div className="container">
            {products.map((product) => {
                return (
                    <div className="row" key={product.id}>
                        <div className="col">
                            {product.item}
                        </div>
                        <div className="col">
                            {product.price}
                        </div>
                        {/* <div className="col">
                            {product.quantityInBasket}
                        </div> */}
                        <div className="col">
                            <FontAwesomeIcon icon={faMinus}
                                onClick={() => {
                                    changeQuantity(product.id, -1)
                                }}
                                className="plusminus click" />
                            {product.quantityInBasket}
                            <FontAwesomeIcon icon={faPlus}
                                className="plusminus click"
                                onClick={() => {
                                    changeQuantity(product.id, 1)
                                }}
                            />
                        </div>
                        <div className="col">
                            <a className="click" onClick={() => {
                                removeProductFromBasket(product.id);
                            }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </a>
                        </div>


                        <div className="col">
                            total:
                        </div>
                    </div>
                )
            })}
            <button onClick={onCheckout} className="btn btn-success">Checkout</button>

            <button onClick={clearBasket} className="btn btn-danger">Clear Basket</button>

        </div>
    )
}

export default Basket;