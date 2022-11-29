import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

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
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <hr />
                <div className="mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Last Name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone_num">Phone Number</label>
                    <input
                        type="text"
                        id="phone_num"
                        onChange={e => setPhoneNum(e.target.value)}
                        placeholder="Phone Number"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="avatar">Avatar (Optional)</label>
                    <input
                        type="file"
                        id="avatar"
                        onChange={e => setAvatar(e.target.files[0])}
                    />
                </div>
                <button>Register</button>
                <br></br>
                <br></br>
                <br></br>
                {registerError && <span className="alert alert-secondary">{registerError}</span>}
            </form>
        </section>
    );
}

export default Register;