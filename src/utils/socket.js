import io from "socket.io-client";
import { BASE_URL } from "../constants/url";

// Differentiate between local and production environments for socket connection
// as /api/socket.io is used in production deployment, if we dont use that path,
// socket.io will try to connect to the root path /socket.io which will not be found
// resulting in 404 errors.
export const socket = location.hostname === "localhost" ? io(BASE_URL, {
    withCredentials: true,
    transports: ["websocket"],
}) : io("/", { path: "/api/socket.io", transports: ["websocket"], withCredentials: true });
