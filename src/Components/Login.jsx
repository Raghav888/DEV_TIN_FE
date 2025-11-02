import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/url";

export const Login = () => {
  const [email, setEmail] = useState("elon@gmail.com");
  const [password, setPassword] = useState("shivani@9876");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/auth/login",
        {
          emailId: email,
          password,
        },
        // this send the cookies in the request
        { withCredentials: true }
      );
      const data = response.data;
      // to store the user data in redux store
      dispatch(addUser(data.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
            <p className="text-red-500"> Error: {error}</p>
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
