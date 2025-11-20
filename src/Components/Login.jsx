import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/url";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    if (isLoginForm) {
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
        dispatch(addUser(data.data._doc));
        navigate("/");
      } catch (err) {
        setError(err.response?.data?.message || "Login failed");
      }
    } else {
      try {
        const response = await axios.post(
          BASE_URL + "/auth/signup",
          {
            emailId: email,
            password,
            firstName,
            lastName,
            age,
            gender,
          },
          { withCredentials: true }
        );
        const data = response.data;
        dispatch(addUser(data.data));
        navigate("/profile");
      } catch (err) {
        setError(err.response?.data?.message || "Signup failed");
      }
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="card card-border bg-base-300 w-96">
        <h1 className="text-center text-2xl font-bold mt-4 mb-2">
          {isLoginForm ? "Login" : "Sign Up"}
        </h1>
        <div className="card-body py-2">
          {!isLoginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  placeholder="Age must be greater than 18"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  className="input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </fieldset>
            </>
          )}
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
          <div className="flex justify-between items-center">
            <span className="link" onClick={() => setIsLoginForm(!isLoginForm)}>
              {isLoginForm ? "Sign up" : "Login"}
            </span>
            <div className="card-actions justify-end">
              {error && <p className="text-red-500"> Error: {error}</p>}
              <button
                className="btn btn-primary"
                onClick={() => handleLoginClick()}
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
