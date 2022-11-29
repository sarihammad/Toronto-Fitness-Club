import {useContext, useState} from "react";
import AuthContext from "../context/AuthContext";
import Form from 'react-bootstrap/Form';


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let {error} = useContext(AuthContext)
    let {loginUser} = useContext(AuthContext)
    const handleSubmit = e => {
        e.preventDefault();
        /*const username = e.target.username.value;
        const password = e.target.password.value;*/
        console.log("logging in with", username, password)
        loginUser(username, password);
    };

    return (
        <section>
            <Form onSubmit={handleSubmit}>
                <h1>Login </h1>
                <hr />
                <div className="mb-3">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Enter Username" onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Login</button>
                <br></br>
                <br></br>
                <br></br>
                {error && <span className="alert alert-secondary">{error}</span>}
            </Form>
        </section>
    );
};

export default LoginPage;