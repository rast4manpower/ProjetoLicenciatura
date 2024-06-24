import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const data = { username, password };
    try {
      const response = await axios.post("http://localhost:3001/auth/login", data);
      console.log("Login successful:", response.data);
      // Optionally handle success feedback or redirect to another page
    } catch (error) {
      console.error("Error logging in:", error);
      // Optionally handle error feedback
    }
  };

  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
