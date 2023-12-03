import React from 'react';
import { useGlobalState } from '../../data';

const Lobby = () => {
    const pseudo = useGlobalState("pseudo")[0];
    const money = useGlobalState("money")[0];
    const logo = useGlobalState("logo")[0];
    return (
        <div>
            <div className='contentUser'>
                <img src={logo} alt="" />
                <h2>{pseudo}</h2>
                <h4>{money} $</h4>
            </div>
        </div>
    );
};

export default Lobby;