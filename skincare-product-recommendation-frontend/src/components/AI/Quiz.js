import React from 'react';
import { Link } from "react-router-dom";
import Header from '../../components/User/Header';
import './AI.css';

import quize from '../../images/quize1.png';

export const Quiz = () => {
    return (
        <div>
            <Header />
            <Link to="/skin-dermaluxe">
                <img
                    src={quize}
                    alt="Smiling woman"
                    className="quize-image"
                />
            </Link>
        </div>
    );
};
