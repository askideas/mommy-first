import React, { useState, useRef, useEffect } from 'react'
import './HomeVideoSection.css'
import { Play, Pause } from 'lucide-react'

const HomeVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef(null);
  const iframeRef = useRef(null);

  // Initialize YouTube Player API
  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        events: {
          onReady: (event) => {
            event.target.playVideo();
            event.target.mute();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          }
        }
      });
    };
  }, []);

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  return (
    <div className="container" style={{marginBottom: '154px'}}>
        <h1 className="video-section-heading">See How It Works</h1>
        <div className="filters-section my-4">
            <button className='filter-button active'>Postpartum Recovery Essential Kit </button>
            <button className='filter-button'>C-Section Recovery Kit </button>
            <button className='filter-button'>Mega Recovery Kit </button>
        </div>
        <div className="video-container">
            <div className="video">
              <iframe
                id="youtube-player"
                ref={iframeRef}
                src="https://www.youtube.com/embed/rvShmUW1SBs?autoplay=1&mute=1&controls=0&loop=1&playlist=rvShmUW1SBs&modestbranding=1&showinfo=0&rel=0&enablejsapi=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
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
  )
}

export default HomeVideoSection