import React, { useState } from "react";
import Header from '../../components/User/Header';
import '../../App.css';

import com from '../../images/com.png';
import com1 from '../../images/community.png';
import sch from '../../images/SCH.png';

export const Community = () => {
    const [activeTab, setActiveTab] = useState("brandAmbassadors");

    return (
        <div>
            <Header />
            <div className="community-container">
                <div className="community-image">
                    <img src={com} alt="community" />
                </div>

                {/* New Section */}
                <div className="community-section">
                    <h2>All Kinds of Community</h2>
                    <p>
                        At Dermaluxe Skincare, Brand Ambassadors are only part of the story there are plenty of ways to
                        get involved! Join our exclusive skincare community to test and review new products before they launch,
                        collaborate with us on social media, and participate in exciting giveaways and special events. As a
                        member, you’ll gain access to expert skincare tips, early-bird discounts, and even have a say in product
                        development. Whether you're a skincare enthusiast, a beauty expert, or simply someone who loves glowing
                        skin, there’s a place for you at Dermaluxe. Join us in redefining beauty one radiant face at a time!
                    </p>

                    {/* Add horizontal lines above and below the navigation bar */}
                    <hr className="nav-hr" />
                    <div className="community-tabs">
                        <button
                            className={activeTab === "brandAmbassadors" ? "active" : ""}
                            onClick={() => setActiveTab("brandAmbassadors")}
                        >
                            Brand Ambassadors
                        </button>
                        <button
                            className={activeTab === "tyb" ? "active" : ""}
                            onClick={() => setActiveTab("tyb")}
                        >
                            TYB
                        </button>
                        <button
                            className={activeTab === "campusAmbassadors" ? "active" : ""}
                            onClick={() => setActiveTab("campusAmbassadors")}
                        >
                            Campus Ambassadors
                        </button>
                        <button
                            className={activeTab === "bubbleParents" ? "active" : ""}
                            onClick={() => setActiveTab("bubbleParents")}
                        >
                            Dermaluxe  Parents
                        </button>
                    </div>
                    <hr className="nav-hr" />

                    {activeTab === "brandAmbassadors" && (
                        <div className="ambassador-content">
                            {/* Left Content */}
                            <div className="ambassador-left">
                                <h3>What do Ambassadors do?</h3>
                                <ul>
                                    <li>Advocate for Dermaluxe Skincare</li>
                                    <li>Inspire your community to embrace glowing, healthy skin every day</li>
                                    <li>Spread brand awareness through word-of-mouth, social media, guerrilla marketing, and events that support our movement</li>
                                    <li>Participate in Dermaluxe’s  product testing program, collaborating with our product developers and providing valuable feedback</li>
                                </ul>
                                <div className="buttons">
                                    <button className="apply-btn">Apply Now</button>
                                    <button className="learn-btn">Learn More</button>
                                </div>
                            </div>

                            {/* First Vertical Divider */}
                            <div className="vertical-divider"></div>

                            {/* Middle Section with New Heading and Paragraph */}
                            <div className="ambassador-middle">
                                <h3>Brand Ambassadors</h3>
                                <p>
                                    As an Ambassador, you represent our voice in your community and you act as an extension of Dermaluxe Skincare.
                                </p>

                                {/* Middle Image */}
                                <div className="ambassador-image">
                                    <img src={com1} alt="Ambassador" />
                                </div>
                            </div>

                            {/* Second Vertical Divider */}
                            <div className="vertical-divider"></div>

                            {/* Right Content */}
                            <div className="ambassador-right">
                                <h4>Requirements</h4>
                                <ul>
                                    <li>Must be 13 years of age to be a Dermaluxe Skincare Ambassador</li>
                                    <li>Must have an active and public TikTok or Instagram account</li>
                                    <li>Must provide a valid email address + parent/guardian email if under the age of 18</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <div className="derma-community-section">
                    <div className="derma-community-section-container">
                        {/* Left Image */}
                        <div className="derma-community-image-container">
                            <img
                                src={sch}
                                alt="derma-community Example"
                                className="derma-community-image"
                            />
                        </div>

                        {/* Right Content */}
                        <div className="derma-community-content-container">
                            {/* Top Card */}
                            <div className="derma-community-card-orange">
                                <h2 className="derma-community-card-title">
                                    New-School Skincare is Crowd-Sourced
                                </h2>
                                <p className="derma-community-card-text">
                                    Since the beginning of Bubble, we’ve worked with over six-thousand
                                    real skincare lovers to plan, develop, test, and retest every
                                    product until it’s perfect. Our community is constantly expanding,
                                    and as a result, Bubble just keeps getting better and better.
                                </p>
                            </div>

                            {/* Bottom Card */}
                            <div className="derma-community-card-teal">
                                <h2 className="derma-community-card-title">
                                    Brand Ambassadors Lead Our Community
                                </h2>
                                <p className="derma-community-card-text">
                                    Our Brand Ambassadors play an essential role in sharing our vibes
                                    and values with the world! Our relationship with our community
                                    means everything to us. We value Ambassador’s impact and offer
                                    Ambassadors exclusive access to brand news, product launches, and
                                    more.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Community;
