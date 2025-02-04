import React from 'react';
import Header from '../../components/User/Header';
import '../../App.css';

import woman from '../../images/woman.png';
import womans from '../../images/woman1.png';
import skincare from '../../images/skincare.png';
import customer from '../../images/Customer.png';
import birthday from '../../images/Birthday.png';
import friends from '../../images/Friends.png';
import social from '../../images/Social Media Engagement.png';
import review from '../../images/Product Reviews.png';
import purchase from '../../images/Purchase.png';

import Video from '../../images/Video1.mp4';

export const Reward = () => {
    return (
        <div className="reward-container">
            <Header />
            <div className="reward-content">
                <div className="reward-text">
                    <h1>EARN POINT WITH EVERY PURCHASE</h1>
                    <h2>OUR EXCLUSIVE REWARDS PROGRAM</h2>
                    <p>
                        As an online shopper, brand partner, or brand partner customer, you can now
                        earn points with every purchase, unlocking a world of benefits. Enjoy special
                        discounts, freebies, and exclusive promotions designed just for you. Our
                        program is easy to join – simply create an account on our website and start
                        earning rewards today. Experience the transformative power of Radical Skincare
                        while enjoying the perks of being a valued customer. Shop now and let us reward
                        your loyalty every step of the way. Also keep an eye out for special shopping
                        days where you can earn more points!
                    </p>
                </div>
                <div className="reward-image">
                    <img src={woman} alt="Happy Customer" />
                </div>
            </div>

            <div className="reward-secondary-content">
                <h1 className="centered-heading">EARN POINT & UNLOCK REWARDS</h1>
                <div className="reward-secondary-wrapper">
                    <div className="reward-secondary-image">
                        <img src={skincare} alt="skincare" />
                    </div>
                    <div className="reward-secondary-text">
                        <p>
                            As a valued customer of Radical Skincare, you have the opportunity to earn points and unlock a world of rewards.
                            By purchasing Radical Skincare products and sharing your favorite items, you can accumulate points to use towards even
                            more of our exceptional skincare offerings. However, we’ve also created additional avenues for you to earn rewards beyond
                            purchases and recommendations. Here are the various ways to earn and enjoy the benefits of being a part of our Radical Skincare
                            community. <br /> <br />
                            Remember, the more engaged and involved you are with Radical Skincare, the more rewards you can earn and the more you can
                            save when purchasing your favorite Radical products! Explore these alternative ways to accumulate points and enhance your
                            skincare journey with us.
                        </p>
                    </div>
                </div>
            </div>

            <div className="reward-steps">
                <h2 className="centered-heading1">POWER OF SHARING & EARNING</h2>
                <div className="reward-steps-wrapper">
                    <div className="reward-step">
                        <h3>Step 1</h3>
                        <p>
                            Sign in to your Radical Skincare customer account or create a new one.
                            If you already have an account, 1000 pts. will automatically be applied.
                        </p>
                    </div>
                    <div className="reward-step">
                        <h3>Step 2</h3>
                        <p>
                            Discover the share options for your favorite Radical Skincare products.
                            When you share products or write reviews, you will earn points.
                        </p>
                    </div>
                    <div className="reward-step">
                        <h3>Step 3</h3>
                        <p>
                            Share the love by sending the product links to your friends, family, and beyond.
                            When someone purchases, you earn points!
                        </p>
                    </div>
                </div>
            </div>

            <div className="reward-ways-to-earn">
                <h2 className="centered-heading2">WAYS TO EARN</h2>
                <div className="ways-to-earn-wrapper">

                    <div className="way-to-earn">
                        <img src={customer} alt="Customer" className="icon" />
                        <h3>Create a Customer Account</h3>
                        <p>Earn 1,000 points<br />
                            Join us and earn by creating a customer account. Already have an account? No Problem! You have automatically earned points! Enjoy exclusive offers and personalized skincare recommendations as part of our community.
                        </p>
                        <button>Create Account</button>
                    </div>

                    <div className="way-to-earn">
                        <img src={birthday} alt="Birthday" className="icon" />
                        <h3>Birthday</h3>
                        <p>Celebrate with 500 points on your special day<br />
                            Celebrate your birthday with us and receive points as a special gift. It's our way of making your day even more memorable.
                        </p>
                        <button>Set Birthday</button>
                    </div>


                    <div className="way-to-earn">
                        <img src={friends} alt="Refer Products to Your Friends" className="icon" />
                        <h3>Refer Products to Your Friends</h3>
                        <p>Earn 1,000 points for each successful referral<br />
                            Share the love for Radical Skincare with friends and earn points for each successful referral. Spread the word and enjoy the rewards together.
                        </p>
                        <button>Refer Friends</button>
                    </div>

                    <div className="way-to-earn">
                        <img src={social} alt="Social Media" className="icon" />
                        <h3>Social Media Engagement</h3>
                        <p>Earn 250 points<br />
                            Like and follow Radical Skincare on Facebook, Instagram, and other social media platforms to earn points.
                        </p>
                        <button>Share on Social</button>
                    </div>

                    <div className="way-to-earn">
                        <img src={review} alt="Product" className="icon" />
                        <h3>Product Reviews</h3>
                        <p>Earn 500 points<br />
                            Share your experiences with Radical Skincare products by writing reviews on our website or other trusted review platforms to earn points. Your feedback helps others make informed decisions and rewards you in return.
                        </p>
                        <button>Write Review</button>
                    </div>

                    <div className="way-to-earn">
                        <img src={purchase} alt="Purchase" className="icon" />
                        <h3>Purchase Products</h3>
                        <p>Earn 1 point for every dollar spent<br />
                            $1 discount for every 100 points!
                        </p>
                        <button>Shop Products</button>
                    </div>
                </div>
            </div>

            <div className="reward-video">
                <video autoPlay loop muted>
                    <source src={Video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="reward-point">
                <div className="reward-point-wrapper">
                    <div className="reward-point-image">
                        <img src={womans} alt="point" />
                    </div>
                    <div className="reward-point-text">
                        <h1 className="centered-heading3">HOW TO USE YOUR POINTS</h1>
                        <p>
                            Redeeming your Dermaluxe Skincare Points is easy and rewarding! Once you've accumulated 1000 Points,
                            you unlock the opportunity to access exclusive product recommendations and special discounts. To redeem your points,
                            simply choose from the various redemption options below. You can decide whether to use a portion of your points or
                            redeem the entire amount, based on what best suits your needs. Once you've selected the amount you'd like to redeem,
                            click on it to receive your personalized discount code, which will apply directly to your next purchase. This system
                            allows you to enjoy a full range of benefits, from discounts on high-quality skincare products to the excitement of
                            discovering new essentials that could enhance your skincare routine.

                            These product recommendations and discounts are our way of showing appreciation for your continued loyalty to
                            Dermaluxe Skincare. We understand how important your skincare journey is, and we want to ensure that you’re getting the
                            most out of every purchase. By redeeming your points, you're not only saving money but also gaining access to exclusive
                            product insights that will help you make informed decisions on which Dermaluxe products are perfect for your skin. So go ahead,
                            enjoy the rewards, and feel confident that Dermaluxe is with you every step of the way in your skincare transformation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
