import React from 'react'
import './BoughtTogether.css'
import ItemImg from '../../assets/BundleRecom/item-img.png'
import BoxImg from '../../assets/BundleRecom/box-img.png'
import { Check, Plus } from 'lucide-react'

const BoughtTogether = (props) => {
    const data = props.data;
    console.log("Bought Together" + data);
    const tags = data && data.boughtTogetherProduct && data.boughtTogetherProduct.metafields ? data.boughtTogetherProduct.metafields.find(m => m.key === 'tags') : [];
    
    if (!data) return null;
    
  return (
    <div className="container boughtTogetherCon" style={{marginBottom: '154px'}}>
        <div className="bought-together-container">
            <h1 className="head">Frequently bought together</h1>
            <div className="items-details-container">
                <div className="item-one-con">
                    <p className="item-desc">
                        <Check className='checkbox-icon' /> <span>{data.currentProduct.title}</span>
                    </p>
                    <img src={data.currentProduct.image} alt="" className='item-img' />
                </div>
                <Plus className='plus-icon' />
                <div className="item-two-container">
                    <p className="item-desc">
                        <Check className='checkbox-icon' /> <span>{data.boughtTogetherProduct.title} </span>
                    </p>
                    <div className="item-details-lables">
                        <img src={data.boughtTogetherProduct.image.url} alt="" className='item-img' />
                        <div className="labels-sec">
                            <p className="desc">This is the #1 combination chosen by moms preparing for birth.</p>
                            <div className="labels">
                                {
                                    tags.value.split('|').map((item,index)=> {
                                        return (
                                            <p className="label" key={index}>{item}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sepaartor-line"></div>
                <div className="price-details-con">
                    <p>Total Price</p>
                    <p className="price">${Number(data.currentProduct.price.amount) + Number(data.boughtTogetherProduct.price.amount)}</p>
                    <button className="button-pink-border">Add both to Bag +</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BoughtTogether