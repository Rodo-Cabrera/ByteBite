import React, {useEffect, useRef} from 'react'
import { Link } from 'react-router-dom';
import img1 from './../../../../img/landing/1.jpg'
import img2 from "./../../../../img/landing/2.jpg";
import img3 from "./../../../../img/landing/3.jpg";
import img4 from "./../../../../img/landing/4.jpg";
import './../styles/homeStyle.css'



const Landing = () => {


  const slideShow = useRef(null);
  const slideInterval = useRef(null);

  const next = () => {
    if (slideShow.current.children.length > 0) {

      console.log(slideShow);
    
      const firstSlide = slideShow.current.children[0];

      slideShow.current.style.transition = `1000ms ease-out all`;

      const slideWidth = slideShow.current.children[0].offsetWidth;

      slideShow.current.style.transform = `translateX(-${slideWidth}px)`;

      const transition = () => {
        slideShow.current.style.transition = "none";
        slideShow.current.style.transform = "translateX(0)";

        slideShow.current.appendChild(firstSlide);

        slideShow.current.removeEventListener("transitionend", transition);

      }
 
      slideShow.current.addEventListener("transitionend", transition);

    };
  };

  const prev = () => {
    if (slideShow.current.children.length > 0) {
     
      const index = slideShow.current.children.length - 1
      const lastSlide = slideShow.current.children[index];

      slideShow.current.insertBefore(lastSlide, slideShow.current.firstChild);

      slideShow.current.style.transition = 'none';

      const slideWidth = slideShow.current.children[0].offsetWidth;

      slideShow.current.style.transform = `translateX(-${slideWidth}px)`;


      setTimeout(() => {
      slideShow.current.style.transition = "1000ms ease-out all";
      slideShow.current.style.transform = `translateX(0)`;
      }, 50)

   }
  };

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      next();
    }, 5000);

    slideShow.current.addEventListener('mouseenter', () => {
      clearInterval(slideInterval.current)
    });

    slideShow.current.addEventListener("mouseleave", () => {
      slideInterval.current = setInterval(() => {
        next();
      }, 5000);
    });


  }, []);



  return (
    <div className="landingContainer">
      <div className="sliderContainer" ref={slideShow}>
        <div className="slider">
          <Link to="/shop">
            <img src={img1} alt="" />
          </Link>
          <div className="sliderText">
            <p>Producto</p>
          </div>
        </div>
        <div className="slider">
          <Link to="/shop">
            <img src={img2} alt="" />
          </Link>
          <div className="sliderText">
            <p>Producto</p>
          </div>
        </div>
        <div className="slider">
          <Link to="/shop">
            <img src={img3} alt="" />
          </Link>
          <div className="sliderText">
            <p>Producto</p>
          </div>
        </div>
        <div className="slider">
          <Link to="/shop">
            <img src={img4} alt="" />
          </Link>
          <div className="sliderText">
            <p>Producto</p>
          </div>
        </div>
      </div>
      <div className="buttonsContainer">
        <button className="slideButton leftButton" onClick={() => prev()}>
          <div>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="svgLeft"
            >
              <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" />
            </svg>
          </div>
        </button>
        <button className="slideButton rightButton" onClick={() => next()}>
          <div>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="svgRight"
            >
              <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};


export default Landing
