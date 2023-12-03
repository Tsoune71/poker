import { createGlobalState } from "react-hooks-global-state";
export const { GlobalStateProvider, useGlobalState } = createGlobalState({
    email: "",
    pseudo: "",
    socket: "",
    id: "",
    money: 0,
    logo:"./pictures/default.png",
    message: [
        { pseudo: "tsoune", data: "vous a demandé  en ami", id: "8156" },
        { pseudo: "tsoune", data: "vous a demandé  en ami", id: "8156" },
        { pseudo: "tsoune", data: "vous a demandé  en ami", id: "8156" },
        { pseudo: "tsoune", data: "vous a demandé  en ami", id: "8156" },
        { pseudo: "tsoune", data: "vous a demandé  en ami", id: "8156" },
        { pseudo: "tsoune", data: "vous a demandé  en ami", id: "8156" },
        { pseudo: "tsoune", data: "vous a demandé  en ami", id: "8156" },
        { pseudo: "tsoune", data: "vous a demandé  en ami", id: "8156" },
        { pseudo: "tsoune", data: "vous a demandé  en ami", id: "8156" },
        { pseudo: "tsoune", data: "vous a demandé  en ami", id: "8156" },
    ],
    friends: [],
    window3Sign: 0,
});
