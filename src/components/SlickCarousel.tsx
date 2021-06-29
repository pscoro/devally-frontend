import React from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlickCarousel.css"

const SlickCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true
      };

    return (
        <div>
            <Slider {...settings} className="slider">
                <div className="slider-container">
                    <img className="slider-image" src="merge.svg" alt=""/>
                    <div className="slider-text">
                        <h1>BRINGING AMATEUR DEVELOPERS TOGETHER EVERYWHERE</h1>
                        <h3>Create an account to begin collaborating today.</h3>
                    </div>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
      </div>
    );
};

export default SlickCarousel;