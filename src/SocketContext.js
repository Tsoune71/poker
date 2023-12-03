import React, { createContext } from "react";
import Socket from "./Socket";

const SocketContext = createContext(Socket);

export default SocketContext;