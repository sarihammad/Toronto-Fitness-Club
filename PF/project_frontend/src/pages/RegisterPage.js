import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_num, setPhoneNum] = useState("")
    const [image, setImage] = useState(null)
    const navigate = useNavigate();


    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('username', username);
        form_data.append('password', password);
        form_data.append('first_name', first_name);
        form_data.append('last_name', last_name);
        form_data.append('email', email);
        form_data.append('phone_num', phone_num)
        form_data.append('avatar', image);
        let url = 'http://127.0.0.1:8000/accounts/register/';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data);
                navigate("/login");
            })
            .catch(err => console.log(err))
    };

    return (
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
                    id="image"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                />
            </div>
            <Button variant="primary" type="submit">Register</Button>
            <br></br>
            <br></br>
            <br></br>
        </Form>
    )




/*    const [username, setUsername] = useState("");
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
*/
}

export default Register;