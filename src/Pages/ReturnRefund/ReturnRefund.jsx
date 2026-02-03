import React from 'react'
import './ReturnRefund.css'
import { Calendar } from 'lucide-react'

const ReturnRefund = () => {
  return (
    <div className="container">
        <div className="retun-refund-container">
            <h1 className="heading-sec">Return & Refund</h1>
            <p className="last-updated"><Calendar />Last updated January 24, 2026</p>
            <div className="contents-container-sec">
                <h1>Return & Refund Policy</h1>
                <p>At Mommy First, we want you to be completely satisfied with your purchase. If for any reason you're not happy with your order, we offer hassle-free returns within 30 days of purchase.</p>
                <br />
                <h1>Eligibility for Returns</h1>
                <ul>
                    <li>Items must be unused, unopened, and in their original packaging.</li>
                    <li>Items must be returned within 30 days of purchase.</li>
                    <li>We do not accept returns on used, damaged, or opened products for hygiene reasons.</li>
                    <li>Items marked as final sale cannot be returned or refunded.</li>
                </ul>
                <br />
                <h1>How to Initiate a Return</h1>
                <ul>
                    <li>Email us at customercare@neomedusa.com with your order number and reason for return.</li>
                    <li>Our team will review your request and provide return instructions.</li>
                    <li>Once your return is received and inspected, we will process your refund within 5-7 business days.</li>
                </ul>
                <br />
                <h1>Refunds & Processing Time</h1>
                <ul>
                    <li>Refunds will be credited to your original payment method within 5-7 business days after the return is received.</li>
                    <li>Shipping fees are non-refundable.</li>
                    <li>If your item was received damaged or defective, please contact us immediately for a replacement or refund.</li>
                </ul>
                <br />
                <h1>Return Shipping Costs</h1>
                <ul>
                    <li>Customers are responsible for return shipping costs unless the item is defective or incorrect.</li>
                    <li>We recommend using a trackable shipping service to ensure safe delivery.</li>
                </ul>
                <br />
                <h1>Need Help?</h1>
                <p>📧 Email us at: customercare@neomedusa.com</p>
                <p>📞 Call us at: (845) 300-9289</p>
                <p>⏰ Customer Service Hours: Monday - Saturday, 9 AM - 5 PM (EST)</p>
            </div>
        </div>
    </div>
    
  )
}

export default ReturnRefund