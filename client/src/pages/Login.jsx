import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    username: "",
    password: "",
  });
  const [err, seterr] = useState(null);

  const handlechange = (e) => {
    setinputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5175/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      navigate("/");
    } catch (err) {
      console.log(err);
      seterr(err.response.data);
    }
  };
  console.log(inputs);
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          onChange={handlechange}
          name="username"
        />
        <input
          required
          type="password"
          placeholder="password"
          onChange={handlechange}
          name="password"
        />

        <button onClick={handlesubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
