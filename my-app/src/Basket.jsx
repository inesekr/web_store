import { useState, useEffect } from "react";
// import Products from "./Products";

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
                        <div className="col">
                            {product.quantityInBasket}
                        </div>
                        <div className="col">
                            total:
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Basket;