import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserCard } from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../constants/url";
import { addUser } from "../utils/userSlice";
import { Notification } from "./Notification";

export const Profile = () => {
  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhoto] = useState("");
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setPhoto(user.photoUrl || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    const updatedData = {
      firstName,
      lastName,
      age,
      gender,
      about,
      photoUrl,
    };
    setError(null);
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        updatedData,
        { withCredentials: true }
      );
      const data = response.data;
      dispatch(addUser(data.data));
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      setShowNotification(true);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      {showNotification && (
        <Notification message="Profile updated successfully!" type="success" />
      )}
      {user && (
        <div className="flex justify-center my-10">
          <div className="flex justify-center mr-10">
            <div className="card card-border bg-base-300 w-96">
              <div className="card-body">
                Edit Profile
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
                    type="text"
                    placeholder="Age"
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
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    placeholder="URL of Photo"
                    className="input"
                    value={photoUrl}
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <textarea
                    className="textarea"
                    placeholder="About"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </fieldset>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    Update
                  </button>
                </div>
                {error && <p className="text-red-500"> Error: {error}</p>}
              </div>
            </div>
          </div>
          <UserCard
            feed={{ firstName, lastName, about, age, gender, photoUrl }}
          />
        </div>
      )}
    </>
  );
};
