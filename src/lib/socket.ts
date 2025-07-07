// lib/socket.ts
import { io, Socket } from "socket.io-client";

const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const socket: Socket = io(backendUrl, {
  transports: ["websocket"],
  withCredentials: true,
});
