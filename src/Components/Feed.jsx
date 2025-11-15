import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/url";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { UserCard } from "./UserCard";

export const Feed = () => {
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const feeds = useSelector((state) => state.feed);

  const getFeeds = async () => {
    try {
      const res = await axios.get(BASE_URL + `/user/feed`, {
        withCredentials: true,
        params: {
          page,
          limit: 20,
        },
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Error fetching feeds data:", err);
    }
  };

  useEffect(() => {
    getFeeds();
  }, [page]);
  return (
    <div className="flex justify-center p-8">
      {feeds && <UserCard feed={feeds[1]} />}
    </div>
  );
};
