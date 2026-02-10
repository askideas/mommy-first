import React, { useState } from 'react'
import './BoughtTogether.css'
import ItemImg from '../../assets/BundleRecom/item-img.png'
import BoxImg from '../../assets/BundleRecom/box-img.png'
import { Check, Plus, Loader2 } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { toast } from 'react-toastify'

const BoughtTogether = (props) => {
    const data = props.data;
    const { addToCart, showCartNotification } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    
    const tags = data && data.boughtTogetherProduct && data.boughtTogetherProduct.metafields ? data.boughtTogetherProduct.metafields.find(m => m.key === 'tags') : [];
    
    if (!data) return null;

    const handleAddBothToCart = async () => {
        if (isAdding) return;
        
        setIsAdding(true);
        
        try {
            // Get variant IDs for both products (must be ProductVariant IDs, not Product IDs)
            const currentVariantId = data.currentProduct.variantId;
            const boughtTogetherVariantId = data.boughtTogetherProduct.variantId;
            
            if (!currentVariantId || !boughtTogetherVariantId) {
                toast.error('Product variant not available', {
                    autoClose: 1500,
                    hideProgressBar: true
                });
                setIsAdding(false);
                return;
            }
            
            // Add first product
            const response1 = await addToCart([{ variantId: currentVariantId, quantity: 1 }]);
            
            if (!response1.success) {
                toast.error(response1.message || 'Failed to add first product', {
                    autoClose: 1500,
                    hideProgressBar: true
                });
                setIsAdding(false);
                return;
            }
            
            // Add second product
            const response2 = await addToCart([{ variantId: boughtTogetherVariantId, quantity: 1 }]);
            
            if (response2.success) {
                showCartNotification(`${data.currentProduct.title} & ${data.boughtTogetherProduct.title}`, data.currentProduct.image);
            } else {
                toast.error(response2.message || 'Failed to add second product', {
                    autoClose: 1500,
                    hideProgressBar: true
                });
            }
        } catch (err) {
            console.error('Add to cart error:', err);
            toast.error('Something went wrong', {
                autoClose: 1500,
                hideProgressBar: true
            });
        } finally {
            setIsAdding(false);
        }
    };
    
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
                    <button 
                        className="button-pink-border" 
                        onClick={handleAddBothToCart}
                        disabled={isAdding}
                    >
                        {isAdding ? (
                            <>
                                <Loader2 className="spinner" style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
                                Adding...
                            </>
                        ) : (
                            'Add both to Bag +'
                        )}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BoughtTogether