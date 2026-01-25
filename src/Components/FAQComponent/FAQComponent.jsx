import React, { useState } from 'react'
import './FAQComponent.css'
import { ChevronDown } from 'lucide-react'

const FAQComponent = ({ faqs, title, subtitle, description }) => {
  const [openId, setOpenId] = useState(null)

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="faq-component-wrapper">
      {(title || subtitle || description) && (
        <div className="faq-component-header">
          {title && <h2 className="faq-component-title">{title}</h2>}
          {subtitle && <h1 className="faq-component-subtitle">{subtitle}</h1>}
          {description && <p className="faq-component-description">{description}</p>}
        </div>
      )}

      <div className="faq-component-list">
        {faqs && faqs.map((faq) => (
          <div 
            className={`faq-component-item ${openId === faq.id ? 'faq-component-item-open' : ''}`} 
            key={faq.id}
          >
            <div className="faq-component-question" onClick={() => toggleFaq(faq.id)}>
              <span className="faq-component-question-text">{faq.question}</span>
              <button className="faq-component-icon-btn">
                <ChevronDown className={`faq-component-chevron ${openId === faq.id ? 'faq-component-chevron-rotated' : ''}`} />
              </button>
            </div>
            <div className={`faq-component-answer ${openId === faq.id ? 'faq-component-answer-open' : ''}`}>
              <div 
                className="faq-component-answer-content" 
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQComponent
