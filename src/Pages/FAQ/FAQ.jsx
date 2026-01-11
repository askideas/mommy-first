import React from 'react'
import './FAQ.css'
import Heading from '../../Components/Heading/Heading'
import { ChevronDown } from 'lucide-react'

const FAQ = () => {
    const headingData = {
        'title': "FAQ",
        'subtitle': "Frequently Asked Questions",
        'description': 'Your most common questions—answered'
    }


  const Faqs = [
    {
      "id": 1,
      "question": "Are Mommy First™ products doctor-approved?",
      "answer": ""
    },
    {
      "id": 2,
      "question": "How fast do you ship?",
      "answer": ""
    },
    {
      "id": 3,
      "question": "What is your return policy?",
      "answer": "We offer free returns on unused products within 30 days of purchase. For hygienic reasons, opened or used products cannot be accepted. If you have any questions or concerns about your order, please reach out to us at <strong>admin@themommyfirst.com</strong> — we’re here to help."
    },
    {
      "id": 4,
      "question": "How do your products compare to hospital freebies?",
      "answer": ""
    },
    {
      "id": 5,
      "question": "Are your ingredients safe for postpartum?",
      "answer": ""
    },
    {
      "id": 6,
      "question": "Do you offer gift options?",
      "answer": ""
    },
    {
      "id": 7,
      "question": "Is checkout secure?",
      "answer": ""
    },
    {
      "id": 8,
      "question": "Where do you ship?",
      "answer": ""
    }
  ]

  return (
    <div className='mt-5'>
        <Heading data={headingData} />

        <div className="container">
            <div className="accordion accordion-flush" id="faqsAccordian">
                {
                    Faqs.map((faq, index)=> {
                        return (
                            <div className="accordion-item" key={index}>
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${faq.id}`} aria-expanded="false" aria-controls={`flush-collapse${faq.id}`}>
                                        {faq.question} <button className="icon-con"><ChevronDown className='' /></button>
                                    </button>
                                </h2>
                                <div id={`flush-collapse${faq.id}`} className="accordion-collapse collapse" data-bs-parent="#faqsAccordian">
                                    <div className="accordion-body" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>

        
    </div>
  )
}

export default FAQ