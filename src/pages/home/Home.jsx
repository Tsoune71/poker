import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import SocketContext from "../../SocketContext";

const Home = () => {
    const zz = (x) => {
        return document.querySelector(x);
    };
    const [choicePodium, setchoicePodium] = useState("Popular Cryptocurrencies");
    const sock = useContext(SocketContext);
    const openChoicePodium = () => {
        if (zz(".btnhomepodiumchoice").style.height === "170px") {
            document.querySelector(".btnhomepodiumchoice").style.height = "0px";
            document.querySelector(".btnhomepodiumchoice").style.margin = "0";
        } else {
            zz(".btnhomepodiumchoice").style.height = "170px";
            zz(".btnhomepodiumchoice").style.margin = "20px 0";
        }
    };

    useEffect(() => {
        zz(".btnnchangetop5").addEventListener("click", openChoicePodium);
    }, []);
    let cancelsameRequest = "";
    useEffect(() => {
        let params = 0;
        if (choicePodium === "Biggest Difference in 24 hours") params = 1;
        else if (choicePodium === "Biggest Price") params = 2;
        if (cancelsameRequest !== choicePodium) {
            getAllcryptos(params);
            cancelsameRequest = choicePodium;
        }
        sock.on("reloadCryptos", () => {
            getAllcryptos(params);
        });
    }, [choicePodium]);

    const [bestcrypt, setbestcrypt] = useState([]);

    const getCryptoData = async (x) => {
        const response = await axios.post(`${process.env.REACT_APP_IPserver}/crypto/getcryptolastdays`, { cryptos: x });
        console.log(response.data);
    };
    const getAllcryptos = async (x) => {
        const response = await axios.post(`${process.env.REACT_APP_IPserver}/crypto/getBestCrypto`, { params: x });
        setbestcrypt(response.data);
    };

    return (
        <div className="contentHome">
            <div className="textHome">
                <h2>Welcome to </h2>
                <h1>CRYPTO VIEW</h1>
                <h2>find all the cryptos of the moment</h2>
            </div>
            <div className="displayHome">
                <div className="btnnchangetop5">
                    <header>
                        <h2>{choicePodium}</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </header>
                    <ul className="btnhomepodiumchoice">
                        <li
                            onClick={() => {
                                document.querySelector(".btnhomepodiumchoice").style.height = "0px";
                                document.querySelector(".btnhomepodiumchoice").style.margin = "0";
                                setchoicePodium("Popular Cryptocurrencies");
                            }}
                        >
                            Popular Cryptocurrencies
                        </li>
                        <li
                            onClick={() => {
                                document.querySelector(".btnhomepodiumchoice").style.height = "0px";
                                document.querySelector(".btnhomepodiumchoice").style.margin = "0";
                                setchoicePodium("Biggest Difference in 24 hours");
                            }}
                        >
                            Biggest Difference in 24 hours
                        </li>
                        <li
                            onClick={() => {
                                document.querySelector(".btnhomepodiumchoice").style.height = "0px";
                                document.querySelector(".btnhomepodiumchoice").style.margin = "0";
                                setchoicePodium("Biggest Price");
                            }}
                        >
                            Biggest Price
                        </li>
                    </ul>
                </div>
                <nav>
                    <li>Name</li>
                    <li>Last Price</li>
                    <li>24h Difference</li>
                    <li>Market Cap</li>
                </nav>
                <section>
                    {bestcrypt.map((ele, indice) => (
                        <div key={indice}>
                            <header>
                                <img src={ele.img} alt={ele.symbol} />
                                <h3>{ele.symbol}</h3>
                                <h5>{ele.name}</h5>
                            </header>

                            <h4>{ele.price} $</h4>
                            {ele.pourcentage24 >= 0 ? (
                                <h4 style={{ color: "green" }}>{ele.pourcentage24.toString().slice(0, 5)}%</h4>
                            ) : (
                                <h4 style={{ color: "red" }}>{ele.pourcentage24.toString().slice(0, 5)} %</h4>
                            )}
                            <h4>{ele.market_cap.toString().length >= 7 ? "$ " + ele.market_cap.toString().slice(0, ele.market_cap.toString().length - 6) + "M" : ele.market_cap.toString() + " $"} </h4>
                        </div>
                    ))}
                </section>
            </div>
            <div className="searchHomeContent">
                <input type="text" placeholder="search crypto" />
                <section>
                    <div>
                        <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" alt="btc" />
                        <h3>bitcoin</h3>
                        <h4>1005050$</h4>
                        <section>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                            <button>Check</button>
                        </section>
                    </div>
                    <div>
                        <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" alt="btc" />
                        <h3>bitcoin</h3>
                        <h4>1005050$</h4>
                        <section>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                            <button>Check</button>
                        </section>
                    </div>
                    <div>
                        <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" alt="btc" />
                        <h3>bitcoin</h3>
                        <h4>1005050$</h4>
                        <section>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                            <button>Check</button>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
