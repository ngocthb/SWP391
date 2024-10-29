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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCustomerData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("customer/profile");
        const data = response.data.result;
        if (data) {
          setPhoneNumber(data.phone);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const handleBooking = async () => {
    if (isLoggedIn) {
      if (phoneNumber && phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
        navigate("/booking/step1");
      } else if (!phoneNumber) {
        await updatePhoneNumber(phoneNumber);
      } else {
        message.error("Please enter a valid 10-digit phone number.");
      }
    } else {
      message.error("Please login before booking.");
    }
  };

  const updatePhoneNumber = async (number) => {
    setIsLoading(true);
    try {
      const updateValues = { phone: number };
      const response = await api.put(`customer/update-phone`, updateValues);
      const data = response.data.result;

      if (data) {
        setPhoneNumber(data.phone);
        message.success("Phone number updated successfully!");
        navigate("/booking/step1");
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to update phone number. Please try again.");
    } finally {
      setIsLoading(false);
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