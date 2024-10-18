/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./Slides.scss";
import slides from "../../../data/slides.js";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "antd";

const image = slides;
export default function Slides() {
  const navigate = useNavigate();
  const handleBooking = () => {
    navigate("/booking/step1");
  };
  return (
    <>
      <Carousel autoplay={true} speed={1000} effect="fade">
        {image.map((item) => (
          <div key={item.id}>
            <section className="slides">
              <img src={item.srcImg} />
              <div className="slides__content">
                <h1>
                  {item.title}
                  <br></br>
                  <span>{item.subTitle}</span>
                </h1>
                <p>{item.description}</p>
                <Link to={""} className="slides__btn">
                  Read More
                </Link>
              </div>
            </section>
          </div>
        ))}
      </Carousel>
      <div className="homeCard grid center">
        <div className="homeCard-booking">
          <input
            type="text"
            placeholder="Enter a phone number to make an appointment"
          ></input>
        </div>
        <button className="slides__btn btn" onClick={handleBooking}>
          Booking Now
        </button>
      </div>
    </>
  );
}
