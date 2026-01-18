import React, { useState } from 'react'
import './PaymentSection.css'
import Card from '../../assets/profile/card.svg'
import { ChevronDown, Minus, Plus } from 'lucide-react'

const PaymentSection = () => {
    const [action, setAction] = useState('')
    
    const [payments, setPayments] = useState([
        {
            id: 1,
            cardType: 'VISA',
            cardNumber: '4532-1234-5678-2381',
            expiryDate: 'MM/YY',
            cvv: '123',
            nameOnCard: 'Sarah Johnson',
            isDefault: true
        },
        {
            id: 2,
            cardType: 'MASTERCARD',
            cardNumber: '5425-2334-5010-2381',
            expiryDate: 'MM/YY',
            cvv: '456',
            nameOnCard: 'Sarah Johnson',
            isDefault: false
        }
    ])

    const [newPaymentData, setNewPaymentData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
    })

    const toggleDefault = (id) => {
        setPayments(payments.map(payment =>
            payment.id === id 
                ? { ...payment, isDefault: true }
                : { ...payment, isDefault: false }
        ))
    }

    const removePayment = (id) => {
        setPayments(payments.filter(payment => payment.id !== id))
    }

    const handleNewPaymentChange = (e) => {
        const { name, value } = e.target
        setNewPaymentData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAddPayment = () => {
        if (newPaymentData.cardNumber && newPaymentData.expiryDate && newPaymentData.cvv && newPaymentData.nameOnCard) {
            const newPayment = {
                id: Math.max(...payments.map(p => p.id), 0) + 1,
                cardType: 'NEW',
                cardNumber: newPaymentData.cardNumber,
                expiryDate: newPaymentData.expiryDate,
                cvv: newPaymentData.cvv,
                nameOnCard: newPaymentData.nameOnCard,
                isDefault: false
            }
            setPayments([...payments, newPayment])
            setNewPaymentData({ cardNumber: '', expiryDate: '', cvv: '', nameOnCard: '' })
        }
    }

    return (
        <div className="payment-section-container">
            <div className="payment-section-header">
                <p className='heading'>
                    <img src={Card} alt="Payment" />
                    <span>Payments</span>
                </p>
            </div>

            <div className="payment-section-body">
                <div className="accordion accordion-flush" id="paymentListAccordian">
                    {payments.map((payment, index) => (
                        <div className="accordion-item" key={payment.id}>
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-payment${payment.id}`} aria-expanded="false" aria-controls={`flush-collapse-payment${payment.id}`}>
                                    <p className="payment-type">
                                        <span>{payment.cardType} - {payment.cardNumber.slice(-4)}</span>
                                    </p>

                                    <div className="make-default-section">
                                        <button className={`${payment.isDefault ? 'active' : ''}`}></button>
                                        <label htmlFor={`default-${payment.id}`}>Make as default</label>
                                    </div>

                                    <button className='accordian-icon' onClick={(e) => e.preventDefault()}>
                                        <ChevronDown />
                                    </button>
                                </button>
                            </h2>
                            <div id={`flush-collapse-payment${payment.id}`} className="accordion-collapse collapse" data-bs-parent="#paymentListAccordian">
                                <div className="accordion-body">
                                    <div className="payment-details-section">
                                        <div className="payment-detail-full">
                                            <span className='label'>Card Number</span>
                                            <span className="value">{payment.cardNumber}</span>
                                        </div>

                                        <div className="payment-detail-grid">
                                            <div className="payment-detail-item">
                                                <span className='label'>Expiry date</span>
                                                <span className="value">{payment.expiryDate}</span>
                                            </div>

                                            <div className="payment-detail-item">
                                                <span className='label'>CVV</span>
                                                <span className="value">{payment.cvv}</span>
                                            </div>
                                        </div>

                                        <div className="payment-detail-full">
                                            <span className='label'>Name on the card</span>
                                            <span className="value">{payment.nameOnCard}</span>
                                        </div>
                                    </div>
                                    <div className="action-btns">
                                        <button className="button-pink-border">Edit</button>
                                        <button className="button-pink-border" onClick={() => removePayment(payment.id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="add-payment-section">
                    <div className="accordion accordion-flush" id="addPaymentAccordian">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsePayment" aria-expanded="false" aria-controls="flush-collapsePayment">
                                    Add a payment method <button className="accordian-icon"><Plus className="plus-icon" /><Minus className="minus-icon"/></button>
                                </button>
                            </h2>
                            <div id="flush-collapsePayment" className="accordion-collapse collapse" data-bs-parent="#addPaymentAccordian">
                                <div className="accordion-body">
                                    <div className="add-payment-inputs-container">
                                        <div className="input-group-con full-width">
                                            <span className="label">Card Number</span>
                                            <input 
                                                type="text" 
                                                name="cardNumber"
                                                placeholder='0000-0000-0000'
                                                value={newPaymentData.cardNumber}
                                                onChange={handleNewPaymentChange}
                                            />
                                        </div>

                                        <div className="input-group-con">
                                            <span className="label">Expiry date</span>
                                            <input 
                                                type="text" 
                                                name="expiryDate"
                                                placeholder='MM/YY'
                                                value={newPaymentData.expiryDate}
                                                onChange={handleNewPaymentChange}
                                                maxLength="5"
                                            />
                                        </div>

                                        <div className="input-group-con">
                                            <span className="label">CVV</span>
                                            <input 
                                                type="text" 
                                                name="cvv"
                                                placeholder='000'
                                                value={newPaymentData.cvv}
                                                onChange={handleNewPaymentChange}
                                                maxLength="3"
                                            />
                                        </div>

                                        <div className="input-group-con full-width">
                                            <span className="label">Name on the card</span>
                                            <input 
                                                type="text" 
                                                name="nameOnCard"
                                                placeholder='Enter name'
                                                value={newPaymentData.nameOnCard}
                                                onChange={handleNewPaymentChange}
                                            />
                                        </div>

                                        <div className="form-note">
                                            <span className="lock-icon">🔒</span>
                                            <span>Your information is encrypted and secure</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="payment-section-footer">
                <p className="notification-message"></p>
                <button className='button-pink-center' onClick={handleAddPayment}>ADD</button>
            </div>
        </div>
    )
}

export default PaymentSection
