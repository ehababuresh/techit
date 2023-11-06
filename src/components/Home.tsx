import React, { FunctionComponent } from "react";
import Navbar from "./Navbar";
import "./Home.css"; // ייבא את קובץ ה-CSS

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
          <img
            className="home-image"
            src="תמונה-1.jpg"
            alt="תמונה 1"
          />
          <img
            className="home-image"
            src="1675201095816.jpeg"
            alt="תמונה 2"
          />
          <img
            className="home-image"
            src="plainUser.png"
            alt="תמונה 3"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
