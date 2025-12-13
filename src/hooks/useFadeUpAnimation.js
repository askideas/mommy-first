import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook to trigger fade-up animation when element enters viewport
 * @param {number} threshold - Percentage of element visibility to trigger (0-1)
 * @returns {[ref, isVisible]} - Reference to attach to element and visibility state
 */
export const useFadeUpAnimation = (threshold = 0.2) => {
    const [isVisible, setIsVisible] = useState(false)
    const elementRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            {
                threshold: threshold,
                rootMargin: '0px',
            }
        )

        const currentElement = elementRef.current

        if (currentElement) {
            observer.observe(currentElement)
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement)
            }
        }
    }, [threshold])

    return [elementRef, isVisible]
}

/**
 * Helper function to get className with visible state
 * @param {string} baseClass - Base animation class (e.g., 'fade-up-animation')
 * @param {boolean} isVisible - Visibility state
 * @param {string} additionalClasses - Additional CSS classes
 * @returns {string} - Combined className string
 */
export const getFadeUpClass = (baseClass = 'fade-up-animation', isVisible = false, additionalClasses = '') => {
    const visibleClass = isVisible ? 'visible' : ''
    return `${baseClass} ${visibleClass} ${additionalClasses}`.trim()
}

/**
 * Global hook to automatically handle all fade-up animations on the page
 * Call this once in your App component
 */
export const useGlobalFadeUpAnimations = () => {
    useEffect(() => {
        const animationClasses = [
            'fade-up-animation',
            'fade-up-animation-fast',
            'fade-up-animation-slow',
            'fade-up-animation-delay-1',
            'fade-up-animation-delay-2',
            'fade-up-animation-delay-3',
            'fade-up-animation-delay-4',
            'fade-up-animation-delay-5'
        ]

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            {
                threshold: 0.2,
                rootMargin: '0px'
            }
        )

        // Observe all elements with fade-up animation classes
        const observeElements = () => {
            animationClasses.forEach((className) => {
                const elements = document.querySelectorAll(`.${className}`)
                elements.forEach((element) => {
                    if (!element.classList.contains('visible')) {
                        observer.observe(element)
                    }
                })
            })
        }

        // Initial observation
        observeElements()

        // Re-observe when DOM changes (for dynamically added elements)
        const mutationObserver = new MutationObserver(() => {
            observeElements()
        })

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        })

        return () => {
            observer.disconnect()
            mutationObserver.disconnect()
        }
    }, [])
}
