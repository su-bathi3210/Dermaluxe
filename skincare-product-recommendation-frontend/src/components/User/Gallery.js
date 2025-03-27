import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/User/Header";
import '../../App.css';

const Gallery = () => {
    const [galleries, setGalleries] = useState([]);

    useEffect(() => {
        fetchGalleries();
    }, []);

    
    const fetchGalleries = async () => {
        try {
            const response = await axios.get("/api/gallery");
            setGalleries(response.data);
        } catch (error) {
            console.error("Error fetching galleries", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="gallery-container">
                <h1 className="gallery-title">Real Routines, Real Results</h1>
                <p className="gallery-subtitle">
                    See real-life skin transformations from our happy customers who’ve achieved their
                    best skin yet with Dermaluxe Skincare! Discover how simple, consistent routines can deliver
                    glowing, flawless results. Want to be featured as one of our Flawless Faces? Tag us on
                    Instagram with your before-and-after transformation @dermaluxeskincare!
                </p>

                {galleries.length === 0 ? (
                    <p>No galleries available</p>
                ) : (
                    <div className="gallery-grid">
                        {galleries.map((gallery) => (
                            <div key={gallery.id} className="gallery-item">
                                {gallery.images.length >= 2 ? (
                                    <BeforeAfterImage
                                        beforeImage={gallery.images[0].imageData}
                                        afterImage={gallery.images[1].imageData}
                                    />
                                ) : (
                                    <img src={gallery.images[0]?.imageData} alt={gallery.name} className="single-image" />
                                )}
                                <div className="gallery-description">
                                    <h3 className="gallery-name">{gallery.name}</h3>
                                    <p className="gallery-text">{gallery.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// BeforeAfterImage Component (Included in the same file)
const BeforeAfterImage = ({ beforeImage, afterImage }) => {
    const [sliderPosition, setSliderPosition] = useState(50);

    const handleMouseMove = (event) => {
        const container = event.currentTarget;
        const rect = container.getBoundingClientRect();
        const newPosition = ((event.clientX - rect.left) / rect.width) * 100;
        setSliderPosition(newPosition);
    };

    return (
        <div className="before-after-container" onMouseMove={handleMouseMove}>
            {/* Before Image */}
            <img src={beforeImage} alt="Before" className="before-image" />

            {/* After Image with Smooth Transition */}
            <div
                className="after-image-wrapper"
                style={{ width: `${sliderPosition}%`, transition: "width 3s ease-in-out" }}
            >
                <img src={afterImage} alt="After" className="after-image" />
            </div>

            {/* Slider Control */}
            <div className="slider" style={{ left: `${sliderPosition}%` }}>
                <div className="slider-circle"></div>
            </div>
        </div>
    );
};

export default Gallery;
