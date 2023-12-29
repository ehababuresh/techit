import React, { FunctionComponent } from "react";
import Navbar from "./Navbar";
import "./Home.css"; // Make sure this CSS file is updated

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1 className="home-title">ברוכים הבאים לאתר הקניות שלנו</h1>
        <p className="home-description">
          המקום הטוב ביותר למצוא את המוצרים הכי טובים במחירים הכי טובים.
        </p>
        <div className="image-container">
          <div className="image-item">
            <img
              className="home-image"
              src="sg-11134201-7r9ad-llopxm748ytn05.jpeg"
              alt="תמונה 1"
            />
            <p className="image-text">חנות הנעליים הכי איכותיים בארץ</p>
          </div>
          <div className="image-item">
            <img
              className="home-image"
              src="yeezy-foam-rnnr-mist.webp"
              alt="תמונה 2"
            />
            <p className="image-text">חנות הנעליים הכי איכותיים בארץ</p>
          </div>
          <div className="image-item">
            <img
              className="home-image"
              src="images (1).jpeg"
              alt="תמונה 3"
            />
            <p className="image-text">חנות הנעליים הכי איכותיים בארץ</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
