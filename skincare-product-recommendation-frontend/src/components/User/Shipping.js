import React from 'react';
import Header from '../../components/User/Header';
import '../../App.css';

import ship from '../../images/ship.png';

const Shipping = () => {
    return (
        <div className="shipping-container">
            <Header />
            <div className="shipping-image-container">
                <img
                    src={ship}
                    alt="Shipping Illustration"
                    className="shipping-image"
                />
            </div>

            <p className="shipping-description">
                We offer FREE Standard 1-3 Day Shipping on all US merchandise orders for Beauty Insider members, no minimum purchase required. Guest checkout orders receive FREE standard 1–3 day shipping with $50 minimum purchase. To sign up for our free loyalty program, visit our Beauty Insider Page.
            </p>

            <div className="shipping-grid">
                <div className="grid-header">Standard 1-3 Day Shipping (Beauty Insiders, No Minimum Purchase)</div>
                <div className="grid-header">Standard 1-3 Day Shipping (Guest Checkout Orders $50 and Over)</div>
                <div className="grid-header">Standard 1-3 Day Shipping (Guest Checkout Orders Under $50)</div>
                <div className="grid-header">Guaranteed 2 Business Day Shipping</div>
                <div className="grid-header">Guaranteed 1 Business Day Shipping</div>

                <div className="grid-item">FREE</div>
                <div className="grid-item">FREE</div>
                <div className="grid-item">$6.95</div>
                <div className="grid-item">$12.95</div>
                <div className="grid-item">$19.95</div>
            </div>

            <h2 className="shipping-title">SHIPPING COSTS & DELIVERY TIMES</h2>
            <p className="shipping-note">
                Below are the shipping-method options and costs. Please refer to your order and post-purchase notifications for more information.
            </p>

            <div className="shipping-table">
                <div className="table-header">Shipping Method</div>
                <div className="table-header">Costs</div>

                <div className="table-item">Standard 1-3 Day Shipping (Beauty Insiders)</div>
                <div className="table-item">FREE</div>

                <div className="table-item">Standard 1-3 Day Shipping (Guest Checkout Orders $50 and Over)</div>
                <div className="table-item">FREE</div>

                <div className="table-item">Standard 1-3 Day Shipping (Guest Checkout Orders Under $50)</div>
                <div className="table-item">$6.95</div>

                <div className="table-item">Guaranteed 2 Business Day Shipping</div>
                <div className="table-item">$12.95</div>

                <div className="table-item">Guaranteed 1 Business Day Shipping</div>
                <div className="table-item">$19.95</div>

                <div className="table-item">USPS Priority</div>
                <div className="table-item">$8.95</div>

                <div className="table-item">Gift Cards</div>
                <div className="table-item">FREE</div>

                <div className="table-item">eGift Cards</div>
                <div className="table-item">FREE</div>
            </div>

            <p className="shipping-note1">Dermaluxe.com offers 1–3 business day shipping as our standard shipping option on all skincare product orders. However, due to increased demand and potential delays, Dermaluxe.com orders may experience slight shipping disruptions. Standard shipping is FREE for loyalty program members with no minimum purchase required. For guest orders of $50 and over (excluding taxes), standard shipping is also FREE. For orders totaling less than $50, a shipping fee of $6.95 applies for standard shipping. Depending on the carrier, your order may arrive on a weekend. See below for more details on restricted items and specific shipping conditions. <br />
                Gift Cards are shipped separately from skincare product orders via USPS First Class Mail for FREE and typically arrive within 3–5 business days. Expedited shipping options are also available: $12.95 for 2-day shipping and $19.95 for 1-day shipping. Please review shipping cutoff times and estimated delivery dates during checkout.
            </p>

            <h2 className="delivery-time">Delivery Time</h2>
            <p className="delivery-note">
                Most orders arrive within 3-5 business days of order being confirmed. An order confirmation SMS/Email will be sent to you, post which we request you to keep a watch out for a SMS/Email notification that you will receive from us, once your order is shipped.
                We ship within 24-48 hours of receiving the order. Shipping  within India are usually 5-7 business days. If you are facing a delay - let us know at www.dermaluxe.com or call us at 1800 221 820 (between Monday-Saturday 10am to 10pm).
            </p>


            <h2 className="order-return-refund">ORDER RETURNS & REFUNDS</h2>
            <h2 className="delivery-time">Return Process</h2>
            <p className="delivery-note">
                All returns requests must be received within 48 of delivery. To return a product, view the order details in “My Account” section and click on “Return”. You can also email us email us at www.dermaluxe.com to register a return request. Once the request is processed, the return order will be picked up from the address provided by you while placing the return request. We do not accept return pick up for used products, upon delivery the customer has changed their mind or for orders which were wrongly placed. If orders were wrongly placed, the same should be informed to the team within 2 hours for us to cancel the shipment. <br />
                Please provide your product details and the reason for your return, so we can keep improving. Once your return request has been generated, we’ll send you a confirmation via SMS and email.<br />
                Please Note: We do not accept returns on COD Orders. Incase, the product has come damaged to you then you would have to send us a pictorial image along with the invoice on our email address: www.dermaluxe.com.
            </p>

            <h2 className="delivery-time">Refund Policy</h2>
            <p className="delivery-note">
                Refunds for returned products will be processed after a thorough quality inspection, which may take 5–7 working days following the receipt of goods at our fulfillment center. Once your returned order has reached our warehouse, the refund process will be initiated. Please note that refunds are not applicable for Cash on Delivery (COD) orders. Additionally, for orders where a promo code or discount was applied during purchase, the refund will be limited to the final amount paid after the discount. <br />
                For purchases made during specific promotional offers, such as the Paytm Offer, these offers cannot be combined with any other ongoing deals or discounts on our website. If the terms of the Paytm Offer are not met, we reserve the right to cancel or remove any additional products or gifts associated with the offer. Refunds for eligible returns will be credited back to the original payment method within 5–7 business days. However, we are not liable for any uncollected change left with the delivery personnel for COD orders.
            </p>

        </div>
    );
}

export default Shipping;
