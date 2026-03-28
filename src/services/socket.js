import { io } from "socket.io-client";

const SOCKET_URL = "https://backendinfinitum.psgtech.ac.in/";

const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: true,
});

export default socket;
