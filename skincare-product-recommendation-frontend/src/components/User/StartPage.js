import React, { useEffect, useState } from "react";
import "./StartPage.css";

import heading from "../../images/heading.png";
import heading1 from "../../images/heading1.png";
import heading2 from "../../images/heading2.png";
import heading5 from "../../images/heading5.png";

const StartPage = () => {
  const images = [heading, heading1, heading2, heading5];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="start-page">
      <div className="section first-section">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="background-image"
        />
        {currentIndex === 0 && (
          <div className="overlay">
            <h1 className="headline1">SKINCARE</h1> <br></br>
            <h1 className="headline2">PERSONALIZED FOR YOU</h1>
            <p className="headline3">
              Get closer to your skin and hair goals with a treatment that's <br></br>
            </p>
            <p className="headline4">customized for you.</p>
            <button className="get-started-button">Get Started</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartPage;
