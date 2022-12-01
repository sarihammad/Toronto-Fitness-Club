import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const [password2, setPassword2] = useState("");
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_num, setPhoneNum] = useState("")
    const [avatar, setAvatar] = useState(null)
    const { registerUser } = useContext(AuthContext);
    const {registerError} = useContext(AuthContext)

    const handleSubmit = async e => {
        e.preventDefault();
        registerUser(username, password, first_name, last_name, email, phone_num, avatar);
    };

    return (
        <section>
            <Form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <hr />
                <Form.Group className="mb-3">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control type="text" id="username" onChange={e => setUsername(e.target.value)} placeholder="*Username"/>
                </Form.Group>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <Form.Control
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        placeholder="*Password"
                        aria-describedby="passwordHelpBlock"
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        Your password must be at least 8 characters long.
                    </Form.Text>
                </div>
                <Row>
                    <Col>
                <div className="mb-3">
                    <label htmlFor="first_name">First Name</label>
                    <Form.Control
                        type="text"
                        id="first_name"
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="*First Name"
                    />
                </div>
                    </Col>
                    <Col>
                <div className="mb-3">
                    <label htmlFor="last_name">Last Name</label>
                    <Form.Control
                        type="text"
                        id="last_name"
                        onChange={e => setLastName(e.target.value)}
                        placeholder="*Last Name"
                    />
                </div>
                    </Col>
                </Row>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <Form.Control
                        type="email"
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                        placeholder="*Email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone_num">Phone Number</label>
                    <Form.Control
                        type="text"
                        id="phone_num"
                        onChange={e => setPhoneNum(e.target.value)}
                        placeholder="*Phone Number"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="avatar">Avatar (Optional)</label>
                    <Form.Control
                        type="file"
                        id="avatar"
                        accept="image/png, image/jpeg"
                        onChange={e => setAvatar(e.target.files[0])}
                    />
                </div>
                <Button variant="primary" type="submit">Register</Button>
                <br></br>
                <br></br>
                <br></br>
                {registerError && <span className="alert alert-primary">{registerError}</span>}
            </Form>
        </section>
    );
}

export default Register;