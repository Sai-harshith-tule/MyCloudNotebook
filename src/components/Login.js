import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate("/");
        } else {
            alert("Invalid credentials!");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fs-4">Email address</label>
                            <input type="email" className="form-control fs-4" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text fs-6"><i>We'll never share your email with anyone else.</i></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fs-4">Password</label>
                            <input type="password" className="form-control fs-4" value={credentials.password} onChange={onChange} name='password' id="password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Login;
