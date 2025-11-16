import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/url";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../utils/feedSlice";
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

  const handleSendRequest = async (feedId, action) => {
    try {
      const response = await axios.post(
        BASE_URL + `/requests/send/` + action + `/` + feedId,
        {},
        { withCredentials: true }
      );

      dispatch(removeFeed(feedId));
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
    }
  };

  useEffect(() => {
    getFeeds();
  }, [page]);
  return (
    <div className="flex justify-center p-8">
      {feeds && feeds.length > 0 && (
        <UserCard feed={feeds[0]} handleSendRequest={handleSendRequest} />
      )}
      {feeds && feeds.length === 0 && <p>No feeds available.</p>}
    </div>
  );
};
