import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalState } from "../../data";
import Cookies from "js-cookie";

const SignIn = () => {
    const setPseudo = useGlobalState("pseudo")[1];
    const setEmail = useGlobalState("email")[1];
    const setId = useGlobalState("id")[1];
    const setMoney = useGlobalState("money")[1];
    const setwindow3Sign = useGlobalState("window3Sign")[1];

    const socket = useGlobalState("socket")[0];
    const zz = (x) => {
        return document.querySelector(x);
    };

    const laodDATA = (data) => {
        Cookies.set('id',data._id)
        setPseudo(data.pseudo);
        setEmail(data.email);
        setMoney(data.money)
        setId(data._id);
    };

    const [alastRequest, setalastRequest] = useState("");
    useEffect(() => {
        let last = "";
        const intervalPostEmailVerif = setInterval(() => {
            if (alastRequest !== last && alastRequest.length > 7) {
                last = alastRequest;
                axios.post(`${process.env.REACT_APP_IPserver}/api/verifEmail`, { email: alastRequest }).then((res) => {
                    if (res.data) {
                        zz("#underemail").innerText = "You will receive an email";
                        zz("#underemail").style.color = "green";
                    } else {
                        zz("#underemail").innerText = "invalid email !";
                        zz("#underemail").style.color = "orange";
                    }
                });
            }
        }, 500);

        return () => {
            clearInterval(intervalPostEmailVerif);
        };
    }, [alastRequest]);

    return (
        <>
            <section>
                <footer>
                    <button
                        onClick={() => {
                            setwindow3Sign(0);;
                        }}
                    >
                        SIGN UP
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                    </svg>
                </footer>
                <h1>LOG IN</h1>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg>

                    <input
                        autoComplete="off"
                        id="email"
                        onChange={(e) => {
                            if (e.target.value.length > 7) {
                                setalastRequest(e.target.value);
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
                            if (e.target.value.length !== 0) {
                                if (e.target.value.length < 7) {
                                    zz("#underpassword").innerText = " . . . ";
                                    zz("#underpassword").style.color = "orange";
                                } else {
                                    zz("#underpassword").innerText = "";
                                    zz("#underpassword").style.color = "green";
                                }
                            }
                        }}
                        type="password"
                        placeholder="password"
                    />
                </div>
                <h5 id="underpassword">Required path *</h5>
                <button
                    className="btnsignneon"
                    onClick={() => {
                        const data = {
                            email: zz("#email").value,
                            password: zz("#password").value,
                            socket
                        };
                        if ( data.email.length > 7 && data.password.length >= 6 ) {
                            axios.post(`${process.env.REACT_APP_IPserver}/api/signIn`, data).then((res) => {
                                if (res.data) laodDATA(res.data)
                            });
                        }
                    }}
                >
                    LOG IN
                </button>
            </section>
        </>
    );
};

export default SignIn;
