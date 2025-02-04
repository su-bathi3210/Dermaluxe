import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminQuery = () => {
    const [queries, setQueries] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [response, setResponse] = useState("");


    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await axios.get("http://localhost:8081/Query");
                setQueries(response.data);
            } catch (error) {
                console.error("Error fetching queries:", error);
            }
        };

        fetchQueries();
    }, []);

    // Handle editing a query (e.g., updating status or response)
    const handleEdit = (query) => {
        setSelectedQuery(query);
        setResponse(query.response || ""); // Pre-fill response if exists
    };

    // Handle submitting the response to a query
    const handleSubmitResponse = async () => {
        if (selectedQuery) {
            try {
                const updatedQuery = {
                    ...selectedQuery,
                    response: response,
                    status: "Responded",
                };

                const res = await axios.put(`http://localhost:8081/Query/${selectedQuery._id}`, updatedQuery);

                if (res.status === 200) {
                    setQueries(queries.map((query) => (query._id === selectedQuery._id ? updatedQuery : query)));
                    setSelectedQuery(null);
                    setResponse("");
                    alert("Response submitted successfully!");
                } else {
                    alert("Failed to submit response. Please try again.");
                }
            } catch (error) {
                console.error("Error submitting response:", error);
                alert("Error submitting response. Please try again.");
            }
        }
    };

    // Handle deleting a query
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8081/Query/${id}`);

            if (res.status === 200) {
                setQueries(queries.filter((query) => query._id !== id));
                alert("Query deleted successfully.");
            } else {
                alert("Failed to delete query. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting query:", error);
            alert("Error deleting query. Please try again.");
        }
    };

    return (
        <div className="admin-query-container">

            <div className="admin-query-content">
                <h2>Manage Customer Queries</h2>

                <div className="query-list">
                    {queries.length > 0 ? (
                        queries.map((query) => (
                            <div key={query._id} className="query-item">
                                <div className="query-details">
                                    <p><strong>Name:</strong> {query.name}</p>
                                    <p><strong>Email:</strong> {query.email}</p>
                                    <p><strong>Subject:</strong> {query.subject}</p>
                                    <p><strong>Message:</strong> {query.message}</p>
                                    <p><strong>Status:</strong> {query.status || "Pending"}</p>
                                    {query.response && <p><strong>Response:</strong> {query.response}</p>}
                                </div>
                                <div className="query-actions">
                                    <button onClick={() => handleEdit(query)} className="edit-btn">Edit Response</button>
                                    <button onClick={() => handleDelete(query._id)} className="delete-btn">Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No queries to display.</p>
                    )}
                </div>

                {selectedQuery && (
                    <div className="edit-response-form">
                        <h3>Edit Response for Query</h3>
                        <p><strong>Subject:</strong> {selectedQuery.subject}</p>
                        <textarea
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            placeholder="Enter your response here..."
                        />
                        <button onClick={handleSubmitResponse} className="submit-response-btn">
                            Submit Response
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminQuery;
