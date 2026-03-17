import { subscribe } from "../events/eventBus.js";
import { broadcastToRoom } from "../ws/roomManager.js";
import { createNotification } from "./notification.service.js";


subscribe("exam_created", async (payload) => {

  const notification = await createNotification({
    title: "New Exam Created",
    message: payload.title,
    classId: payload.classId,
    type: "Exam"
  })

  broadcastToRoom(payload.classId, {
    type: "exam_created",
    notification
  });

});