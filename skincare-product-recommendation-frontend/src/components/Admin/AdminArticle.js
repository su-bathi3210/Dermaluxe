import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminArticle.css";
import { Button, Input, Table, Modal } from "antd";

const AdminArticle = () => {
    const [articles, setArticles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        id: "",
        category: "",
        topic: "",
        description: "",
        link: "",
        imageUrl: "",
    });

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get("http://localhost:8081/api/article");
            setArticles(response.data);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (form.id) {
            // Update article
            await axios.put(`http://localhost:8081/api/article/${form.id}`, form);
        } else {
            // Create new article
            await axios.post("http://localhost:8081/api/article", form);
        }
        fetchArticles();
        setIsModalOpen(false);
        setForm({ id: "", category: "", topic: "", description: "", link: "", imageUrl: "" });
    };

    const handleEdit = (article) => {
        setForm(article);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8081/api/article/${id}`);
        fetchArticles();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Admin - Manage Articles</h2>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>Add Article</Button>
            <Table dataSource={articles} rowKey="id" pagination={{ pageSize: 5 }} style={{ marginTop: "20px" }}>
                <Table.Column title="Category" dataIndex="category" key="category" />
                <Table.Column title="Topic" dataIndex="topic" key="topic" />
                <Table.Column title="Actions" key="actions"
                    render={(_, record) => (
                        <>
                            <Button onClick={() => handleEdit(record)} style={{ marginRight: "10px" }}>Edit</Button>
                            <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
                        </>
                    )}
                />
            </Table>

            <Modal title={form.id ? "Edit Article" : "Add Article"} visible={isModalOpen} onOk={handleSubmit} onCancel={() => setIsModalOpen(false)}>
                <Input placeholder="Category" name="category" value={form.category} onChange={handleInputChange} style={{ marginBottom: "10px" }} />
                <Input placeholder="Topic" name="topic" value={form.topic} onChange={handleInputChange} style={{ marginBottom: "10px" }} />
                <Input.TextArea placeholder="Description" name="description" value={form.description} onChange={handleInputChange} style={{ marginBottom: "10px" }} />
                <Input placeholder="Link" name="link" value={form.link} onChange={handleInputChange} style={{ marginBottom: "10px" }} />
                <Input placeholder="Image URL" name="imageUrl" value={form.imageUrl} onChange={handleInputChange} />
            </Modal>
        </div>
    );
};

export default AdminArticle;
