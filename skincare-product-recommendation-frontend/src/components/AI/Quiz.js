import React from 'react';
import { Link } from "react-router-dom";
import Header from '../../components/User/Header';
import './AI.css';

import quiz from '../../images/quize1.png';

export const Quiz = () => {
    return (
        <div>
            <Header />
            <div className="quiz-container">
                <div className="quiz-content">
                    <h1>Skincare Quiz</h1>
                    <h2>BUILD YOUR SKINCARE ROUTINE</h2>
                    <h3>WITH DERMALUXE</h3>
                    <p>
                        Confused on what products are right for you? Take our 2-minute skincare quiz and you will get:
                    </p>
                    <ul>
                        <li>
                            <input type="checkbox" checked readOnly /> A complete skincare routine, personalized to you
                        </li>
                        <li>
                            <input type="checkbox" checked readOnly /> FREE full-size cleanser (worth €14) with selected routines
                        </li>
                        <li>
                            <input type="checkbox" checked readOnly /> Exclusive merchandise for DERMALUXE Insiders
                        </li>
                    </ul>
                    <Link to='/skin-dermaluxe'>
                        <button className="quiz-button">Take the quiz</button>
                    </Link>
                    <p>
                        Looking for a skincare routine that's as unique to you as your skin? In just under 2 minutes, our skincare quiz will create a routine that's personalized to you and your skin needs. Whether you need help with dry or sensitive skin, want to tackle hyperpigmentation or fine lines, or simply need a skincare routine that works for you, we've done the hard work so you can sit back and enjoy the results. Ready to get one step closer to your best skin ever? Take the quiz and let's get started.
                    </p>
                </div>

                <div className="quiz-image">
                    <img src={quiz} alt="Happy Customer" />
                </div>
            </div>
        </div>
    );
};
