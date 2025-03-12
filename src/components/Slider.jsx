import "./css/bootstrap.css";
import MW from "../assets/images/MW.png";
import Fit from "../assets/images/Fit.png";
import Nut from "../assets/images/Nut.png";
import {useNavigate} from 'react-router-dom';

function Slider() {
  // Slide text data
  const slideTexts = [
    {
      title: "Mental Wellbeing",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
    {
      title: "Nutrition",
      description:
        "Your fitness journey starts here. Explore workouts, track progress, and reach new heights. With personalized plans, expert guidance, and progress tracking, you'll have everything you need to succeed.",
    },
    {
      title: "Fitness",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
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

  const navigate = useNavigate();
  const handleregisterclick=(event)=>{
    event.preventDefault();
    navigate('/register');
  };
  const handlloginclick=(event)=>{
    event.preventDefault();
    navigate('/login');
  };
  
  return (
    <section className="slider_section">
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {slideTexts.map((text, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              aria-hidden={index !== 0}
            >
              <div className="slider_item-box">
                <div className="slider_item-container">
                  <div className="container">
                    <div className="row">
                      {/* Text Content Div */}
                      <div className="col-md-6">
                        <div className="slider_text-content">
                          <div className="slider_item-detail">
                            <h1>{text.title}</h1>
                            <p>{text.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Image Content Div */}
                      <div className="col-md-6">
                        <div className="slider_image-content">
                          <div className="slider_img-box">
                            <img src={images[index].image} alt={images[index].alt} />
                          </div>
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
        <a href="/login" onClick={handlloginclick} className="text-uppercase custom_orange-btn mr-3">
          Login
        </a>
        <a href="/register" onClick={handleregisterclick} className="text-uppercase custom_dark-btn">
          Register
        </a>
      </div>
    </section>
  );
}

export default Slider;