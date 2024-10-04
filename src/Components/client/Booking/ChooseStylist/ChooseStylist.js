import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { Link } from "react-router-dom";
import { useState } from "react";
import { CiHome } from "react-icons/ci";
import { PiScissors } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";

import "./ChooseStylist.scss";

const stylists = [
  {
    id: 1,
    name: "Luận Triệu",
    rating: { cut: 4.8, perm: 4.9, dye: 4.8 },
    customers: { cut: 7800, perm: 197, dye: 313 },
    imgSrc:
      "https://i.pinimg.com/564x/eb/b9/e3/ebb9e37fdb471de44a56c087768ff6d0.jpg",
  },
  {
    id: 2,
    name: "Bắc Lý",
    rating: { cut: 4.7, perm: 4.8, dye: 4.7 },
    customers: { cut: 6500, perm: 190, dye: 280 },
    imgSrc:
      "https://i.pinimg.com/564x/8a/3a/9e/8a3a9ee75482b6c27b0f03bae4439522.jpg",
  },
  {
    id: 3,
    name: "Trung Hồ",
    rating: { cut: 4.9, perm: 5.0, dye: 4.9 },
    customers: { cut: 8200, perm: 230, dye: 400 },
    imgSrc:
      "https://i.pinimg.com/564x/26/cf/ba/26cfba0581fe35dea4ea1a1cef1275b2.jpg",
  },
  {
    id: 4,
    name: "Sơn Nguyễn",
    rating: { cut: 4.6, perm: 4.7, dye: 4.8 },
    customers: { cut: 5000, perm: 180, dye: 350 },
    imgSrc:
      "https://i.pinimg.com/564x/66/5f/c0/665fc084f50fb7b2959d80c30f68e2d7.jpg",
  },
];

export default function ChooseStylist() {
  const [selectedStylist, setSelectedStylist] = useState(null);
  const handleSelected = (stylist) => {
    setSelectedStylist(stylist);
  };

  
  
  return (
    <>
      <div className="chooseStylist">

      <div className="chooseStylist__tagNavigation">
          <ul className="chooseStylist__tagNavigation--item">
            <li className="chooseStylist__tagNavigation--item-content">
              <Link to="/booking/step1">
                <div className="filled"></div>
                <CiHome />
              </Link>
              <div className="tooltip">Salon</div>
            </li>
            <li className="chooseStylist__tagNavigation--item-content">
              <Link to="/booking/step2">
                <div className="filled"></div>

                <PiScissors />
              </Link>
              <div className="tooltip">Service</div>
            </li>
            <li className="chooseStylist__tagNavigation--item-content">
              <Link to="/booking/step3">
                <div className="filled"></div>

                <RiCalendarScheduleLine />
              </Link>
              <div className="tooltip">Time</div>
            </li>
            <li className="chooseStylist__tagNavigation--item-content active">
              <Link to="/booking/step4">
                <div className="filled"></div>

                <SlPeople />
              </Link>
              <div className="tooltip">Stylist</div>
            </li>
          </ul>
        </div>

        <div className="chooseStylist__container">
          <div className="chooseStylist__container-header">
            <Link to="/booking/step3">
              <FaArrowLeft className="chooseStylist-icon" />
            </Link>
            <h1>Choose Stylist</h1>
          </div>
          {selectedStylist ? (
            <>
              <div className="chooseStylist__container-name">
                <IoPersonOutline className="stylist-icon" />
                <h1>{selectedStylist.name}</h1>
              </div>
              <div className="chooseStylist__container-info">
                <p>Stylist: {selectedStylist.name}</p>
                <p className="infor__rating">
                  <span>
                    Cut {selectedStylist.rating.cut}
                    <FaStar className="infor__rating-icon" />(
                    {selectedStylist.customers.cut})
                  </span>
                </p>
                <p className="infor__rating">
                  <span>
                    Perm {selectedStylist.rating.perm}
                    <FaStar className="infor__rating-icon" />(
                    {selectedStylist.customers.perm})
                  </span>
                </p>
                <p className="infor__rating">
                  <span>
                    Dye {selectedStylist.rating.dye}
                    <FaStar className="infor__rating-icon" />(
                    {selectedStylist.customers.dye})
                  </span>
                </p>
              </div>
            </>
          ) : (
            <></>
          )}

          <Swiper
            className="chooseStylist__container-lists"
            slidesPerView={3}
            navigation={true}
            modules={[Navigation]}
          >
            {stylists.map((stylist) => (
              <SwiperSlide key={stylist.id}>
                <div
                  onClick={() => handleSelected(stylist)}
                  className={`chooseStylist__container-single ${
                    selectedStylist && selectedStylist.id === stylist.id
                      ? "selected"
                      : ""
                  }`}
                >
                  <img alt={stylist.name} src={stylist.imgSrc} />
                  <p>{stylist.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Link
            to="/booking"
            className={`chooseStylist__container-btn btn flex ${
              !!selectedStylist ? "" : "btn-disable"
            }`}
            onClick={(e) => {
              if (!selectedStylist) {
                e.preventDefault();
              }else {
                localStorage.setItem('selectedStylishId', selectedStylist.id);
              }
            }}
          >
            Booking Now
            <FaArrowRight className="chooseService-icon" />
          </Link>
        </div>
      </div>
    </>
  );
}
