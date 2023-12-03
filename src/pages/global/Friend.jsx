import React, { useContext, useEffect, useState } from "react";
import { useGlobalState } from "../../data";
import axios from "axios";
import Cookies from "js-cookie";
import SocketContext from "../../SocketContext";

const Friend = () => {
    const zz = (x) => {
        return document.querySelector(x);
    };
    const [logo, setLogo] = useGlobalState("logo");
    const email = useGlobalState("email")[0];
    const pseudo = useGlobalState("pseudo")[0];

    const id = useGlobalState("id")[0];
    const socket = useGlobalState("socket")[0];
    const [friends, setFriend] = useGlobalState("friends");
    const [messages, setMessages] = useGlobalState("message");

    const [where, setWhere] = useState(0);
    const [online, setOnline] = useState([]);
    const [outline, setOutline] = useState([]);
    const [search, setSearch] = useState([]);
    const [manage, setManage] = useState(["", "", ""]);

    const Sock = useContext(SocketContext);

    useEffect(() => {
        let n = [];
        for (const mess of messages) {
            let data = "";
            if (mess.reason === "add") data = "Vous a demandé en ami";
            n.push({ pseudo: mess.pseudo, data, id: mess.id });
        }
        setMessages(n);
    }, []);

    useEffect(() => {
        let on = [];
        let out = [];
        for (const friend of friends) {
            if (friend.statut === "Hors ligne") out.push(friend);
            else on.push(friend);
        }
        setOnline(on);
        setOutline(out);

        const newFriendConnected = (idFriend, socketFriend) => {
            setFriend(friends.map((obj) => (obj.id === idFriend ? { ...obj, statut: "En ligne", socket: socketFriend, connected: true } : obj)));
        };
        const newFriendDisconnected = (idFriend) => {
            setFriend(friends.map((obj) => (obj.id === idFriend ? { ...obj, statut: "Hors ligne", connected: false } : obj)));
        };

        const newFriendAdd = (idFriend) => {
            axios.post(`${process.env.REACT_APP_IPserver}/api/user`, { id: idFriend, socket: false }).then((res) => {
                if (res.data) {
                    axios.post(`${process.env.REACT_APP_IPserver}/logo/get`, { id: idFriend }).then((res2) => {
                        let link = "./pictures/default.png";
                        if (res2.data) {
                            const buffer = res2.data.logo.data;
                            const blob = new Blob([new Uint8Array(buffer).buffer], { type: "image/jpeg" });
                            link = URL.createObjectURL(blob);
                        }
                        let s = "Hors ligne";
                        if (res.data.connected) s = "En ligne";
                        setFriend((prev) => [...prev, { url: link, statut: s, pseudo: res.data.pseudo, id: idFriend, money: res.data.money, socket: res.data.socket }]);
                    });
                    document.querySelector("#acceptInvite").style.display = "block";
                }
            });
        };

        Sock.on("friendCo", newFriendConnected);
        Sock.on("disconnected", newFriendDisconnected);
        Sock.on("newFriend", newFriendAdd);
        Sock.on("friendDeleted", friendDeleted);

        return () => {
            Sock.off("friendCo", newFriendConnected);
            Sock.off("disconnected", newFriendDisconnected);
            Sock.off("newFriend", newFriendAdd);
            Sock.off("friendDeleted", friendDeleted);
        };
    }, [friends]);

    let spam = parseInt(Date.now() / 1000);

    function searchFriend(event) {
        if (event.key === "Enter" && parseInt(Date.now() / 1000) - spam > 0) {
            spam = Date.now() / 1000;
            {
                axios.post(`${process.env.REACT_APP_IPserver}/friend/search`, { data: event.target.value }).then((res) => {
                    let n = [];
                    for (const user of res.data) {
                        let v = true;
                        for (const friend of friends) {
                            console.log(user[1], friend);
                            if (user[1] === friend.id || user[1] === id) v = false;
                        }
                        if (v) n.push(user);
                    }
                    setSearch(n);
                });
            }
        }
    }

    useEffect(() => {
        if (where === 1) {
            const inputSearch = document.getElementById("searchFriend");
            inputSearch.addEventListener("keydown", searchFriend);
            return () => {
                inputSearch.removeEventListener("keydown", searchFriend);
            };
        }
    }, [where]);
    function friendDeleted(i) {
        let n = friends.map((prev) => prev.id !== i && prev);
        let nn = [];
        for (const nnn of n) {
            if (nnn) nn.push(nnn);
        }
        setFriend(nn);
    }

    function addFriend(event) {
        document.querySelector(".enterSearch").style.display = "none";
        const receiver = event.target.getAttribute("id");
        axios.post(`${process.env.REACT_APP_IPserver}/friend/add`, { sender: id, receiver, socket, pseudo }).then((res) => {
            if (res.data) {
                Sock.emit("messageServer", { s: res.data, id, reason: "add" });
            }
        });
        event.target.style.display = "none";
    }
    function manageOn(event) {
        setManage(event.target.getAttribute("data").split(","));
        setWhere(4);
    }

    function inviteFriend() {
        console.log(manage);
        setWhere(0);
    }
    function deleteFriend() {
        axios.post(`${process.env.REACT_APP_IPserver}/friend/delete`, { first: id, second: manage[2] }).then((res) => {
            if (res.data) {
                Sock.emit("deleteFriend", res.data, id);
                friendDeleted(manage[2]);
                setWhere(0);
            }
        });
    }

    function acceptMessage(event) {
        const idFriend = event.target.id;
        let n = []
        const nn = messages.map((prev) => prev.id !== idFriend && prev)
        for (const nnn of nn) {
            if (nnn) n.push(nnn)
        }
        setMessages(n);
        if (event.target.getAttribute("reason") === "Vous a demandé en ami") {
            axios.post(`${process.env.REACT_APP_IPserver}/friend/accept`, { sender: id, receiver: idFriend });
            axios.post(`${process.env.REACT_APP_IPserver}/api/user`, { id: idFriend, socket: false }).then((res) => {
                if (res.data) {
                    axios.post(`${process.env.REACT_APP_IPserver}/logo/get`, { id: idFriend }).then((res2) => {
                        let link = "./pictures/default.png";
                        if (res2.data) {
                            const buffer = res2.data.logo.data;
                            const blob = new Blob([new Uint8Array(buffer).buffer], { type: "image/jpeg" });
                            link = URL.createObjectURL(blob);
                        }
                        let s = "Hors ligne";
                        if (res.data.connected) {
                            s = "En ligne";
                            Sock.emit("newFriend", res.data.socket, id);
                        }
                        setFriend((prev) => [...prev, { url: link, statut: s, pseudo: res.data.pseudo, id: idFriend, money: res.data.money, socket: res.data.socket }]);
                    });
                    document.querySelector("#acceptInvite").style.display = "block";
                }
            });
        }
    }

    function uploadImage() {
        const imgDom = document.getElementById("getimage");
        if (imgDom.files.length > 0) {
            const imageFile = imgDom.files[0];
            const fileSize = imageFile.size; // en octets
            if (fileSize <= 80 * 80) {
                const formData = new FormData();
                formData.append("image", imageFile);
                formData.append("id", id);
                axios.post(`${process.env.REACT_APP_IPserver}/logo/upload`, formData).then((res) => {
                    const buffer = res.data.logo.data;
                    const blob = new Blob([new Uint8Array(buffer).buffer], { type: "image/jpeg" });
                    const imageUrl = URL.createObjectURL(blob);
                    setLogo(imageUrl);
                });
            } else {
                alert("fichier trop gros");
            }
        }
    }

    return (
        <div className="contentFriend">
            <div className="leftsideFriend">
                <section>
                    <svg onClick={() => setWhere(0)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path
                            fillRule="evenodd"
                            d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                            clipRule="evenodd"
                        />
                        <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                    </svg>
                    <h3>{online.length}</h3>
                </section>
                <section>
                    <svg onClick={() => setWhere(1)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                    </svg>
                </section>
                <section>
                    <svg onClick={() => setWhere(2)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    <h3>{messages.length}</h3>
                </section>

                <div>
                    <svg onClick={() => setWhere(3)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 01-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 016.126 3.537zM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 010 .75l-1.732 3.001c-.229.396-.76.498-1.067.16A5.231 5.231 0 016.75 12c0-1.362.519-2.603 1.37-3.536zM10.878 17.13c-.447-.097-.623-.608-.394-1.003l1.733-3.003a.75.75 0 01.65-.375h3.465c.457 0 .81.408.672.843a5.252 5.252 0 01-6.126 3.538z" />
                        <path
                            fillRule="evenodd"
                            d="M21 12.75a.75.75 0 000-1.5h-.783a8.22 8.22 0 00-.237-1.357l.734-.267a.75.75 0 10-.513-1.41l-.735.268a8.24 8.24 0 00-.689-1.191l.6-.504a.75.75 0 10-.964-1.149l-.6.504a8.3 8.3 0 00-1.054-.885l.391-.678a.75.75 0 10-1.299-.75l-.39.677a8.188 8.188 0 00-1.295-.471l.136-.77a.75.75 0 00-1.477-.26l-.136.77a8.364 8.364 0 00-1.377 0l-.136-.77a.75.75 0 10-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 00-1.3.75l.392.678a8.29 8.29 0 00-1.054.885l-.6-.504a.75.75 0 00-.965 1.149l.6.503a8.243 8.243 0 00-.689 1.192L3.8 8.217a.75.75 0 10-.513 1.41l.735.267a8.222 8.222 0 00-.238 1.355h-.783a.75.75 0 000 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 10.513 1.41l.735-.268c.197.417.428.816.69 1.192l-.6.504a.75.75 0 10.963 1.149l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 101.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.771a.75.75 0 101.477.26l.137-.772a8.376 8.376 0 001.376 0l.136.773a.75.75 0 101.477-.26l-.136-.772a8.19 8.19 0 001.294-.47l.391.677a.75.75 0 101.3-.75l-.393-.679a8.282 8.282 0 001.054-.885l.601.504a.75.75 0 10.964-1.15l-.6-.503a8.24 8.24 0 00.69-1.191l.735.268a.75.75 0 10.512-1.41l-.734-.268c.115-.438.195-.892.237-1.356h.784zm-2.657-3.06a6.744 6.744 0 00-1.19-2.053 6.784 6.784 0 00-1.82-1.51A6.704 6.704 0 0012 5.25a6.801 6.801 0 00-1.225.111 6.7 6.7 0 00-2.15.792 6.784 6.784 0 00-2.952 3.489.758.758 0 01-.036.099A6.74 6.74 0 005.251 12a6.739 6.739 0 003.355 5.835l.01.006.01.005a6.706 6.706 0 002.203.802c.007 0 .014.002.021.004a6.792 6.792 0 002.301 0l.022-.004a6.707 6.707 0 002.228-.816 6.781 6.781 0 001.762-1.483l.009-.01.009-.012a6.744 6.744 0 001.18-2.064c.253-.708.39-1.47.39-2.264a6.74 6.74 0 00-.408-2.308z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
            <div className="rightsideFriend">
                {where === 0 ? (
                    <div className="navfriend">
                        <h1>En ligne</h1>
                        <div>
                            {online.map((element, key) => (
                                <div key={key} onClick={manageOn} data={`${element.pseudo},${element.url},${element.id},${element.money}`}>
                                    <img src={element.url} alt="logo" />
                                    <h2>{element.pseudo}</h2>
                                    <h3>{element.statut}</h3>
                                </div>
                            ))}
                        </div>
                        <h1>Hors ligne</h1>
                        <div>
                            {outline.map((element, key) => (
                                <div key={key}>
                                    <img src={element.url} alt="logo" />
                                    <h2>{element.pseudo}</h2>
                                    <h3>{element.statut}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
                {where === 1 ? (
                    <div className="navadd">
                        <input autoComplete="off" id="searchFriend" type="text" placeholder="Trouver des amis" />
                        <div>
                            <h4 className="enterSearch" style={{ margin: "0 80px", display: search.length !== 0 ? "none" : "block" }}>
                                'Entrer' pour chercher
                            </h4>
                            {search.map((ele, key) => (
                                <div key={key}>
                                    <h2>{ele[0]}</h2>
                                    <button onClick={addFriend} id={ele[1]}>
                                        AJOUTER
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
                {where === 2 ? (
                    <div className="contentMessage">
                        {messages.map((ele, key) => (
                            <div key={key}>
                                <h1>{ele.pseudo}</h1>
                                <h4>{ele.data}</h4>
                                <section>
                                    <button onClick={acceptMessage} id={ele.id} reason={ele.data} style={{ color: "rgb(0,125,10)" }}>
                                        Accepter
                                    </button>
                                    <button style={{ color: "rgb(125,0,10)" }}>Refuser</button>
                                </section>
                            </div>
                        ))}
                    </div>
                ) : null}
                {where === 3 ? (
                    <div className="contentSetting">
                        <div
                            onClick={() => {
                                document.getElementById("getimage").click();
                            }}
                        >
                            <img src={logo} alt="logo" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                        </div>
                        <input onChange={uploadImage} type="file" id="getimage" style={{ display: "none" }} accept="image/*" />
                        <h3>Only 80x80</h3>
                        <h4>
                            {email.split("@")[0].slice(0, 3)}**********{email.split("@")[1]}
                        </h4>
                        <button
                            onClick={() => {
                                Cookies.set("id", "");
                                window.location.reload();
                            }}
                        >
                            Se Déconnecter
                        </button>
                    </div>
                ) : null}
                {where === 4 ? (
                    <div className="managefriend">
                        <img src={manage[1]} alt="" />
                        <h1>{manage[0]}</h1>
                        <button onClick={inviteFriend} style={{ backgroundColor: "rgb(63, 184, 148)" }}>
                            INVITER
                        </button>
                        <button
                            onClick={() => {
                                setWhere(0);
                            }}
                            style={{ backgroundColor: "rgb(203, 104,58)" }}
                        >
                            RETOUR
                        </button>
                        <h1>{manage[3]} $</h1>
                        <button onClick={deleteFriend} className="deleteFriend">
                            SUPPRIMER
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Friend;
