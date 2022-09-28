import { useState } from "react";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { Basket } from "./Basket";


function NavBar() {

    const [currentPage, setCurrentPage] = useState(window.location.pathname);

    const onLogout = () => {
        sessionStorage.removeItem("user");
        window.location.reload();
    }

    return (
        <>
            <nav className="navbar navbar-nav fixed-top navbar-expand-md navbar-light bg-dark">
                {/* <div className="collapse navbar-collapse"> */}
                <div className="container">


                    {/* <a className="navbar-brand" href="/">MyShop</a> */}


                    <ul className="navbar-nav mr-auto navbar-left">

                        <li
                            className="home text-uppercase text-dark btn-light">
                            <a className={currentPage === "/" ? "nav-item nav-item-active" : "nav-item"}>
                                <Link to="/" onClick={() => { setCurrentPage("/") }}>Home</Link>
                                {/* <button className="btn" onClick={() => openPage("HomePage")}>Home</button> */}
                            </a>
                        </li>

                        {/* <li className={currentPage === "/" ? "nav-item nav-item-active" : "nav-item"}>
                            <Link to="/" onClick={() => { setCurrentPage("/") }}>Home</Link>
                            {/* <button className="btn" onClick={() => openPage("HomePage")}>Home</button> */}
                        {/*} </li> */}

                        <li
                            className="btn-light">
                            <li className={currentPage === "/loadPage" ? "nav-item nav-item-active" : "nav-item"}>
                                {/* {this.state.user.roleID === 1 && */}
                                <Link to="/loadPage" onClick={() => { setCurrentPage("/loadPage") }}>Load Page</Link>
                            </li>
                        </li>
                        {/* <div className="nav-item">
                        JSON.parse(sessionStorage.getItem("user")).roleID === 3 &&
                                <Link to="/basket" onClick={() => { setCurrentPage("/basket") }}>Basket</Link>
                        </div> */}

                    </ul>

                    <ul className="nav navbar-nav nav-list navbar-right mr-auto">

                        <div className="mb-2">
                            <Dropdown as={ButtonGroup} size="lg">
                                <Button
                                    className=" btn-dark"
                                >
                                    {JSON.parse(sessionStorage.getItem("user")).username}

                                    <Dropdown.Toggle
                                        split
                                        variant={JSON.parse(sessionStorage.getItem("user")).username}
                                        id="dropdown-split-basic"
                                    />
                                    <Dropdown.Menu className="dropdown-link">
                                        <Dropdown.Item eventKey="logout" onClick={onLogout}>
                                            Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>

                                </Button>

                            </Dropdown>
                        </div>

                        <Button
                            className="mb-2 btn-dark">
                            <Link to="/basket" onClick={() => { setCurrentPage("/basket") }}><FontAwesomeIcon icon={faBasketShopping} /></Link>
                        </Button>

                        {/* <button className="nav-item">
                        <Link to="/basket" onClick={() => { setCurrentPage("/basket") }}><FontAwesomeIcon icon={faBasketShopping} /></Link>
                    </button> */}

                    </ul>

                </div>


            </nav>
            <Outlet></Outlet>
        </>
    );
}

export default NavBar;