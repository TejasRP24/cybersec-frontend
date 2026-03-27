import { io } from "socket.io-client";

const SOCKET_URL = "https://cybersec-event-backend.onrender.com";

const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: true,
});

export default socket;
