import { useContext, useEffect, useState } from "react";
import Socket from "./Socket";
import SocketContext from "./SocketContext";
import { useGlobalState } from "./data";
import Global from "./pages/Global";
import Sign from "./pages/sign/Sign";
import Cookies from "js-cookie";
import axios from "axios";

const App = () => {
    const [lunch, setlunch] = useState(false);
    const [id, setId] = useGlobalState("id");
    const setPseudo = useGlobalState("pseudo")[1];
    const setFriend = useGlobalState("friends")[1];
    const setEmail = useGlobalState("email")[1];
    const setMoney = useGlobalState("money")[1];
    const setLogo = useGlobalState("logo")[1];
    const setMessage = useGlobalState('message')[1]
    const [socket, setSocket] = useGlobalState("socket");
    const Sock = useContext(SocketContext);
    useEffect(() => {
        const getMySocket = (sock) => {
            setSocket(sock);
        };
        Sock.on("yourSocket", getMySocket);
        return () => {
            Sock.off("yourSocket", getMySocket);
        };
    }, []);
    useEffect(() => {
        const cook = Cookies.get("id");
        if (cook && socket) {
            axios.post(`${process.env.REACT_APP_IPserver}/api/user`, { id: cook, socket }).then((res) => {
                if (res.data) {
                    axios.post(`${process.env.REACT_APP_IPserver}/friend/get`, { id: cook }).then((response) => {
                        console.log(response.data);
                        if (response.data) {
                            let ff = [];
                            let friendConnected = [];
                            for (const f of response.data) {
                                if (!f.connected) f.connected = "Hors ligne";
                                else {
                                    f.connected = "En ligne";
                                    friendConnected.push(f.socket);
                                }
                                if (f.logo) {
                                    const buffer = f.logo.data;
                                    const blob = new Blob([new Uint8Array(buffer).buffer], { type: "image/jpeg" });
                                    const imageUrl = URL.createObjectURL(blob);
                                    ff.push({ pseudo: f.pseudo, statut: f.connected, url: imageUrl, id: f.id, money: f.money });
                                } else {
                                    ff.push({ pseudo: f.pseudo, statut: f.connected, url: "./pictures/default.png", id: f.id, money: f.money });
                                }
                            }
                            Sock.emit("sendToFriendCo", cook, socket, friendConnected);
                            setFriend(ff);
                        }
                    });
                    setPseudo(res.data.pseudo);
                    setEmail(res.data.email);
                    setMoney(`${res.data.money}`);
                    setMessage(res.data.message)
                    setId(res.data._id);
                    axios.post(`${process.env.REACT_APP_IPserver}/logo/get`, { id: res.data._id }).then((res2) => {
                        if (res2.data) {
                            const buffer = res2.data.logo.data;
                            const blob = new Blob([new Uint8Array(buffer).buffer], { type: "image/jpeg" });
                            const imageUrl = URL.createObjectURL(blob);
                            setLogo(imageUrl);
                        }
                    });
                }
                setlunch(true);
            });
        } else setlunch(true);
    }, [socket]);
    return <SocketContext.Provider value={Socket}>{lunch && socket !== "" && (id ? <Global /> : <Sign />)}</SocketContext.Provider>;
};

export default App;
