import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(inputs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="w-screen h-screen bg-login-bg bg-auto">
      <div className="container w-full h-full">
        <div className="mx-5 px-5 flex flex-col items-center justify-center h-full">
          {/* Header for title */}
          <div className="text-center m-5 space-y-4">
            <h1 className="text-4xl font-bold">
              Blog
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Stack
              </span>
            </h1>

            <p>
              A place to learn and share your ideas to the{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold">
                World!
              </span>
            </p>
          </div>

          <form className="bg-white flex flex-col p-5 rounded-lg md:p-10">
            <h1 className="text-2xl font-semibold">Login</h1>
            <input
              className="px-2 py-1 border-2  rounded-md my-2  focus:border-cyan-500 focus:outline-none"
              required
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              required
              className="px-2 py-1  border-2  rounded-md my-2  focus:border-blue-500 focus:outline-none"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              className="rounded-full my-2 bg-gradient-to-r from from-cyan-500 to-blue-500 py-2 text-white font-semibold"
            >
              Login
            </button>
            {err && <p>{err}</p>}
            <span className="text-sm text-slate-500 my-5">
              Don't you have an account? <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
