import { createGlobalState } from "react-hooks-global-state";
export const { GlobalStateProvider, useGlobalState } = createGlobalState({
    email: "",
    pseudo: "",
    socket: "",
    id: "",
    money: 0,
    logo:"./pictures/default.png",
    message: [],
    friends: [],
    window3Sign: 0,
});
