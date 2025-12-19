import React from 'react'
import './BoughtTogether.css'
import ItemImg from '../../assets/BundleRecom/item-img.png'
import BoxImg from '../../assets/BundleRecom/box-img.png'
import { Plus } from 'lucide-react'

const BoughtTogether = () => {
  return (
    <div className="container" style={{marginBottom: '154px'}}>
        <div className="bought-together-container">
            <h1 className="head">Frequently bought together</h1>
            <div className="items-details-container">
                <div className="item-one-con">
                    <p className="item-desc">
                        <input type="checkbox" checked /> <span>21 Days Total Postpartum Care System</span>
                    </p>
                    <img src={ItemImg} alt="" className='item-img' />
                </div>
                <Plus className='plus-icon' />
                <div className="item-two-container">
                    <p className="item-desc">
                        <input type="checkbox" checked /> <span>Hospital-bag add-on </span>
                    </p>
                    <div className="item-details-lables">
                        <img src={BoxImg} alt="" className='item-img' />
                        <div className="labels-sec">
                            <p className="desc">This is the #1 combination chosen by moms preparing for birth.</p>
                            <div className="labels">
                                <p className="label">24 Pad Liners</p>
                                <p className="label">8 Underwear</p>
                                <p className="label">8 Cooling Pads</p>
                                <p className="label"> Witch Hazel Perineal Foam</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sepaartor-line"></div>
                <div className="price-details-con">
                    <p>Total Price</p>
                    <p className="price">$149.99</p>
                    <button className="button-pink-border">Add both to Bag +</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BoughtTogether