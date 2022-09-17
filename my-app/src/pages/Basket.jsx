import { useState, useEffect } from "react";

function Basket() {

    const [products, changeProducts] = useState([]);

    useEffect(() => {
        if (sessionStorage.getItem("basket" === null)) {
            sessionStorage.setItem("basket", []);
        }
    })

    return (
        <div className="container">

        </div>
    )
}

export default Basket;