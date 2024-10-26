import React, { useState, useEffect } from "react";
import "./Slides.scss";
import slides from "../../../data/slides.js";
import { Link, useNavigate } from "react-router-dom";
import { Carousel, message, Spin } from "antd";
import api from "../../../config/axios.js";

const image = slides;

export default function Slides() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    try {
      const response = await api.get("customer/profile");
      const data = response.data.result;
      if (data) {
        setPhoneNumber(data.phone);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = () => {
    if (phoneNumber && phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
      setIsLoading(true);
      navigate("/booking/step1");
    } else {
      message.error("Please enter a valid 10-digit phone number.");
    }
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    setPhoneNumber(value.slice(0, 10));
  };

  return (
    <>
      <Carousel autoplay={true} speed={1000} effect="fade">
        {image.map((item) => (
          <div key={item.id}>
            <section className="slides">
              <img src={item.srcImg} alt={item.title} />
              <div className="slides__content">
                <h1>
                  {item.title}
                  <br />
                  <span>{item.subTitle}</span>
                </h1>
                <p>{item.description}</p>
                <Link to="" className="slides__btn">
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
            type="tel"
            onChange={handlePhoneNumberChange}
            placeholder="Enter a 10-digit phone number"
            maxLength={10}
          />
        </div>
        <button 
          className="slides__btn btn" 
          onClick={handleBooking}
          disabled={isLoading}
        >
          {isLoading ? <Spin size="small" /> : "Booking Now"}
        </button>
      </div>
    </>
  );
}