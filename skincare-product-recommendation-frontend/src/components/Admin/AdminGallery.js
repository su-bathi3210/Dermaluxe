import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminGallery = () => {
    const [galleryForm, setGalleryForm] = useState({
        id: '',
        productName: '',
        description: '',
        skinConcern: '',
        beforeImageUrl: '',
        afterImageUrl: '',
        recommendations: '',
    });
    const [galleries, setGalleries] = useState([]);
    const [errors, setErrors] = useState({});
    const [beforeImagePreview, setBeforeImagePreview] = useState(null);
    const [afterImagePreview, setAfterImagePreview] = useState(null);

    // Fetch galleries on component mount
    useEffect(() => {
        fetchGalleries();
    }, []);

    // Fetch galleries from the server
    const fetchGalleries = () => {
        axios.get('/Gallery')
            .then(response => setGalleries(response.data))
            .catch(error => console.error('Error fetching galleries:', error));
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGalleryForm({
            ...galleryForm,
            [name]: value,
        });
    };

    // Handle file input for before and after image selection
    const handleImageChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (name === "beforeImageUrl") {
                    setBeforeImagePreview(reader.result);
                    setGalleryForm({
                        ...galleryForm,
                        beforeImageUrl: file, // Store the file in the state
                    });
                } else if (name === "afterImageUrl") {
                    setAfterImagePreview(reader.result);
                    setGalleryForm({
                        ...galleryForm,
                        afterImageUrl: file, // Store the file in the state
                    });
                }
            };
            reader.readAsDataURL(file); // To show image preview
        }
    };

    // Handle form submission (add or update)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation for required fields
        const newErrors = {};
        if (!galleryForm.productName) newErrors.productName = "Product Name is required";
        if (!galleryForm.description) newErrors.description = "Description is required";
        if (!galleryForm.skinConcern) newErrors.skinConcern = "Skin Concern is required";
        if (!galleryForm.beforeImageUrl) newErrors.beforeImageUrl = "Before Image is required";
        if (!galleryForm.afterImageUrl) newErrors.afterImageUrl = "After Image is required";
        if (!galleryForm.recommendations) newErrors.recommendations = "Recommendations are required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); // Set errors if validation fails
            return;
        }

        // Proceed with add or update if no errors
        const formData = new FormData();
        formData.append('productName', galleryForm.productName);
        formData.append('description', galleryForm.description);
        formData.append('skinConcern', galleryForm.skinConcern);
        formData.append('beforeImageUrl', galleryForm.beforeImageUrl);
        formData.append('afterImageUrl', galleryForm.afterImageUrl);
        formData.append('recommendations', galleryForm.recommendations);

        if (galleryForm.id) {
            // Update gallery entry
            axios.put(`/Gallery/${galleryForm.id}`, formData)
                .then(response => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Gallery updated successfully!',
                        icon: 'success',
                        timer: 2500,
                        showConfirmButton: false
                    });
                    setGalleryForm({
                        id: '',
                        productName: '',
                        description: '',
                        skinConcern: '',
                        beforeImageUrl: '',
                        afterImageUrl: '',
                        recommendations: '',
                    });
                    setErrors({});
                    setBeforeImagePreview(null);
                    setAfterImagePreview(null);
                    fetchGalleries(); // Re-fetch galleries after update
                })
                .catch(error => {
                    console.error('Error updating gallery:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error updating gallery',
                        icon: 'error',
                        timer: 2500,
                        showConfirmButton: false
                    });
                });
        } else {
            // Create new gallery entry
            axios.post('/Gallery', formData)
                .then(response => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Gallery added successfully!',
                        icon: 'success',
                        timer: 2500,
                        showConfirmButton: false
                    });
                    setGalleryForm({
                        productName: '',
                        description: '',
                        skinConcern: '',
                        beforeImageUrl: '',
                        afterImageUrl: '',
                        recommendations: '',
                    });
                    setErrors({});
                    setBeforeImagePreview(null);
                    setAfterImagePreview(null);
                    fetchGalleries(); // Re-fetch galleries after add
                })
                .catch(error => {
                    console.error('Error adding gallery:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error adding gallery',
                        icon: 'error',
                        timer: 2500,
                        showConfirmButton: false
                    });
                });
        }
    };

    // Edit gallery data
    const handleEdit = (gallery) => {
        setGalleryForm(gallery);
        setErrors({});
        setBeforeImagePreview(gallery.beforeImageUrl);
        setAfterImagePreview(gallery.afterImageUrl);
    };

    // Delete gallery entry
    const handleDelete = (id) => {
        axios.delete(`/Gallery/${id}`)
            .then(response => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Gallery deleted successfully!',
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false
                });
                fetchGalleries(); // Re-fetch galleries after delete
            })
            .catch(error => {
                console.error('Error deleting gallery:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Error deleting gallery',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false
                });
            });
    };

    return (
        <div>
            <h2>Admin Gallery</h2>

            {/* Form for adding/updating gallery */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                        name="productName"
                        placeholder="Product Name"
                        value={galleryForm.productName}
                        onChange={handleChange}
                    />
                    {errors.productName && <div className="invalid-feedback">{errors.productName}</div>}
                </div>

                <div className="mb-3">
                    <textarea
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        name="description"
                        placeholder="Description"
                        value={galleryForm.description}
                        onChange={handleChange}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className={`form-control ${errors.skinConcern ? 'is-invalid' : ''}`}
                        name="skinConcern"
                        placeholder="Skin Concern"
                        value={galleryForm.skinConcern}
                        onChange={handleChange}
                    />
                    {errors.skinConcern && <div className="invalid-feedback">{errors.skinConcern}</div>}
                </div>

                {/* File input for Before Image */}
                <div className="mb-3">
                    <input
                        type="file"
                        className={`form-control ${errors.beforeImageUrl ? 'is-invalid' : ''}`}
                        name="beforeImageUrl"
                        onChange={handleImageChange}
                    />
                    {beforeImagePreview && (
                        <img src={beforeImagePreview} alt="Before Image Preview" style={{ width: '100px', marginTop: '10px' }} />
                    )}
                    {errors.beforeImageUrl && <div className="invalid-feedback">{errors.beforeImageUrl}</div>}
                </div>

                {/* File input for After Image */}
                <div className="mb-3">
                    <input
                        type="file"
                        className={`form-control ${errors.afterImageUrl ? 'is-invalid' : ''}`}
                        name="afterImageUrl"
                        onChange={handleImageChange}
                    />
                    {afterImagePreview && (
                        <img src={afterImagePreview} alt="After Image Preview" style={{ width: '100px', marginTop: '10px' }} />
                    )}
                    {errors.afterImageUrl && <div className="invalid-feedback">{errors.afterImageUrl}</div>}
                </div>

                <div className="mb-3">
                    <textarea
                        className={`form-control ${errors.recommendations ? 'is-invalid' : ''}`}
                        name="recommendations"
                        placeholder="Recommendations"
                        value={galleryForm.recommendations}
                        onChange={handleChange}
                    />
                    {errors.recommendations && <div className="invalid-feedback">{errors.recommendations}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Save</button>
            </form>

            {/* Gallery List */}
            <h3>Existing Galleries</h3>
            <div className="gallery-list">
                {galleries.map((gallery) => (
                    <div key={gallery.id} className="gallery-item">
                        <h4>{gallery.productName}</h4>
                        <button onClick={() => handleEdit(gallery)} className="btn btn-warning">Edit</button>
                        <button onClick={() => handleDelete(gallery.id)} className="btn btn-danger">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminGallery;
