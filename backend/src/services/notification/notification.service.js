import { client } from "../../prisma/db.js"

export const createNotification = async (data) =>{
  try {
    const notification = await client.notification.create({
      data:{
        data
      }
    })
    return notification;
  } catch (error) {
    console.log(error)
  }
}