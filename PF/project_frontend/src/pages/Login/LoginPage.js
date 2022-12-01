import {useContext, useState} from "react";
import AuthContext from "../../context/AuthContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import '../../style.css';


const LoginPage = () => {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let {error} = useContext(AuthContext)
    let {loginUser} = useContext(AuthContext)
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        //setValidated(true);
        /*const username = e.target.username.value;
        const password = e.target.password.value;*/
        console.log("logging in with", username, password)
        loginUser(username, password);
    };

    return (
        <section className="login-box">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h1>Login </h1>
                <hr />
                <Form.Group className="mb-3">
                <Form.Label htmlFor="username">Username</Form.Label>
                    <InputGroup hasValidation>
                <Form.Control
                    type="text"
                    id="username"
                    placeholder="Enter Username"
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                    <Form.Control.Feedback type="invalid">
                        Please enter a username.
                    </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>

                <Form.Control type="password" id="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} required />
                        <Form.Control.Feedback type="invalid">
                            Please enter a password.
                        </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <br></br>
                <br></br>
                <br></br>
                {error && <span className="alert alert-primary">{error}</span>}
            </Form>
        </section>
    );
};

export default LoginPage;