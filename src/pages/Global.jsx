import React from "react";
import Friend from "./global/Friend";
import Lobby from "./first/Lobby";
import Notif from "./global/Notif";

const Global = () => {
    
    return (
        <div className="contentGlobal">
            <Friend />
            <Lobby />
            <Notif/>
        </div>
    );
};

export default Global;
