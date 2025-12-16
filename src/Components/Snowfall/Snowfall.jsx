import React from 'react'
import './Snowfall.css'

const Snowfall = () => {
  // Create 50 snowflakes with random properties
  const snowflakes = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDuration: 5 + Math.random() * 10,
    animationDelay: Math.random() * 5,
    fontSize: 5 + Math.random() * 10,
    opacity: 0.5 + Math.random() * 0.5
  }))

  return (
    <div className="snowfall-container">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
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
