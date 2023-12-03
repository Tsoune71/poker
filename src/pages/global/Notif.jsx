import React, { useContext, useEffect, useState } from "react";
import SocketContext from "../../SocketContext";
import { useGlobalState } from "../../data";
import axios from "axios";

const Notif = () => {
    const [mess, setMess] = useState({ id: "", img: "./pictures/default.png", pseudo: "", reason: "", sender: "" });
    const socket = useGlobalState("socket")[0];
    const setFriend = useGlobalState("friends")[1];
    const [messages, setMessages] = useGlobalState("message");

    const idUser = useGlobalState("id")[0];
    const Sock = useContext(SocketContext);
    useEffect(() => {
        function newMessage(data) {
            const { id, reason, sender } = data;
            axios.post(`${process.env.REACT_APP_IPserver}/api/user`, { id, socket: false }).then((res) => {
                if (res.data) {
                    let r = "";
                    if (reason === "add") r = "Vous a demandé en ami";
                    setMessages((prev) => [...prev, { pseudo: res.data.pseudo, id, data: r }]);
                    axios.post(`${process.env.REACT_APP_IPserver}/logo/get`, { id }).then((res2) => {
                        if (res2.data) {
                            const buffer = res2.data.logo.data;
                            const blob = new Blob([new Uint8Array(buffer).buffer], { type: "image/jpeg" });
                            const imageUrl = URL.createObjectURL(blob);
                            setMess({ id: res.data._id, img: imageUrl, pseudo: res.data.pseudo, reason, sender });
                        } else {
                            setMess((prev) => ({ id: res.data._id, img: prev.img, pseudo: res.data.pseudo, reason, sender }));
                        }
                        document.querySelector(".contentNotif").style.left = "20px";
                        document.querySelector("#acceptInvite").style.display = "block";
                        setTimeout(() => {
                            document.querySelector(".contentNotif").style.left = "-500px";
                        }, 3000);
                    });
                    document.querySelector("#acceptInvite").style.display = "block";
                }
            });
        }
        Sock.on("message", newMessage);
        return () => {
            Sock.off("message", newMessage);
        };
    }, []);

    function requestValid(event) {
        event.target.style.display = "none";
        document.querySelector(".contentNotif").style.left = "-500px";
        if (mess.sender) {
            let n = [];
            const nn = messages.map((prev) => prev.id !== mess.id && prev);
            for (const nnn of nn) {
                if (nnn) n.push(nnn);
            }
            setMessages(n);
            axios.post(`${process.env.REACT_APP_IPserver}/friend/accept`, { sender: idUser, receiver: mess.id }).then((res) => {
                if (res.data) {
                    axios.post(`${process.env.REACT_APP_IPserver}/api/user`, { id: mess.id, socket: false }).then((res2) => {
                        if (res2.data) {
                            let s = "Hors Ligne";
                            if (res2.data.connected) {
                                s = "En ligne";
                                Sock.emit("newFriend", res2.data.socket, idUser);
                            }
                            setFriend((prev) => [...prev, { url: mess.img, statut: s, pseudo: res2.data.pseudo, id: mess.id, money: res2.data.money, socket: res2.data.socket }]);
                        }
                    });
                }
            });
        }
    }

    return (
        <div className="contentNotif">
            <img src={mess.img} alt="" />
            <h3>
                {mess.pseudo} - {mess.reason}
            </h3>
            <svg id="acceptInvite" onClick={requestValid} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
};

export default Notif;
