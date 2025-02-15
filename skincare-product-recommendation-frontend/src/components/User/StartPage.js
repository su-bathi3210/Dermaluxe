import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css';

import heading from "../../images/heading.png";
import heading1 from "../../images/heading1.png";
import heading2 from "../../images/heading2.png";
import heading3 from "../../images/heading3.png";
import heading8 from "../../images/heading8.png";

const StartPage = () => {
  const images = [heading, heading1, heading3, heading2, heading8];
  const links = ["", "", "", "", "/consultation"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="start-page">
      <div className="section first-section">
        <Link to={links[currentIndex]}>
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="background-image"
          />
        </Link>
        {currentIndex === 0 && (
          <div className="overlay">
            <h1 className="headline1">SKINCARE</h1> <br></br>
            <h1 className="headline2">PERSONALIZED FOR YOU</h1>
            <p className="headline3">
              Get closer to your skin and hair goals with a treatment that's <br></br>
            </p>
            <p className="headline4">customized for you.</p>
            <Link to="/skin"><button className="get-started-button">Get Started</button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartPage;
