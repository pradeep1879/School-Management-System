import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { joinRoom, leaveRoom, removeSocket } from "./roomManager.js";
import config from "../../../config.js";

export const startWebSocket = (server) => {

  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {

    try {

      const url = new URL(req.url, "http://localhost");
      const token = url.searchParams.get("token");

      if (!token) {
        ws.close();
        return;
      }

      const decoded = jwt.verify(token, config.JWT_SECRET);

      ws.user = decoded;

      // automatically join rooms
      if (decoded.classId) {
        joinRoom(ws, decoded.classId);
      }

      joinRoom(ws, `user_${decoded.id}`);

    } catch (error) {
      ws.close();
      return;
    }

    ws.on("message", (data) => {

      let message;

      try {
        message = JSON.parse(data.toString());
      } catch {
        return;
      }

      const { event, room } = message;

      if (event === "leave_room") {
        leaveRoom(ws, room);
      }

    });

    ws.on("close", () => {
      removeSocket(ws);
    });

  });

};