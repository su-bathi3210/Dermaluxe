import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';


import facebookIcon from '../../images/facebook.png';
import instagram from '../../images/instagram.png';
import logo from '../../images/Dermaluxe.png';
import tiktok from '../../images/tiktok.png';
import twitterIcon from '../../images/twitter.png';
import youtube from '../../images/youtube.png';

export const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <Link to='/'><img src={logo} alt='Dermaluxe Logo' className='footer-logo' /></Link>
                    <p>
                        At Dermaluxe Skincare, we are committed to providing a luxurious and effective skincare experience that nurtures your skin and enhances your natural beauty. Our passion for skincare excellence is reflected in every product, crafted with the finest ingredients to nourish, hydrate, and rejuvenate. Whether you're looking for a daily skincare routine or a treatment for specific needs, our products are designed to meet your unique skincare goals. Visit us today at Dermaluxe Skincare, where radiant skin and self-care come together. <br></br><br></br>
                        Our commitment to quality, innovation, and sustainability ensures that every product not only supports your skin but also aligns with your values. We take pride in creating formulas that are cruelty-free, eco-conscious, and free from harmful additives, so you can feel good about what you’re putting on your skin.
                    </p>
                </div>

                <div className='footer-content-center'>
                    <h2>About</h2>
                    <ul>
                        <li>Dermaluxe Values</li>
                        <li><Link to='/contact'>Contact Dermaluxe</Link></li>
                        <li><Link to='/about'>About Us</Link></li><br />
                        <li>Gift Card</li><br />
                        <li>Dermaluxe Events</li><br />
                        <li>Careers</li>
                        <li>Beauty (Re)Purposed</li>
                        <li>Supply Chain Transparency</li>
                    </ul>
                </div>

                <div className='footer-content-right'>
                    <h2>Help</h2>
                    <ul>
                        <li><Link to='/consultation'>Dermaluxe Consultation</Link></li>
                        <li>Customer Service</li>
                        <li><Link to='/shipping'>Returns & Exchanges</Link></li>
                        <li>Beauty Services FAQ</li><br />
                        <li><Link to='/Reward'>Reward</Link></li><br />
                        <li>Store Locations</li>
                        <li>Flexible Payments</li>
                        <li>Delivery and Pickup Options</li>
                    </ul>
                </div>
            </div>

            <div className='footer-loyalty'>
                <h2>Join Our Loyalty Program</h2>
                <p>Sign up for our loyalty program and enjoy exclusive offers, discounts, and more! As a member, you'll earn points every time you dine with us, which you can redeem for exciting rewards.</p>
                <form>
                    <input type='email' placeholder='Enter Your Email To Join' />
                    <button type='submit'>Join Now</button>
                </form>
            </div><br></br>

            <hr />
            <div className='footer-bottom'>
                <p className='footer-copyright'>
                    Copyright 2025 © Dermaluxe.com - All Rights Reserved.
                </p>
                <div className='footer-social-icons'>
                    <img src={facebookIcon} alt='Facebook' />
                    <img src={instagram} alt='Instagram' />
                    <img src={tiktok} alt='Tiktok' />
                    <img src={twitterIcon} alt='Twitter' />
                    <img src={youtube} alt='Youtube' />
                </div>
            </div>
        </div>
    );
};

export default Footer;
