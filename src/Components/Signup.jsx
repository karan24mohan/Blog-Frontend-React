import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleSubmit = async () => {
    const result = await fetch("http://localhost:3100/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    const data = await result.json();
    console.log(data);
    if (result.status === 200) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.result.name,
          email: data.result.email,
          password: data.result.password,
        })
      );
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="form-container-wrapper">
        <div className="form-container">
          <h2>Login</h2>
          <form action="#">
            <div className="k-input-group">
              <label htmlFor="email">Name</label>
              <input
                type="text"
                name="Name"
                id="name"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="k-input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="k-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="k-btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <p className="signupLink">
              Already Registered ? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default Signup;
