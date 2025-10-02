import React, { useState } from "react";
import backgroundImage from "../assets/img9.PNG";
import "../pages/About.css";

const About = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className="about-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="about-content">
        <h1>About EmpowerHer</h1>
        <p>
        EmpowerHer is a platform dedicated to uplifting women entrepreneurs.
        It provides them with a space to showcase and sell their products and services, helping them achieve financial independence.</p>
        {showMore && (
          <p>
            Our mission is to empower women by providing financial independence
            through their businesses. We support sellers with tools to reach
            wider audiences and grow their ventures.
          </p>
        )}
        <button className="learn-more" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Learn More"}
        </button>
      </div>
    </div>
  );
};

export default About;
