import axios from 'axios';
import React, { useState } from 'react';

const GalleryForm = () => {
    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        skinConcern: '',
        recommendation: '',
        beforeImage: null,
        afterImage: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],  // Save the first selected file (image)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('productName', formData.productName);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('skinConcern', formData.skinConcern);
        formDataToSend.append('recommendation', formData.recommendation);
        formDataToSend.append('beforeImage', formData.beforeImage);
        formDataToSend.append('afterImage', formData.afterImage);

        try {
            // POST request to your backend
            const response = await axios.post('http://localhost:8081/Gallery', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Gallery item added successfully!');
            setFormData({
                productName: '',
                description: '',
                skinConcern: '',
                recommendation: '',
                beforeImage: null,
                afterImage: null,
            });
        } catch (error) {
            console.error('Error uploading gallery item:', error);
            alert('Failed to add gallery item!');
        }
    };

    return (
        <div>
            <h2>Upload Gallery Item</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Skin Concern:</label>
                    <input
                        type="text"
                        name="skinConcern"
                        value={formData.skinConcern}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Recommendation:</label>
                    <input
                        type="text"
                        name="recommendation"
                        value={formData.recommendation}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Before Image:</label>
                    <input
                        type="file"
                        name="beforeImage"
                        onChange={handleImageChange}
                        required
                    />
                </div>

                <div>
                    <label>After Image:</label>
                    <input
                        type="file"
                        name="afterImage"
                        onChange={handleImageChange}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default GalleryForm;
