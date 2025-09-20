import React, { useState, useEffect, useRef, useCallback } from "react";
import MW from "../assets/images/MW.png";
import Fit from "../assets/images/Fit.png";
import Nut from "../assets/images/Nut.png";
import { useNavigate } from 'react-router-dom';

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Slide text data
  const slideTexts = [
    {
      title: "Mental Wellbeing",
      description:
        "Mental well-being is about taking care of your thoughts and emotions. It helps you manage stress, improve focus, and feel more balanced in daily life. Simple practices like meditation, mood tracking, and journaling can make a big difference in how you feel. By checking in with your mind regularly, you build emotional strength and a healthier outlook.",
    },
    {
      title: "Nutrition",
      description:
        "Fuel your body with the right nutrition for optimal health and energy. Discover balanced meal plans, nutritional guidance, and healthy eating habits that support your wellness journey. Learn about proper portion control, nutrient timing, and how to make sustainable dietary choices.",
    },
    {
      title: "Fitness",
      description:
        "Regular exercise helps improve strength, flexibility, and overall health. Whether it's through workouts, walking, or other activities, staying active can boost your energy, improve your mood, and help you feel your best every day.",
    },
  ];

  // Separate image data
  const images = [
    {
      image: MW,
      alt: "Mental Wellbeing Illustration",
    },
    {
      image: Nut,
      alt: "Nutrition Illustration",
    },
    {
      image: Fit,
      alt: "Fitness Illustration",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
  }, []);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slideTexts.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, slideTexts.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slideTexts.length) % slideTexts.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, slideTexts.length]);

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, currentSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide]);

  const handleRegisterClick = (event) => {
    event.preventDefault();
    navigate('/register');
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <section className="slider-section">
      <div 
        className="slider-container"
        ref={sliderRef}
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slides-wrapper">
          {slideTexts.map((text, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''} ${
                index < currentSlide ? 'prev' : index > currentSlide ? 'next' : ''
              }`}
              aria-hidden={index !== currentSlide}
            >
              <div className="slide-content">
                <div className="content-container">
                  <div className="slide-grid">
                    {/* Text Content */}
                    <div className="text-section">
                      <div className="text-content">
                        <h1 className="slide-title">{text.title}</h1>
                        <p className="slide-description">{text.description}</p>
                        <div className="cta-section">
                          <button
                            onClick={handleLoginClick}
                            className="cta-button primary"
                          >
                            Get Started
                          </button>
                          <button
                            onClick={() => goToSlide((currentSlide + 1) % slideTexts.length)}
                            className="cta-button secondary"
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Image Content */}
                    <div className="image-section">
                      <div className="image-container">
                        <img 
                          src={images[index].image} 
                          alt={images[index].alt}
                          className="slide-image"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                        <div className="image-overlay"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="slider-controls">
          <button
            className="control-button prev"
            onClick={prevSlide}
            disabled={isAnimating}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button
            className="control-button next"
            onClick={nextSlide}
            disabled={isAnimating}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {slideTexts.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}: ${slideTexts[index].title}`}
            >
              <span className="indicator-label">{slideTexts[index].title}</span>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentSlide + 1) / slideTexts.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Fixed Action Buttons - Removed */}

      <style jsx>{`
        .slider-section {
          position: relative;
          width: 100%;
          height: calc(100vh - 92px);
          overflow: hidden;
          background: #ffffff;
        }

        .slider-container {
          position: relative;
          width: 100%;
          height: calc(100vh - 92px);
          overflow: hidden;
        }

        .slides-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide.active {
          opacity: 1;
          transform: translateX(0);
          z-index: 2;
        }

        .slide.prev {
          transform: translateX(-100%);
        }

        .slide.next {
          transform: translateX(100%);
        }

        .slide-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 1rem 0;
          background: #ffffff;
        }

        .content-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .slide-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 4rem;
          height: 100%;
          max-height: calc(100vh - 92px - 4rem);
        }

        .text-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }

        .text-content {
          animation: slideInUp 0.8s ease-out 0.2s both;
        }

        .slide-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          color: #2c3e50;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .slide-description {
          font-size: clamp(1.1rem, 2.5vw, 1.3rem);
          color: #5a6c7d;
          line-height: 1.7;
          margin-bottom: 3rem;
          max-width: 90%;
        }

        .cta-section {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
          color: white;
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
        }

        .cta-button.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6);
        }

        .cta-button.secondary {
          background: transparent;
          color: #2c3e50;
          border: 2px solid #2c3e50;
        }

        .cta-button.secondary:hover {
          background: #2c3e50;
          color: white;
          transform: translateY(-2px);
        }

        .image-section {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        .image-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          height: auto;
          animation: slideInRight 0.8s ease-out 0.4s both;
        }

        .slide-image {
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
          transition: transform 0.5s ease;
          border-radius: 20px;
        }

        .slide-image:hover {
          transform: scale(1.05) rotate(2deg);
        }

        .image-overlay {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: linear-gradient(135deg, rgba(124, 169, 130, 0.1) 0%, rgba(124, 169, 130, 0.05) 100%);
          border-radius: 30px;
          z-index: -1;
        }

        .slider-controls {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 calc(2rem - 3px) 0 2rem;
          pointer-events: none;
          z-index: 10;
        }

        .control-button {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          pointer-events: all;
          color: #2c3e50;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .control-button:hover:not(:disabled) {
          background: #7ca982;
          border-color: #7ca982;
          color: white;
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(124, 169, 130, 0.3);
        }

        .control-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .slide-indicators {
          position: absolute;
          bottom: 6rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
          z-index: 10;
        }

        .indicator {
          position: relative;
          width: 60px;
          height: 4px;
          border: none;
          border-radius: 2px;
          background: rgba(44, 62, 80, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .indicator.active {
          background: linear-gradient(90deg, #ff6b6b 0%, #ee5a24 100%);
          width: 80px;
        }

        .indicator:hover {
          background: rgba(44, 62, 80, 0.4);
        }

        .indicator-label {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.8rem;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          margin-bottom: 0.5rem;
        }

        .indicator:hover .indicator-label {
          opacity: 1;
          visibility: visible;
        }

        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(44, 62, 80, 0.1);
          z-index: 10;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff6b6b 0%, #ee5a24 100%);
          transition: width 0.6s ease;
        }

        /* Action buttons styles removed */

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Tablet Styles */
        @media (max-width: 1024px) {
          .slide-grid {
            gap: 2rem;
            grid-template-columns: 1fr 0.8fr;
          }

          .content-container {
            padding: 0 1.5rem;
          }

          .slider-controls {
            padding: 0 calc(1rem - 3px) 0 1rem;
          }

        /* Mobile action buttons styles removed */
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .slider-section {
            height: calc(100vh - 92px);
          }

          .slide-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            text-align: center;
            max-height: calc(100vh - 92px - 2rem);
          }

          .text-section {
            order: 2;
          }

          .image-section {
            order: 1;
          }

          .slide-content {
            padding: 1rem 0;
          }

          .content-container {
            padding: 0 1rem;
          }

          .slide-description {
            max-width: 100%;
            margin-bottom: 2rem;
          }

          .cta-section {
            justify-content: center;
            gap: 0.5rem;
          }

          .cta-button {
            padding: 0.8rem 1.5rem;
            font-size: 0.9rem;
          }

          .control-button {
            width: 50px;
            height: 50px;
          }

          .slider-controls {
            padding: 0 calc(1rem - 3px) 0 1rem;
          }

          .slide-indicators {
            bottom: 4rem;
            gap: 0.5rem;
          }

          .indicator {
            width: 40px;
            height: 3px;
          }

          .indicator.active {
            width: 60px;
          }

        /* Mobile action buttons styles removed */
        }

        /* Small Mobile Styles */
        @media (max-width: 480px) {
          .slide-content {
            padding: 0.5rem 0;
          }

          .content-container {
            padding: 0 0.8rem;
          }

          .slide-grid {
            gap: 1rem;
            max-height: calc(100vh - 92px - 1rem);
          }

          .slide-title {
            margin-bottom: 1rem;
          }

          .slide-description {
            margin-bottom: 1.5rem;
          }

          .image-container {
            max-width: 300px;
          }

          .cta-section {
            flex-direction: column;
            align-items: center;
            gap: 0.8rem;
          }

          .cta-button {
            width: 200px;
            padding: 0.8rem 1rem;
          }

          .control-button {
            width: 45px;
            height: 45px;
          }

          .slider-controls {
            padding: 0 calc(0.5rem - 3px) 0 0.5rem;
          }

          .slide-indicators {
            bottom: 3rem;
          }

          .indicator {
            width: 30px;
          }

          .indicator.active {
            width: 45px;
          }

        /* Mobile action buttons styles removed */
        }

        /* Extra Small Mobile */
        @media (max-width: 320px) {
          .slide-grid {
            gap: 0.8rem;
            max-height: calc(100vh - 92px - 1rem);
          }

          .image-container {
            max-width: 250px;
          }

          .cta-button {
            width: 180px;
          }

          .indicator-label {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Slider;