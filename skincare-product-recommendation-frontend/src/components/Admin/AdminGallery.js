import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import Modal from 'react-modal';
import "./Admin.css";

Modal.setAppElement('#root');

const AdminGallery = () => {
    const [galleries, setGalleries] = useState([]);
    const [gallery, setGallery] = useState({
        name: '',
        productName: '',
        description: '',
        skinConcern: '',
        recommendation: '',
        images: []
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchGalleries();
    }, []);

    const fetchGalleries = async () => {
        try {
            const response = await axios.get('/api/gallery');
            setGalleries(response.data);
        } catch (error) {
            console.error('Error fetching galleries:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGallery((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        const newImages = [...gallery.images];
        newImages[index] = file;
        setGallery((prev) => ({ ...prev, images: newImages }));
    };

    const handleImageUpload = (image) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(image);
        });
    };

    const handleAddOrUpdateGallery = async () => {
        try {
            const imageData = await Promise.all(gallery.images.map(handleImageUpload));
            const galleryData = {
                ...gallery,
                images: imageData.map((data) => ({ imageData: data }))
            };

            if (editingId) {
                await axios.put(`/api/gallery/${editingId}`, galleryData);
            } else {
                await axios.post('/api/gallery', galleryData);
            }

            fetchGalleries();
            closeModal();
        } catch (error) {
            console.error('Error saving gallery:', error);
        }
    };

    const openModal = (gallery = null) => {
        if (gallery) {
            setGallery(gallery);
            setEditingId(gallery.id);
        } else {
            setGallery({
                name: '',
                productName: '',
                description: '',
                skinConcern: '',
                recommendation: '',
                images: []
            });
            setEditingId(null);
        }
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setGallery({
            name: '',
            productName: '',
            description: '',
            skinConcern: '',
            recommendation: '',
            images: []
        });
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/gallery/${id}`);
            fetchGalleries();
        } catch (error) {
            console.error('Error deleting gallery:', error);
        }
    };

    return (
        <div>
            <AdminNav />
            <div className="admin-gallery-container">
                <h2 className="admin-gallery-header">Gallery</h2>
                <p className="admin-gallery-paragraph">
                    At Dermaluxe Skincare, our admin panel provides a streamlined interface for efficiently managing the gallery. This feature ensures that images and content are updated and organized promptly, helping us maintain a visually appealing and informative gallery to enhance the overall customer experience.
                </p>

                <button className="admin-gallery-add-btn" onClick={() => openModal()}>
                    Add New Gallery
                </button>


                <div className="admin-gallery-list">
                    {galleries.map((gallery) => (
                        <div key={gallery.id} className="admin-gallery-item">
                            <h4>{gallery.name}</h4>
                            <p>{gallery.productName}</p>
                            <p>{gallery.description}</p>
                            <button onClick={() => openModal(gallery)}>Edit</button>
                            <button onClick={() => handleDelete(gallery.id)}>Delete</button>
                        </div>
                    ))}
                </div>

                {/* Popup Modal */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="admin-gallery-modal"
                    overlayClassName="admin-gallery-modal-overlay"
                >
                    <input type="text" name="name" value={gallery.name} onChange={handleChange} placeholder="Gallery Name" />
                    <input type="text" name="productName" value={gallery.productName} onChange={handleChange} placeholder="Product Name" />
                    <textarea name="description" value={gallery.description} onChange={handleChange} placeholder="Description" />
                    <input type="text" name="skinConcern" value={gallery.skinConcern} onChange={handleChange} placeholder="Skin Concern" />
                    <input type="text" name="recommendation" value={gallery.recommendation} onChange={handleChange} placeholder="Recommendation" />
                    <input type="file" onChange={(e) => handleImageChange(e, 0)} />
                    <input type="file" onChange={(e) => handleImageChange(e, 1)} />
                    <button onClick={handleAddOrUpdateGallery}>
                        {editingId ? 'Update Gallery' : 'Add Gallery'}
                    </button>
                    <button onClick={closeModal}>Cancel</button>
                </Modal>
            </div>
        </div>
    );
};

export default AdminGallery;
