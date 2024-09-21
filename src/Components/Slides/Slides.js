/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./Slides.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slides from "../../data/slides.js";
import { Autoplay, Pagination } from "swiper/modules";

const image = slides;
export default function Slides() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {image.map((item) => (
          <SwiperSlide key={item.id}>
            <section className="slides">
              <img src={item.srcImg} />
              <div className="slides__content">
                <h1>
                  {item.title}
                  <br></br>
                  <span>{item.subTitle}</span>
                </h1>
                <p>{item.description}</p>
                <a className="slides__btn" href="#">
                  Read More
                </a>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="homeCard grid center">
        <div className="homeCard-booking">
          <input
            type="text"
            placeholder="Enter a phone number to make an appointment"
          ></input>
        </div>
        <button className="slides__btn btn">Booking Now</button>
      </div>
    </>
  );
}
