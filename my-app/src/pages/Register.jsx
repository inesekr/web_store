import { useEffect, useState } from "react";

function Register() {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRep, setPasswordRepeat] = useState("");
    const [userGroup, setUserGroup] = useState("");
    const [userGroups, setUsergroups] = useState([]);

    useEffect(() => {

        if (userGroups.length === 0) {
            const headers = new Headers();
            headers.append("Content-type", "application/json");
            fetch("http://localhost/Accenture_final_web_store/backend/userManagement/GetUserGroups.php", {
                method: "GET",
                headers: headers
            }).then((response) => {
                response.json().then((body) => {
                    setUsergroups(body.usergroups);
                })
            });
        }
    }, [])

    const onRegister = (event) => {
        event.preventDefault();
        if (password !== passwordRep) {
            alert("Password don't match");
            return;
        }

        const headers = new Headers();
        headers.append("Content-type", "application/json");
        fetch("http://localhost/Accenture_final_web_store/backend/userManagement/RegisterUser.php", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                username: username,
                password: password,
                role: userGroup
            })
        }).then((response) => {
            response.json().then((body) => {
                if (body.userCreated === true)
                    alert("User is registered");
                else {
                    alert(body.error);
                }
            })
        })
    }

    return (
        <div>
            <form onSubmit={(event) => { onRegister(event) }} method="POST">
                <div className="form-outline mb-4">
                    <input type="text" id="username" name="username" className="form-control"
                        onChange={(event) => {
                            setUserName(event.target.value)
                        }}
                    />
                    <label className="form-label" htmlFor="username">Username</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="password" name="password" className="form-control"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    <label className="form-label" htmlFor="password">Password</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="passwordRep" className="form-control"
                        onChange={(event) => {
                            setPasswordRepeat(event.target.value)
                        }}
                    />
                    <label className="form-label" htmlFor="passwordrep">Repeat Password</label>
                </div>

                <div className="form-outline mb-4">

                    <select id="userGroup" onChange={(event) => {
                        setUserGroup(event.target.value)
                    }}>
                        {userGroups.map((userGroup) => {
                            return (
                                <option key={userGroup.id} value={userGroup.id}>{userGroup.text}</option>)
                        })}
                    </select>
                    <label className="form-label" htmlFor="userGroup">User role</label>
                </div>
                <button className="btn btn-primary" >Register</button>
            </form>
        </div>
    )
}

export default Register;