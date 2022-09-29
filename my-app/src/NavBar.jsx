import { useState } from "react";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { Basket } from "./Basket";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {

    const [currentPage, setCurrentPage] = useState(window.location.pathname);

    const onLogout = () => {
        sessionStorage.removeItem("user");
        window.location.reload();
    }

    return (
        <>        <Navbar bg="dark" expand="sm">
            <Container>
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <div style={{ paddingLeft: "20px", paddingTop: "6px" }} className={currentPage === "/" ? "nav-item nav-item-active" : "nav-item"}>
                            <Link to="/" onClick={() => { setCurrentPage("/") }}>Home</Link>
                        </div>
                        <div style={{ paddingLeft: "20px", paddingTop: "6px" }} className={currentPage === "/loadPage" ? "nav-item nav-item-active" : "nav-item"}>
                            <Link to="/loadPage" onClick={() => { setCurrentPage("/loadPage") }}>LoadPage</Link>
                        </div>
                    </Nav>
                    <Nav>

                        <Dropdown size="lg" style={{ color: "white", fontSize: "20px" }}
                            className="btn btn-dark"
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

                        </Dropdown>

                        <Button size="lg" style={{ paddingLeft: "12px" }}
                            className="btn btn-secondary ">
                            <Link to="/basket" onClick={() => { setCurrentPage("/basket") }}><FontAwesomeIcon icon={faBasketShopping} /></Link>
                        </Button>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
            <Outlet></Outlet>

        </>
    );
}

export default NavBar;

{/* <li className={currentPage === "/" ? "nav-item nav-item-active" : "nav-item"}>
                            <Link to="/" onClick={() => { setCurrentPage("/") }}>Home</Link>
                            {/* <button className="btn" onClick={() => openPage("HomePage")}>Home</button> */}
{/*} </li> */ }


{/* <div className="nav-item">
                        JSON.parse(sessionStorage.getItem("user")).roleID === 3 &&
                                <Link to="/basket" onClick={() => { setCurrentPage("/basket") }}>Basket</Link>
                        </div> */}

{/* <button className="nav-item">
                        <Link to="/basket" onClick={() => { setCurrentPage("/basket") }}><FontAwesomeIcon icon={faBasketShopping} /></Link>
                    </button> */}

