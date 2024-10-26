/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import {
  Swiper as PersonnelsSwiper,
  SwiperSlide as PersonnelsSwiperSlide,
} from "swiper/react";
import "./Personnel.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { RxDividerHorizontal } from "react-icons/rx";
import api from "../../../config/axios";

export default function Personnel() {
  const [stylists, setStylists] = useState([]);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const formattedDate = `${year}-${month}`;

  const fetchStylistsData = async () => {
    try {
      const response = await api.get(
        `stylist/stylists/feedback-revenue?yearAndMonth=${formattedDate}`
      );
      const data = response.data.result;
      if (data) {
        setStylists(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStylistsData();
  }, []);

  return (
    <section className="personnel section container">
      <div className="personnel__container">
        <div className="personnel__header flex">
          <div className="personnel__header-text">
            <h2>Famous Stylist</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim,
              est at. Quam provident temporibus nesciunt illo numquam eum. In
              nostrum aliquam earum ea ipsa esse doloribus atque rerum libero
              odio.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Enim, est at. Quam provident temporibus nesciunt illo numquam eum.
              In nostrum aliquam earum ea ipsa esse doloribus atque rerum libero
              odio.
            </p>
          </div>

          <div className="personnel__header-icon flex">
            <BsArrowLeftShort className="personnel-icon personnel-leftIcon preBtn" />
            <BsArrowRightShort className="personnel-icon nxtBtn" />
          </div>
        </div>

        <PersonnelsSwiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: ".preBtn",
            nextEl: ".nxtBtn",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation]}
          className="PersonnelSwiper"
        >
          <div className="grid personnel__main">
            {(stylists || []).map((item) => (
              <PersonnelsSwiperSlide
                key={item.stylistId}
                className="PersonnelSwiperSlide"
              >
                <div className="personnel__single">
                  <img src={item.image} alt={item.stylistName} />

                  <div className="personnel__single-info">
                    <h3>{item.stylistName}</h3>
                    <h3>{item.averageFeedback}</h3>
                    <p>{item.totalRevenue}</p>
                    <div className="model__rating">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <React.Fragment key={star}>
                          <input
                            id={`rating-${star}`}
                            type="radio"
                            name="rating"
                            value={star}
                            // checked={item.totalRevenue/2 === star}
                            disabled
                          />

                          <label
                            htmlFor={`rating-${star}`}
                            title={`${star} star${star > 1 ? "s" : ""}`}
                          >
                            <svg
                              viewBox="0 0 576 512"
                              height="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                            </svg>
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                    <BsArrowRightShort className="info-icon" />
                  </div>

                  <div className="personnel__single-footer">
                    <div className="footer-div">
                      <FaStar className="footer-div-iconStart" />
                      <RxDividerHorizontal className="footer-div-iconLine " />
                    </div>
                    <div className="footer-text flex">
                      <h6>{item.stylistName}</h6>
                      <img src="logo_blue_noBackground.png" alt="logo" />
                    </div>
                  </div>
                </div>
              </PersonnelsSwiperSlide>
            ))}
          </div>
        </PersonnelsSwiper>
      </div>
    </section>
  );
}
