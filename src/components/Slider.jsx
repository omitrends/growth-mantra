import React from 'react';
import "./css/style.css";
import "./css/bootstrap.css";
import "./css/responsive.css";
import MW from "../assets/images/MW.png";
import Fit from "../assets/images/Fit.png";
import Nut from "../assets/images/Nut.png";

function Slider() {
  // Slide data
  const slides = [
    {
      title: "Mental Wellbeing",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      image: MW,
      alt: "Mental Wellbeing Illustration",
    },
    {
      title: "Nutrition",
      description:
        "Your fitness journey starts here. Explore workouts, track progress, and reach new heights. With personalized plans, expert guidance, and progress tracking, you'll have everything you need to succeed.",
      image: Nut,
      alt: "Nutrition Illustration",
    },
    {
      title: "Fitness",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      image: Fit,
      alt: "Fitness Illustration",
    },
  ];

  return (
    <section className="slider_section position-relative">
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              aria-hidden={index !== 0}
            >
              <div className="slider_item-box">
                <div className="slider_item-container">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="slider_item-detail">
                          <h1>{slide.title}</h1>
                          <p>{slide.description}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="slider_img-box">
                          <img src={slide.image} alt={slide.alt} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Navigation Arrows */}
        <div className="custom_carousel-control">
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
            aria-label="Previous"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
            aria-label="Next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      {/* Fixed Login and Registration Buttons */}
      <div className="fixed-buttons">
        <a href="/login" className="text-uppercase custom_orange-btn mr-3">
          Login
        </a>
        <a href="/register" className="text-uppercase custom_dark-btn">
          Register
        </a>
      </div>
    </section>
  );
}

export default Slider;