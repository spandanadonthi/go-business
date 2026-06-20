import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const token = Cookies.get("jwt_token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const submitForm = async (event) => {
    event.preventDefault();

    const userDetails = {
      email: email,
      password: password,
    };

    const url =
      "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        Cookies.set("jwt_token", data.data.token);
        navigate("/", { replace: true });
      } else {
        setErrorMsg(data.message);
      }
    } catch (error) {
      setErrorMsg("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submitForm}>
        <h1>Go Business</h1>

        <p>Sign in to open your referral dashboard.</p>

        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          type="text"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Sign in</button>

        {errorMsg !== "" && <p>{errorMsg}</p>}
      </form>
    </div>
  );
}

export default Login;