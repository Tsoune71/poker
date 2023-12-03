import React, { useEffect, useState } from "react";
import { useGlobalState } from "../data";

const Navbar = () => {
    const zz = (x) => {
        return document.querySelector(x);
    };

    const setcounterWhere = useGlobalState("counterWhere")[1];
    const [contentAccount, setcontentAccount] = useState(true);
    const [btnselected,setbtnselected] = useState(0)
    useEffect(() => {
        if (!contentAccount) {
            zz(".contentAccountDiv").style.height = "auto";
        } else {
            zz(".contentAccountDiv").style.height = "50px";
        }
    }, [contentAccount]);

    return (
        <div className="contentNavbarSign" >
            <img src="./logoApp.png" alt="" />
            <h1>Crypto view</h1>
            <nav>
                <li className= {btnselected === 0 ? "btnselectinnavbar" :''}
                    onClick={() => {
                        setcounterWhere(1);
                        setbtnselected(0)
                    }}
                >
                    HOME
                </li>
                <li className= {btnselected === 1 ? "btnselectinnavbar" :''}
                    onClick={() => {
                        setcounterWhere(2);
                        setbtnselected(1)
                    }}
                >
                    MARKET
                </li>
                <li className= {btnselected === 2 ? "btnselectinnavbar" :''}
                    onClick={() => {
                        setcounterWhere(3);
                        setbtnselected(2)
                    }}
                >
                    FAVORITES
                </li>
            </nav>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <div
                className="contentAccountDiv"
                onClick={() => {
                    setcontentAccount((prev) => !prev);
                }}
            >
                <section className="topUserNav" style={{ height: "50px" }}>
                    {contentAccount ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    )}
                    <h2>Disconnected</h2>
                    <img src="./logoApp.png" alt="" />
                </section>
                <section className="bottomnUserNav" style={{ height: "calc(100% - 50px)" }}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path
                                fillRule="evenodd"
                                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <h2>Tsoune</h2>
                        <img src="./logoApp.png" alt="logoUser" />
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path
                                fillRule="evenodd"
                                d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>

                        <h2>mathisgrosselin</h2>
                        <img src="./logoApp.png" alt="logoUser" />
                    </div>
                    <button
                        onClick={() => {
                            setcounterWhere(0);
                            setbtnselected(3)
                        }}
                    >
                        SIGN IN / SIGN UP
                    </button>
                    <button
                        onClick={() => {
                            setcounterWhere(0);
                            setbtnselected(3)
                        }}
                    >
                        ADD ACCOUNT
                    </button>
                    <button>SETTING</button>
                </section>
            </div>
        </div>
    );
};

export default Navbar;
