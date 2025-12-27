import React from 'react'
import './Snowfall.css'

const Snowfall = () => {
  // Create snowflakes with distinct size categories
  const snowflakes = Array.from({ length: 100 }, (_, i) => {
    // Distribute sizes: 40% small, 35% medium, 25% large
    const random = Math.random()
    let size, sizeClass
    
    if (random < 0.4) {
      size = 8 + Math.random() * 4 // Small: 8-12px
      sizeClass = 'small'
    } else if (random < 0.75) {
      size = 12 + Math.random() * 6 // Medium: 12-18px
      sizeClass = 'medium'
    } else {
      size = 18 + Math.random() * 8 // Large: 18-26px
      sizeClass = 'large'
    }

    return {
      id: i,
      left: Math.random() * 100,
      animationDuration: 8 + Math.random() * 7, // 8-15s for smoother motion
      animationDelay: Math.random() * 8,
      fontSize: size,
      opacity: 0.6 + Math.random() * 0.4,
      sizeClass
    }
  })

  return (
    <div className="snowfall-container">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className={`snowflake snowflake-${flake.sizeClass}`}
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            fontSize: `${flake.fontSize}px`,
            opacity: flake.opacity
          }}
        >
          ❄
        </div>
      ))}
    </div>
  )
}

export default Snowfall
