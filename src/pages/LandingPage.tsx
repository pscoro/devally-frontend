import React from 'react';
import SlickCarousel from '../components/SlickCarousel';

import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="carousel">
            <section className="slider-section">
                <SlickCarousel />
            </section>
        </div>
    );
};

export default LandingPage;