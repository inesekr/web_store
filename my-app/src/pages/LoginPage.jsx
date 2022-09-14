import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function LoginPage() {

    const [register, setRegister] = useState(false);

    return (
        <div className="container">
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <button type="button" className={register ? "btn" : "btn btn-primary"}
                                onClick={() => { setRegister(false) }}>
                                Login
                            </button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className={!register ? "btn" : "btn btn-primary"}
                                onClick={() => { setRegister(true) }}>
                                Register
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            {!register &&
                <Login></Login>}
            {register &&
                <Register></Register>}
        </div>
    )

}

export default LoginPage;