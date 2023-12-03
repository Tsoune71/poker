import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../data";
import Cookies from "js-cookie";

const SignUp = () => {
    const setPseudo = useGlobalState("pseudo")[1];
    const setEmail = useGlobalState("email")[1];
    const setId = useGlobalState("id")[1];
    const setMoney = useGlobalState("money")[1];
    const setwindow3Sign = useGlobalState("window3Sign")[1];

    const socket = useGlobalState("socket")[0];
    const zz = (x) => {
        return document.querySelector(x);
    };

    const [alastRequest, setalastRequest] = useState("");
    useEffect(() => {
        let last = "";
        const intervalPostEmailVerif = setInterval(() => {
            if (alastRequest !== last && alastRequest.length > 7) {
                last = alastRequest;
                axios.post(`${process.env.REACT_APP_IPserver}/api/verifEmail`, { email: alastRequest }).then((res) => {
                    if (res.data) {
                        zz("#underemail").innerText = "Already have an account !";
                        zz("#underemail").style.color = "orange";
                    }
                });
            }
        }, 500);

        return () => {
            clearInterval(intervalPostEmailVerif);
        };
    }, [alastRequest]);

    const laodDATA = (data) => {
        Cookies.set('id',data._id)
        setPseudo(data.pseudo);
        setId(data._id);
        setEmail(data.email);
        setMoney(data.money)
    };

    return (
        <>
            <section>
                <footer>
                    <button
                        onClick={() => {
                            setwindow3Sign(1);
                        }}
                    >
                        LOG IN
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                    </svg>
                </footer>
                <h1>SIGN UP</h1>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                    </svg>

                    <input
                        id="pseudo"
                        onChange={(e) => {
                            if (e.target.value.length !== 0) {
                                zz("#undernickname").innerText = "Valid";
                                zz("#undernickname").style.color = "green";
                            } else {
                                zz("#undernickname").innerText = "Required path *";
                                zz("#undernickname").style.color = "orange";
                            }
                        }}
                        type="text"
                        placeholder="Last name First name"
                        autoComplete="off"
                    />
                </div>
                <h5 id="undernickname">Required path *</h5>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg>

                    <input
                        autoComplete="off"
                        id="email"
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                zz("#underemail").innerText = "You will receive an email";
                                zz("#underemail").style.color = "green";
                                if (e.target.value.length > 7) {
                                    setalastRequest(e.target.value);
                                }
                            } else {
                                zz("#underemail").innerText = "Required path *";
                                zz("#underemail").style.color = "orange";
                            }
                        }}
                        type="text"
                        placeholder="email"
                    />
                </div>
                <h5 id="underemail">Required path *</h5>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                    </svg>

                    <input
                        id="password"
                        onChange={(e) => {
                            const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                            const caracteresSpeciaux = [
                                "!",
                                '"',
                                "#",
                                "$",
                                "%",
                                "&",
                                "'",
                                "(",
                                ")",
                                "*",
                                "+",
                                ",",
                                "-",
                                ".",
                                "/",
                                ":",
                                ";",
                                "<",
                                "=",
                                ">",
                                "?",
                                "@",
                                "[",
                                "\\",
                                "]",
                                "^",
                                "_",
                                "`",
                                "{",
                                "|",
                                "}",
                                "~",
                                "£",
                                "¥",
                                "€",
                                "¢",
                                "©",
                                "®",
                                "§",
                                "«",
                                "»",
                                "°",
                                "×",
                                "÷",
                                "µ",
                                "¶",
                                "·",
                                "•",
                                "†",
                                "‡",
                                "‰",
                                "‹",
                                "›",
                                "‼",
                                "¿",
                                "¡",
                                "¶",
                                "§",
                                "¤",
                                "‰",
                                "¶",
                                "‽",
                                "†",
                                "‡",
                                "£",
                                "¥",
                                "€",
                                "¢",
                                "©",
                                "®",
                                "“",
                                "”",
                                "‘",
                                "’",
                                "«",
                                "»",
                                "–",
                                "—",
                                "−",
                                "−",
                                "−",
                                "′",
                                "″",
                                "‴",
                                "‵",
                                "‶",
                                "‷",
                                "‸",
                                "‹",
                                "›",
                                "‼",
                                "⁃",
                                "⁄",
                                "⁰",
                                "ⁱ",
                                "⁴",
                                "⁵",
                                "⁶",
                                "⁷",
                                "⁸",
                                "⁹",
                                "⁺",
                                "⁻",
                                "⁼",
                                "⁽",
                                "⁾",
                                "ⁿ",
                                "₀",
                                "₁",
                                "₂",
                                "₃",
                                "₄",
                                "₅",
                                "₆",
                                "₇",
                                "₈",
                                "₉",
                                "₊",
                                "₋",
                                "₌",
                                "₍",
                                "₎",
                                "ₐ",
                                "ₑ",
                                "ₒ",
                                "ₓ",
                                "ₔ",
                                "ₕ",
                                "ₖ",
                                "ₗ",
                                "ₘ",
                                "ₙ",
                                "ₚ",
                                "ₛ",
                                "ₜ",
                                "₟",
                                "₡",
                                "₢",
                                "₣",
                                "₤",
                                "₥",
                                "₦",
                                "₧",
                                "₨",
                                "₩",
                                "₪",
                                "₫",
                                "€",
                                "₭",
                                "₮",
                                "₯",
                                "₰",
                                "₱",
                                "₲",
                                "₳",
                                "₴",
                                "₵",
                                "₶",
                                "₷",
                                "₸",
                                "₹",
                                "₺",
                                "₻",
                                "₼",
                                "₽",
                                "₾",
                                "₿",
                            ];

                            if (e.target.value.length !== 0) {
                                if (e.target.value.length < 7) {
                                    zz("#underpassword").innerText = `Password too short ! ( ${e.target.value.length} / 7 )`;
                                    zz("#underpassword").style.color = "rgb(212, 0, 255)";
                                } else {
                                    let v = false;
                                    let vv = false;
                                    for (const letter of e.target.value) {
                                        if (uppercase.includes(letter)) v = true;
                                        if (caracteresSpeciaux.includes(letter)) vv = true;
                                    }
                                    if (v && vv) {
                                        zz("#underpassword").innerText = "STRONG password !";
                                        zz("#underpassword").style.color = "green";
                                    } else if (vv || v) {
                                        zz("#underpassword").innerText = "MEDIUM password !";
                                        zz("#underpassword").style.color = "yellow";
                                    } else {
                                        zz("#underpassword").innerText = "LOW password !";
                                        zz("#underpassword").style.color = "red";
                                    }
                                }
                            } else {
                                zz("#underpassword").innerText = "Required path *";
                                zz("#underpassword").style.color = "orange";
                            }
                        }}
                        type="password"
                        placeholder="password"
                    />
                </div>
                <h5 id="underpassword">Required path *</h5>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                    </svg>

                    <input
                        id="repeat"
                        onChange={(e) => {
                            if (e.target.value.length !== 0) {
                                if (e.target.value === zz("#password").value) {
                                    zz("#underrepeat").innerText = "Valide";
                                    zz("#underrepeat").style.color = "green";
                                } else {
                                    zz("#underrepeat").innerText = "Passwords do not match !";
                                    zz("#underrepeat").style.color = "orange";
                                }
                            } else {
                                zz("#underrepeat").innerText = "Required path *";
                                zz("#underrepeat").style.color = "orange";
                            }
                        }}
                        type="password"
                        placeholder="check your password"
                    />
                </div>
                <h5 id="underrepeat">Required path *</h5>
                <button
                    className="btnsignneon"
                    onClick={() => {
                        const data = {
                            pseudo: zz("#pseudo").value,
                            email: zz("#email").value,
                            password: zz("#password").value,
                            repeat: zz("#repeat").value,
                            socket
                        };
                        if (data.pseudo.length !== 0 && data.email.length > 7 && data.password.length >= 6 && data.password === data.repeat) {
                            axios.post(`${process.env.REACT_APP_IPserver}/api/signUp`, data).then((res) => {
                                if (res.data) laodDATA(res.data)
                            });
                        }
                    }}
                >
                    REGISTER
                </button>
            </section>
        </>
    );
};

export default SignUp;
