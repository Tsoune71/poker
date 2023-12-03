import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useGlobalState } from "../../data";
import SignVerif from "./SignVerif";

const Sign = () => {
    const window3Sign = useGlobalState("window3Sign")[0];
    return (
        <>
            <div className="contentSign">
                <div className="boxSign">{window3Sign === 0 ? <SignUp /> : window3Sign === 1 ? <SignIn /> : <SignVerif />}</div>
            </div>
        </>
    );
};

export default Sign;
