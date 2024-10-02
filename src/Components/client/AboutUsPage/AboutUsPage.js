import { FaQuoteLeft } from "react-icons/fa";

import React from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import {
  Swiper as AboutUsPageSwiper,
  SwiperSlide as AboutUsPageSwiperSlide,
} from "swiper/react";
import "./AboutUsPage.scss";
import video from "../../../Assets/video2.mp4";
import feedback from "../../../data/feedback";
export default function AboutUsPage() {
  return (
    <>
      <div className="AboutUsPage">
        <section className="AboutUsPage__header">
          <h1>About Us</h1>
        </section>

        <section className="AboutUsPage__content">
          {/* <div class="AboutUsPage__container"> */}
          <div className="AboutUsPage__content-text">
            <h2>TitleTitle</h2>
            <p>
              Et labore horum non nobis ipsum eum molestias mollitia et corporis
              praesentium ut laudantium internos. Non quis esse quo eligendi
              corrupti et fugiat nulla qui soluta recusandae in maxime quasi aut
              ducimus illum aut optio quibusdam!Et labore horum non nobis ipsum
              eum molestias mollitia et corporis praesentium ut laudantium
              internos.
            </p>

            {/* </div> */}
          </div>
          <div className="AboutUsPage__content-circle">
            <div className="loader">
              <img
                src="https://i.pinimg.com/564x/6c/c3/da/6cc3da6a664e9258f677c700547be76b.jpg"
                alt="banner"
                className="loader-image"
              />
              <div className="iconLoaderProgress">
                <svg
                  className="iconLoaderProgressFirst"
                  width="300"
                  height="300"
                >
                  <circle cx="150" cy="150" r="125"></circle>
                </svg>

                <svg
                  className="iconLoaderProgressSecond"
                  width="300"
                  height="300"
                >
                  <circle cx="150" cy="150" r="125"></circle>
                </svg>
              </div>
            </div>
          </div>
        </section>
        <div className="AboutUsPage__video">
          <div className="AboutUsPage__videoCard grid">
            <div className="AboutUsPage__cardText">
              <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eligendi totam tenetur, deleniti dolorum facilis porro, cum
                voluptas consequuntur optio iure quia ut tempora.
              </p>
            </div>
            <div className="AboutUsPage__cardVideo">
              <video src={video} autoPlay loop muted type="video/mp4"></video>
            </div>
          </div>
        </div>
        <div className="AboutUsPage__container">
          <div className="AboutUsPage__container-title">
            See What Our Customer <div>Say About Us</div>
          </div>
        </div>
      </div>

      <AboutUsPageSwiper
        slidesPerView={1}
        spaceBetween={30}
        // loop={true}
        pagination={false}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="AboutUsPageSwiper"
      >
        <div className="AboutUsPage__container-testimonial">
          <div className=" AboutUsPage__main">
            {feedback.map((feed) => (
              <AboutUsPageSwiperSlide
                key={feed.id}
                className="AboutUsPageSwiperSlide"
              >
                <FaQuoteLeft className="quote-icon" />
                <img alt="Avatar" height="80" src={feed.avatar} width="80" />
                <p>{feed.feedback}</p>
                <div className="testimonial-name">{feed.name}</div>
              </AboutUsPageSwiperSlide>
            ))}
          </div>
        </div>
      </AboutUsPageSwiper>
      {/* nhung dia chi */}
      <iframe
        className="AboutUsPage__map"
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d111712.0863672117!2d106.72314450848583!3d10.848130864058845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zbmjDoCB0aHXhu5FjIGxvbmcgY2jDonU!5e0!3m2!1svi!2s!4v1727451316132!5m2!1svi!2s"
      ></iframe>
    </>
  );
}