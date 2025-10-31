import axios from "axios";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          emailId: email,
          password,
        },
        // this send the cookies in the request
        { withCredentials: true }
      );
      const data = response.data;
      console.log(data);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => handleLoginClick()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
