import React, { useState, useEffect } from 'react'
import './Contact.css'
import { Clock, Mail, Smartphone } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const Contact = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // ============ STATE FOR FIREBASE DATA ============
    const [heroSection, setHeroSection] = useState(null);
    const [faqSection, setFaqSection] = useState(null);
    const [recoverySection, setRecoverySection] = useState(null);
    const [contactMethods, setContactMethods] = useState(null);
    const [returnsSection, setReturnsSection] = useState(null);
    const [loading, setLoading] = useState(true);

    // ============ FETCH CONTACT PAGE DATA FROM FIREBASE ============
    useEffect(() => {
        const fetchContactPageData = async () => {
            try {
                setLoading(true);
                
                // Fetch all documents in parallel
                const [heroDoc, faqDoc, recoveryDoc, contactDoc, returnsDoc] = await Promise.all([
                    getDoc(doc(db, 'contactpage', 'herosection')),
                    getDoc(doc(db, 'contactpage', 'faqsection')),
                    getDoc(doc(db, 'contactpage', 'recoveryconcierge')),
                    getDoc(doc(db, 'contactpage', 'contactmethods')),
                    getDoc(doc(db, 'contactpage', 'returnssection'))
                ]);

                if (heroDoc.exists()) {
                    setHeroSection(heroDoc.data());
                    console.log('Hero Section:', heroDoc.data());
                }

                if (faqDoc.exists()) {
                    setFaqSection(faqDoc.data());
                    console.log('FAQ Section:', faqDoc.data());
                }

                if (recoveryDoc.exists()) {
                    setRecoverySection(recoveryDoc.data());
                    console.log('FAQ Section:', recoveryDoc.data());
                }

                if (contactDoc.exists()) {
                    setContactMethods(contactDoc.data());
                    console.log('Contact Methods:', contactDoc.data());
                }

                if (returnsDoc.exists()) {
                    setReturnsSection(returnsDoc.data());
                    console.log('Returns Section:', returnsDoc.data());
                }

            } catch (error) {
                console.error('Error fetching contact page data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContactPageData();
    }, []);

  return (
    <>
        <div className="container">
            <div className="contact-page-heading-container">
                <h2>{heroSection?.heroData.topLabel || 'contact us'}</h2>
                <h1>{heroSection?.heroData.heading || "We're Here for You."}</h1>
                <p className='description'><Clock />{heroSection?.heroData.subtext || 'We usually respond the same day.'}</p>
            </div>

            <div className="faqs-section">
                <h1>{faqSection?.faqData.heading || 'Have a question?'}</h1>
                <h2>{faqSection?.faqData.description || 'You might find your answer in our FAQ before getting in touch.'}</h2>
                <button className='button-pink-center' onClick={() => navigate(faqSection?.faqData.buttonLink || '/faqs')}>
                    {faqSection?.faqData.buttonText || 'FREQUENTLY ASKED QUESTIONS'}
                </button>
            </div>

            <div className="contact-details-section">
                <h2 className="sub-heading" dangerouslySetInnerHTML={{ __html: recoverySection?.recoveryData.heading || ''}}></h2>
                <p className="desc" dangerouslySetInnerHTML={{ __html: recoverySection?.recoveryData.highlightText || 'If you are currently in labor or experiencing a medical emergency, please contact your healthcare provider immediately.' }}></p>
            </div>

            <div className='contact-section-details-con'>
                <div className="row w-100 m-0 p-0">
                    <div className="col-4 email-details-section">
                        <p className="heading"><Mail /> {contactMethods?.emailSection?.heading || 'Email'}</p>
                        <p className="response-txt"><Clock /> {contactMethods?.emailSection?.description || 'Response time: within 8 hours.'}</p>

                        {contactMethods?.emailSection?.items?.map((item, index) => (
                            <p className="email-item" key={index}>
                                <span className="active">{item.label}</span>
                                <span className="txt-mail">{item.email}</span>
                            </p>
                        )) || (
                            <>
                                <p className="email-item">
                                    <span className="active">For general enquires</span>
                                    <span className="txt-mail">care@themommyfirst.com</span>
                                </p>
                                <p className="email-item">
                                    <span className="active">For order queries</span>
                                    <span className="txt-mail">orders@themommyfirst.com</span>
                                </p>
                                <p className="email-item">
                                    <span className="active">For support</span>
                                    <span className="txt-mail">support@themommyfirst.com</span>
                                </p>
                            </>
                        )}

                        <p className="description-txt">{contactMethods?.emailSection?.note || 'For assistance outside these hours, please email customer support.'}</p>
                    </div>

                    <div className="col-4 mobile-details-section">
                        <p className="heading"><Smartphone /> {contactMethods?.phoneSection?.heading || 'Phone'}</p>
                        <p className="response-txt"><Clock /> {contactMethods?.phoneSection?.description || 'Mon - Sat 9:00 AM - 5:00 PM - EST'}</p>
                        <p className="mobile-number">{contactMethods?.phoneSection?.phoneNumber || '(845) 300-9289'}</p>

                        <p className="heading margin-more"><Smartphone /> {contactMethods?.phoneSection?.whatsappHeading || 'WhatsApp'}</p>
                        <p className="response-txt"><Clock /> {contactMethods?.phoneSection?.whatsappDescription || 'Response time: within 4 hours.'}</p>
                        <p className="mobile-number">{contactMethods?.phoneSection?.whatsappNumber || '(845) 300-9289'}</p>

                        <p className="description-txt">{contactMethods?.phoneSection?.note || 'For assistance outside these hours, please email customer support.'}</p>
                    </div>

                    <div className="col-4 contact-det-sec">
                        <h1>{contactMethods?.businessSection?.heading || 'Global Infrastructure. Local Care.'}</h1>
                        <h2>{contactMethods?.businessSection?.subheading || 'Partner with the leader in premium postpartum solutions.'}</h2>
                        <button className='button-pink-center' onClick={() => navigate(contactMethods?.businessSection?.buttonLink || '/enquiries')}>
                            {contactMethods?.businessSection?.buttonLabel || 'BUSINESS ENQUIRIES'}
                        </button>
                    </div>
                </div>
            </div>

            <div className='contact-return-text-changes'>
                <h1>{returnsSection?.returnsData.heading || 'Returns & Exchanges'}</h1>
                <h2 dangerouslySetInnerHTML={{ __html: returnsSection?.returnsData.description || "The Perfect Fit Promise Wrong size? Damaged box? Don't stress. We prioritize exchanges and replacements to get you the right care, fast."}}></h2>
                {
                    isAuthenticated ? (
                        <button className="button-pink-center" onClick={() => navigate(returnsSection?.authenticatedButtonLink || '/profile/#orders')}>
                            {returnsSection?.authenticatedButtonText || 'Returns & Exchanges'}
                        </button>
                    ) : (
                        <button className="button-pink-center" data-bs-toggle="offcanvas" data-bs-target="#AuthenticationModal">
                            {returnsSection?.unauthenticatedButtonText || 'LOGIN TO YOUR ACCOUNT'}
                        </button>
                    )
                }
            </div>
        </div>
    </>
  )
}

export default Contact