import { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import "./Admin.css";
import axios from 'axios';

const AdminArticle = () => {
    const [articles, setArticles] = useState([]);
    const [showForm, setShowForm] = useState(false); // Controls popup visibility
    const [formData, setFormData] = useState({
        category: '',
        topic: '',
        description: '',
        link: '',
        imageUrl: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('/Articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadImage = async () => {
        if (!selectedFile) return null;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('/Articles/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let uploadedImageUrl = formData.imageUrl;

        if (selectedFile) {
            uploadedImageUrl = await uploadImage();
            if (!uploadedImageUrl) return;
        }

        const articleData = { ...formData, imageUrl: uploadedImageUrl };

        try {
            if (formData.id) {
                await axios.put(`/Articles/${formData.id}`, articleData);
            } else {
                await axios.post('/Articles', articleData);
            }

            fetchArticles();
            closeForm();
        } catch (error) {
            console.error('Error saving article:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/Articles/${id}`);
            fetchArticles();
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    const handleEdit = (article) => {
        setFormData(article);
        setShowForm(true); // Open form when editing
    };

    const openForm = () => {
        setFormData({
            category: '',
            topic: '',
            description: '',
            link: '',
            imageUrl: '',
        });
        setSelectedFile(null);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setFormData({
            category: '',
            topic: '',
            description: '',
            link: '',
            imageUrl: '',
        });
        setSelectedFile(null);
    };

    return (
        <div>
            <AdminNav />
            <div className="admin-article-container">
                <h1 className="admin-article-form-head">Articles</h1>
                <p className="admin-article-form-paragraph">
                    At Dermaluxe Skincare, our admin panel offers a streamlined solution for managing
                    consultations efficiently. This feature allows admins to review, schedule, update, and
                    respond to consultations promptly, ensuring clients receive timely and personalized care.
                    The admin panel makes it easy to manage consultation dates, times, statuses, and responses,
                    helping maintain a smooth and organized process while enhancing the overall customer experience.
                </p>
                <button className="add-article-btn" onClick={openForm}>Add New Article</button>

                {showForm && (
                    <div className="admin-article-modal">
                        <div className="admin-article-modal-content">
                            <span className="admin-article-close" onClick={closeForm}>&times;</span>
                            <h2>{formData.id ? 'Edit Article' : 'Add New Article'}</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="Category"
                                    required
                                />
                                <input
                                    type="text"
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    placeholder="Topic"
                                    required
                                />
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    required
                                />
                                <input
                                    type="text"
                                    name="link"
                                    value={formData.link}
                                    onChange={handleChange}
                                    placeholder="Link"
                                />
                                <input type="file" onChange={handleFileChange} accept="image/*" />
                                {formData.imageUrl && (
                                    <img src={formData.imageUrl} alt="Preview" className="admin-article-preview-img" />
                                )}
                                <button type="submit">
                                    {formData.id ? 'Update Article' : 'Add Article'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="article-table-container">
                    <table className="article-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Topic</th>
                                <th>Description</th>
                                <th>URL</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr key={article.id}>
                                    <td>{article.category}</td>
                                    <td>{article.topic}</td>
                                    <td>{article.description}</td>
                                    <td>{article.link}</td>
                                    <td>
                                        {article.imageUrl && <img src={article.imageUrl} alt={article.topic} className="preview-img" />}
                                    </td>
                                    <td>
                                        <button onClick={() => handleEdit(article)} className="admin-article-btn edit-btn">Edit</button>
                                        <button onClick={() => handleDelete(article.id)} className="admin-article-btn delete-btn">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default AdminArticle;
