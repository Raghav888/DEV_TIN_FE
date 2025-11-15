import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../constants/url";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

export const Requests = () => {
  const dispatch = useDispatch();
  const requestData = useSelector((state) => state.requests);

  const fetchRequest = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      const data = response.data;
      dispatch(addRequests(data.data));
    } catch (err) {
      console.error("Error fetching requests data:", err);
    }
  };

  const handleRequest = async (user, action) => {
    try {
      await axios.post(
        BASE_URL + "/requests/review/" + action + "/" + user._id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(user._id));
    } catch (err) {
      console.error("Error handling request:", err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requestData) {
    return <div>Loading...</div>;
  }

  if (requestData.length === 0) {
    return (
      <div className="flex justify-center">
        <h1 className="my-2">No Requests Found</h1>
      </div>
    );
  }

  return (
    <div className="text-center mb-20">
      <h1 className="my-2 text-2xl">Connection Requests</h1>
      {requestData.map((request) => {
        const { firstName, lastName, age, photoUrl, gender, about } =
          request.requestFromId;
        return (
          <div
            key={request._id}
            className="card card-bordered bg-base-300 w-96 mx-auto my-4"
          >
            <div className="card-body">
              <h2 className="card-title">
                {firstName} {lastName}
              </h2>
              <img
                src={photoUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto"
              />
              <p>Age: {age}</p>
              <p>Gender: {gender}</p>
              <p>About: {about}</p>
              <div className="card-actions justify-center ">
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleRequest(request, "rejected")}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleRequest(request, "accepted")}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
