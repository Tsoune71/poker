import io from "socket.io-client";

const Socket = io(process.env.REACT_APP_IPserver);

export default Socket;