import React, { useState, useEffect, useRef } from 'react'
import Heading from '../Heading/Heading'
import './MommyFirstTrust.css'
import Loom from '../../assets/trust/loom.svg'
import Trust22 from '../../assets/trust/trust22.svg'
import Trust11 from '../../assets/trust/trust11.svg'
import Trust111 from '../../assets/trust/trust11-1.svg'
import BlueShade from '../../assets/trust/blue-shade.svg'
import Trust121 from '../../assets/trust/trust121.svg'
import TrustArrow from '../../assets/trust/trust-arrow.svg'
import Star from '../../assets/Reviews/star.svg'

const MommyFirstTrust = () => {
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef(null)

    // Intersection Observer to detect when component is in viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true)
                }
            },
            {
                threshold: 0.2, // Trigger when 20% of component is visible
            }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current)
            }
        }
    }, [isVisible])

    // Custom hook for smooth counter animation
    const useCounterAnimation = (target, duration = 4000, decimals = 0, shouldStart = false) => {
        const [count, setCount] = useState(0)
        const startTimeRef = useRef(null)
        const animationFrameRef = useRef(null)

        useEffect(() => {
            if (!shouldStart) return

            const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

            const animate = (currentTime) => {
                if (!startTimeRef.current) {
                    startTimeRef.current = currentTime
                }

                const elapsed = currentTime - startTimeRef.current
                const progress = Math.min(elapsed / duration, 1)
                const easedProgress = easeOutQuart(progress)
                const currentCount = easedProgress * target

                setCount(currentCount)

                if (progress < 1) {
                    animationFrameRef.current = requestAnimationFrame(animate)
                } else {
                    setCount(target)
                }
            }

            animationFrameRef.current = requestAnimationFrame(animate)

            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current)
                }
            }
        }, [target, duration, shouldStart])

        return decimals > 0 ? count.toFixed(decimals) : Math.floor(count)
    }

    // Animate each number - only start when visible
    const count20 = useCounterAnimation(20, 3000, 0, isVisible)
    const count4_9 = useCounterAnimation(4.9, 3000, 1, isVisible)
    const count99 = useCounterAnimation(99, 3000, 0, isVisible)
    const count9 = useCounterAnimation(9, 3000, 0, isVisible)

    const headingData = {
        'title': "WHY US",
        'subtitle': "Why Moms Trust Mommy First",
        'description': false
    }

  return (
    <div className="container" ref={containerRef}>
        <Heading data={headingData} />
        <div className="mommy-first-trust-container">
            <div className="first-grid">
                <div className="tile-one">
                    <img src={Trust11} alt="" className='image' />
                    <h1 className="heading">Cleanse with Care</h1>
                    <p className="count"><span>{count9}</span>/10</p>
                    <p className="description">new moms say it’s an essential postpartum item</p>
                    <img src={Trust111} alt="" />
                </div>
                <div className="tile-two">
                    <img src={BlueShade} alt="" className="blue-shade" />
                    <img src={Trust121} alt="" className="image" />
                    <div className="content-div">
                        <h1 className="heading">Cool & Calm</h1>
                        <h1 className="count">{count99} <span>%</span></h1>
                        <p className="description">of moms report soothing relief within the first 3 days of use</p>
                    </div>
                </div>
            </div>

            <div className="second-grid">
                <div className="tile-one">
                    <h1 className="heading">Inspired by moms. <br /> Strengthened by their trust.</h1>
                    <img src={TrustArrow} alt="" className="arrow-image" />
                    <div className="count"><span className="rating">{count4_9}</span><span className='out-of'>/5</span></div>
                    <div className="reviews-container">
                        <div className="description">Trusted by Moms <br /> Worldwide</div>
                        <div className="stars">
                            <img src={Star} alt="" />
                            <img src={Star} alt="" />
                            <img src={Star} alt="" />
                            <img src={Star} alt="" />
                            <img src={Star} alt="" />
                        </div>
                    </div>
                </div>
                <div className="tile-two">
                    <p className='m-0'><span className='gradient'>{count20}K+</span> <br /><span>Loving MOMS</span></p>
                    <img src={Trust22} alt="" />
                </div>
            </div>

            <div className="third-grid">
                <div className="trust-content">
                    <img src={Loom} alt="" />
                    <h1>Heal Naturally</h1>
                    <p>(Witch Hazel + Probiotics)</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MommyFirstTrust