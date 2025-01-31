import React from "react";
import Header from '../../components/User/Header';
import './Community.css';

import com from '../../images/com.png';

export const Community = () => {
    return (
        <div>
            <Header />
            <div className="community-container">
                <div className="community-image">
                    <img src={com} alt="community" />
                </div>

                {/* New Section After Image */}
                <div className="brand-ambassador-section">
                    <h2>ALL KINDS OF COMMUNITY</h2>
                    <p>At Dermaluxe Skincare, Brand Ambassadors are just the beginning. There are countless ways to immerse yourself in the Dermaluxe
                        world. Here’s the scoop: </p>

                    <p1> Join our vibrant community of skincare enthusiasts, collaborate with like-minded individuals, and gain exclusive access to new
                        product launches. Explore opportunities to contribute as a content creator, share your skincare journey, or even host events to
                        inspire others. With Dermaluxe, you’re not just part of a brand you’re part of a movement dedicated to promoting radiant, healthy
                        skin for everyone.</p1>

                    <hr className="black-border" />

                    <div className="brand-content">
                        <div className="brand-details">
                            <h3>What Do Ambassadors Do?</h3>
                            <ul>
                                <li>Advocate for Bubble Skincare</li>
                                <li>Inspire your community to greet every day face-first</li>
                                <li>Spread brand awareness through word-of-mouth, social media, guerilla marketing, and events that support our movement</li>
                                <li>Participate in Dermaluxe’s product testing program, collaborating with our product developers and providing valuable feedback</li>
                            </ul>
                        </div>

                        <div className="brand-requirements">
                            <h3>Requirements</h3>
                            <ul>
                                <li>Must be 13 years of age to be a Dermaluxe Ambassador</li>
                                <li>Must have an active and public TikTok or Instagram account</li>
                                <li>Must provide valid email address + parent/guardian email address if under the age of 18</li>
                            </ul>
                        </div>
                    </div>

                    <div className="buttons">
                        <button className="apply-btn">Apply Now</button>
                        <button className="learn-more-btn">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
