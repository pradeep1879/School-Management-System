import { useEffect } from "react";
import { useNotificationContext } from "../context/NotificationContext"
import { useAuthStore } from "@/store/auth.store";
import { connectSocket } from "../services/socket";


export const useNotifications = () =>{
  const { addNotification } = useNotificationContext();

  useEffect(() =>{
    const { token } = useAuthStore()
    console.log("student token", token)
    const socket = connectSocket(token);

    socket.onopen = () =>{
      console.log("Websocket connected")
    }

    socket.onmessage = (event:any) =>{
      const message = JSON.parse(event.data);

      addNotification(message);
    };

    socket.onclose = () =>{
      console.log("Websocket disconnected");
    }

    return () => socket.close();
  }, []);
}