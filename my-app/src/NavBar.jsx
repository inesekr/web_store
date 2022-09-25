import { useState } from "react";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { Basket } from "./Basket";
// function NavBar({ openPage }) {
function NavBar() {

    const [currentPage, setCurrentPage] = useState(window.location.pathname);

    const onLogout = () => {
        sessionStorage.removeItem("user");
        window.location.reload();
    }

    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className={currentPage === "/" ? "nav-item nav-item-active" : "nav-item"}>
                            <Link to="/" onClick={() => { setCurrentPage("/") }}>Home</Link>
                            {/* <button className="btn" onClick={() => openPage("HomePage")}>Home</button> */}
                        </li>

                        <li className={currentPage === "/loadPage" ? "nav-item nav-item-active" : "nav-item"}>
                            {/* {this.state.user.roleID === 1 && */}
                            <Link to="/loadPage" onClick={() => { setCurrentPage("/loadPage") }}>Load Page</Link>
                        </li>
                        {/* <div className="nav-item">
                        JSON.parse(sessionStorage.getItem("user")).roleID === 3 &&
                                <Link to="/basket" onClick={() => { setCurrentPage("/basket") }}>Basket</Link>
                        </div> */}

                    </ul>
                </div>

                <ul className="nav navbar-nav nav-list navbar-right mr-auto">
                    <button className="user">
                        <li className="username">
                            <a>{JSON.parse(sessionStorage.getItem("user")).username}</a>
                        </li>
                    </button>
                    <li className="nav-item">
                        <a className="press" onClick={onLogout}>Logout</a>
                    </li>
                    <button className="nav-item">
                        <Link to="/basket" onClick={() => { setCurrentPage("/basket") }}><FontAwesomeIcon icon={faBasketShopping} /></Link>
                    </button>



                </ul>
            </nav>
            <Outlet></Outlet>
        </>
    )
}

export default NavBar;