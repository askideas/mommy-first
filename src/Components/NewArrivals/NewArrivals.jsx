import React from 'react'
import './NewArrivals.css'
import Heading from '../Heading/Heading'
import { ChevronDown } from 'lucide-react'
import ProductTile from '../ProductTile/ProductTile'
import P1 from '../../assets/products/prd1.svg'
import P2 from '../../assets/products/prd2.svg'
import P3 from '../../assets/products/prd3.svg'
import P4 from '../../assets/products/prd4.svg'

const NewArrivals = () => {
    const headingData = {
        'title': "NEW ARRIVALS",
        'subtitle': "Every Step, Wrapped in Comfort",
        'description': false
    }

    const productsData = [
        {
            'id': 1,
            'image': P1,
            'name': 'EasyCleanse Peri Bottle',
            'price': '13.99',
            'label': '10K+ bought in past month'
        },
        {
            'id': 2,
            'image': P2,
            'name': 'High-Waisted Maternity Underwear',
            'price': '13.99',
            'label': '10K+ bought in past month'
        },
        {
            'id': 3,
            'image': P3,
            'name': 'Witch Hazel Foam +Liner Combo',
            'price': '13.99',
            'label': '10K+ bought in past month'
        },
        {
            'id': 4,
            'image': P4,
            'name': 'EasyCleanse Peri Bottle',
            'price': '13.99',
            'label': '10K+ bought in past month'
        }
    ]

  return (
    <div style={{marginBottom: '154px'}}>
        <Heading data={headingData} />
        <div className="container">
            <div className="new-arrivals-filter-section">
                <div className="filters-section my-4 justify-content-start flex-fill">
                    <button className='filter-button active'>ALL</button>
                    <button className='filter-button'>MATERNITY 🤰</button>
                    <button className='filter-button'>Postpartum 🤱</button>
                    <button className='filter-button'>Wellness & Comfort 🌿</button>
                </div>

                <div className="dropdown-filter">
                    <p>Filter BY</p>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle filter-dropdown-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ALL <ChevronDown className='icon' />
                        </button>
                        <ul class="dropdown-menu filter-drodown-menu">
                            <li>MATERNITY 🤰</li>
                            <li>Postpartum 🤱</li>
                            <li>Wellness & Comfort 🌿</li>
                        </ul>
                    </div>
                </div>
            </div> 

            <div className="newarrivals-products-container">
                {
                    productsData.map((item, index)=> {
                        return(
                            <ProductTile data={item} key={index} />
                        )
                    })
                }
            </div>
            
            <div className="d-flex flex-column justify-content-center align-items-center">
                <p className='progress-bar-text'>You’ve seen 4 out of 98 items</p>
                <div className="progress-bar-con">
                    <span></span>
                </div>
                <button className='button-label'>View more</button>
            </div>
            
        </div>
        
    </div>
  )
}

export default NewArrivals