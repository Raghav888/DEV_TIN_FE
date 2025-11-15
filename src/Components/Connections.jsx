import axios from "axios";
import { BASE_URL } from "../constants/url";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

export const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const getConnections = async () => {
    const response = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    const data = response.data;
    dispatch(addConnections(data.data));
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) {
    return <div>Loading...</div>;
  }

  if (connections.length === 0) {
    return (
      <div className="flex justify-center">
        <h1 className="my-2">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="text-center mb-20">
      <h1 className="my-2 text-2xl">Connections</h1>
      {connections.map((connection) => (
        <div
          key={connection._id}
          className="card card-bordered bg-base-300 w-96 mx-auto my-4"
        >
          <div className="card-body">
            <h2 className="card-title">
              {connection.firstName} {connection.lastName}
            </h2>
            <img
              src={connection.photoUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <p>Age: {connection.age}</p>
            <p>Gender: {connection.gender}</p>
            <p>About: {connection.about}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
