import React from "react";
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
import Personnels from "../../../data/personnels";
import { RxDividerHorizontal } from "react-icons/rx";
const Data = Personnels;

export default function Personnel() {
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
            {Data.map((item) => (
              <PersonnelsSwiperSlide
                key={item.id}
                className="PersonnelSwiperSlide"
              >
                <div className="personnel__single">
                  <img src={item.imgSrc} alt={item.perName} />

                  <div className="personnel__single-info">
                    <h3>{item.perName}</h3>
                    <p>{item.description}</p>
                    <BsArrowRightShort className="info-icon" />
                  </div>

                  <div className="personnel__single-footer">
                    <div className="footer-div">
                      <FaStar className="footer-div-iconStart" />
                      <RxDividerHorizontal className="footer-div-iconLine " />
                    </div>
                    <div className="footer-text flex">
                      <h6>{item.perName}</h6>
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
