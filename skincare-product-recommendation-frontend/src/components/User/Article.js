import { useState, useEffect } from 'react';
import Header from '../../components/User/Header';
import axios from 'axios';
import '../../App.css';

const Article = () => {
    const [articles, setArticles] = useState([]);

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

    return (
        <div>
            <Header />
            <div className="article-container">
                <h2 className="article-heading">Latest Articles</h2>
                <div className="article-list">
                    {articles.map((article) => (
                        <div key={article.id} className="article-item">
                            {article.imageUrl && (
                                <img src={article.imageUrl} alt={article.topic} className="article-image" />
                            )}
                            <h3 className="article-title">{article.topic}</h3>
                            <p className="article-description">{article.description}</p>
                            <a href={article.link} target="_blank" rel="noopener noreferrer" className="article-link">
                                Read More
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Article;
