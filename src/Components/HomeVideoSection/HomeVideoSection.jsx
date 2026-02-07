import React, { useState, useRef, useEffect } from 'react'
import './HomeVideoSection.css'
import { useFadeUpAnimation, getFadeUpClass } from '../../hooks/useFadeUpAnimation'
import { Play, Pause } from 'lucide-react'

const HomeVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  // Animation refs
  const [contentRef, contentVisible] = useFadeUpAnimation(0.2)

  // Video data
  const videos = [
    {
      id: 0,
      title: 'Postpartum Recovery Essential Kit',
      url: 'https://cdn.shopify.com/videos/c/o/v/d29964256f064b178180a224a20d8342.mp4'
    },
    {
      id: 1,
      title: 'C-Section Recovery Kit',
      url: 'https://cdn.shopify.com/videos/c/o/v/ad9ffc4140ff4f598d111c3f67382e21.mp4'
    },
    {
      id: 2,
      title: 'Mega Recovery Kit',
      url: 'https://cdn.shopify.com/videos/c/o/v/0b635ad1bf6040e892023d27fa903e9e.mp4'
    }
  ];

  // Intersection Observer for autoplay/pause based on viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              // Video is in viewport - autoplay
              videoRef.current.play().catch(err => console.log('Autoplay prevented:', err));
              setIsPlaying(true);
            } else {
              // Video is out of viewport - pause
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of video is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [activeVideo]);

  // Handle video loading
  const handleVideoLoaded = () => {
    setIsLoading(false);
    // Autoplay after loading
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log('Autoplay prevented:', err));
      setIsPlaying(true);
    }
  };

  // Handle video change
  const handleVideoChange = (index) => {
    if (index === activeVideo) return;
    
    setIsLoading(true);
    setIsPlaying(false);
    setActiveVideo(index);
    
    // Scroll to video section
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(err => console.log('Play prevented:', err));
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="container" style={{marginBottom: '154px'}}>
        <div ref={contentRef} className={getFadeUpClass('fade-up-animation', contentVisible)}>
            <h1 className="video-section-heading">See How It Works</h1>
        </div>
        <div ref={contentRef} className={getFadeUpClass('fade-up-animation', contentVisible)} style={{animationDelay: '0.1s'}}>
            <div className="filters-section my-4">
                {videos.map((video, index) => (
                  <button 
                    key={video.id}
                    className={`filter-button ${activeVideo === index ? 'active' : ''}`}
                    onClick={() => handleVideoChange(index)}
                  >
                    {video.title}
                  </button>
                ))}
            </div>
        </div>
        <div ref={contentRef} className={getFadeUpClass('fade-up-animation', contentVisible)} style={{animationDelay: '0.2s'}}>
            <div className="video-container" ref={containerRef}>
                {isLoading && (
                  <div className="video-skeleton">
                    <div className="skeleton-shimmer"></div>
                    <div className="skeleton-play-icon">
                      <Play className='icon' />
                    </div>
                  </div>
                )}
                <div className="video" style={{ opacity: isLoading ? 0 : 1 }}>
                  <video
                    ref={videoRef}
                    key={videos[activeVideo].url}
                    src={videos[activeVideo].url}
                    muted
                    loop
                    playsInline
                    onLoadedData={handleVideoLoaded}
                    onWaiting={() => setIsLoading(true)}
                    onPlaying={() => setIsLoading(false)}
                  />
                  <div className="play-pause-overlay" onClick={togglePlayPause}>
                    {isPlaying ? (
                      <Pause className='icon' />
                    ) : (
                      <Play className='icon' />
                    )}
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeVideoSection