import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Gallery = () => {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch gallery data from the backend
    useEffect(() => {
        AOS.init({ duration: 2000 });
        axios.get('/Gallery') // Fetch data from your gallery endpoint
            .then(response => {
                setGalleries(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching gallery data:', error);
                setLoading(false);
                Swal.fire({
                    title: 'Error!',
                    text: 'Error fetching gallery data',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false
                });
            });
    }, []);

    return (
        <div className="gallery-container" data-aos="fade-up">
            <h1 className="gallery-heading">Customer Gallery</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="gallery-grid">
                    {galleries.map((gallery) => (
                        <div key={gallery.id} className="gallery-item">
                            <div className="gallery-images">
                                <img src={gallery.beforeImageUrl} alt="Before" className="gallery-image" />
                                <img src={gallery.afterImageUrl} alt="After" className="gallery-image" />
                            </div>
                            <div className="gallery-info">
                                <h3>{gallery.productName}</h3>
                                <p>{gallery.description}</p>
                                <p><strong>Skin Concern:</strong> {gallery.skinConcern}</p>
                                <p><strong>Recommendations:</strong> {gallery.recommendations}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
