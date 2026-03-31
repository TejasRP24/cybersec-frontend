import { io } from "socket.io-client";

const SOCKET_URL = "https://backendinfinitum.psgtech.ac.in/";

const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, // Don't connect automatically — call socket.connect() manually when needed
  reconnectionAttempts: 5, // Stop retrying after 5 failed attempts (prevents infinite 404 spam)
  reconnectionDelay: 3000,
  transports: ["websocket"], // Skip polling, go straight to WebSocket (avoids the 404 polling loop)
});

export default socket;
