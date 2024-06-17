import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name:"", email: "", password: "", cpassword:"" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password })
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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-5">Name</label>
          <input type="text" className="form-control fs-5" name='name' id="name" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label fs-5">Email address</label>
          <input type="email" className="form-control fs-5" name='email' id="exampleInputEmail1" onChange={onChange} aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text fs-5">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-5">Password</label>
          <input type="password" className="form-control fs-5" name='password' id="password" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label fs-5">Confirm Password</label>
          <input type="password" className="form-control fs-5" name='cpassword' id="cpassword" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary fs-5">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
