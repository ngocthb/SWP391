/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { StarFilled } from "@ant-design/icons";
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
                    <div className="feedback__rating">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s}>
                          <StarFilled
                            className={
                              item.score / 2 < s
                                ? "feedback-not-rating"
                                : "feedback-rating"
                            }
                          />
                        </div>
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
