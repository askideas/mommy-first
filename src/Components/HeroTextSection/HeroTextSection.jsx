import React, { useEffect, useRef, useState } from 'react'
import './HeroTextSection.css'
import Check from '../../assets/HeroText/check.svg'
import Ht1 from '../../assets/HeroText/ht1.svg'
import Ht2 from '../../assets/HeroText/ht2.svg'
import Ht3 from '../../assets/HeroText/ht3.svg'
import Ht4 from '../../assets/HeroText/ht4.svg'
import Round from '../../assets/HeroText/pink-round.png'
import Flower from '../../assets/HeroText/flower.png'

const HeroTextSection = () => {
  const sectionRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementTop = rect.top
        const elementBottom = rect.bottom
        const elementHeight = rect.height

        // Calculate progress based on viewport visibility
        // When element enters from bottom: progress goes from 0 to 1
        // When element is fully in view: progress stays at 1
        // When element exits from top: progress stays at 1 until it starts leaving, then goes back to 0
        
        if (elementBottom < 0) {
          // Element is completely above viewport
          setScrollProgress(0)
        } else if (elementTop > windowHeight) {
          // Element is completely below viewport
          setScrollProgress(0)
        } else if (elementTop <= windowHeight * 0.3 && elementBottom >= windowHeight * 0.7) {
          // Element is well within viewport (centered)
          setScrollProgress(1)
        } else if (elementTop < windowHeight) {
          // Element is entering from bottom or partially visible
          const visibleHeight = Math.min(elementBottom, windowHeight) - Math.max(elementTop, 0)
          const progress = visibleHeight / (elementHeight * 0.7)
          setScrollProgress(Math.min(1, progress))
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate transforms based on scroll progress
  const getTransform = (direction, finalPosition) => {
    const startOffset = direction === 'left' ? -200 : 200
    const currentOffset = startOffset + (finalPosition - startOffset) * scrollProgress
    
    // Clamp the value to not exceed the final position
    if (direction === 'left') {
      return Math.min(currentOffset, finalPosition)
    } else {
      return Math.max(currentOffset, finalPosition)
    }
  }
  return (
    <div className="container">
        <div className="hero-text-section-container" ref={sectionRef}>
            <p data-direction="left" style={{ transform: `translateX(${getTransform('left', 0)}px)` }}><span className='strike-one'>OBGYN-</span> <img src={Check} alt="" className='check mx-3' /> approved, <img src={Ht1} alt="" /></p>
            <p data-direction="right" style={{ transform: `translateX(${getTransform('right', -40)}px)` }}> mom-tested <img src={Ht2} alt="" className='mx-3' /> essentials</p>
            <p data-direction="left" style={{ transform: `translateX(${getTransform('left', 84)}px)` }}>that make healing feel <img src={Ht3} alt="" className='mx-3' /> natural,</p>
            <p data-direction="right" style={{ transform: `translateX(${getTransform('right', 114)}px)` }}>soothing, <img src={Ht4} alt="" className='mx-3' /> and <span className='strike-two'>stress-free.</span> </p>
            <div className='pink-round-section'>
              <div className="pink-round-container rotate-animation">
                  <img src={Round} alt="" className='bg-image ' />
              </div>
              <img src={Flower} alt="" className='flower ' />
              <p className="pink-round-text">
                  <span className="loved-by">Loved by</span>
                  <span className="count">10000+</span>
                  <span className="moms-text">MOMS</span>
                </p>
            </div>
            
        </div>
    </div>
  )
}

export default HeroTextSection