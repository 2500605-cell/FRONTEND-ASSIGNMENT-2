
 // Name: Adeena Akram
 // Registration No: 2500605

import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import useDocumentTitle from "../hooks/useDocumentTitle";

function LoginPage({ onLoginSuccess }) {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const usernameRef = useRef(null);

  useDocumentTitle("Login | CoursePortal");

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      setError("");
      onLoginSuccess();
    } else {
      setError("Incorrect username or password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">CP</div>

        <h1>Welcome Back!</h1>
        <p className="subtitle">Login to your Student Course Portal</p>

        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <Button type="submit" className="login-btn">
            Login to Portal
          </Button>
        </form>

        <div className="login-details">
          <h4>Demo Accounts</h4>
          <p>Admin: admin / admin123</p>
          <p>Student 1: student1 / student123</p>
          <p>Student 2: student2 / student123</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
