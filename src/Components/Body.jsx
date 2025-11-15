import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./NavBar";
import { Footer } from "./Footer";
import axios from "axios";
import { BASE_URL } from "../constants/url";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

export const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user data:", err);
    }
  };

  // when page is refreshed, fetch user data from backend
  useEffect(() => {
    // if user already presnet in redux store, no need to fetch again
    if (!user) {
      fetchUserData();
    }
  }, []);
  return (
    <>
      <Navbar />
      {/* Here the based on route component will be loaded in outlet's place */}
      <Outlet />
      <Footer />
    </>
  );
};
