let socket:any = null;

export const connectSocket = (token:any) =>{
  console.log(token)
  socket = new WebSocket(`http://localhost:3000?token=${token}`);
  return socket;
} 

export const getSocket = () => socket;