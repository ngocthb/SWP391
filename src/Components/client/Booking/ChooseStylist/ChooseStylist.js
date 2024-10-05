import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiHome } from "react-icons/ci";
import { PiScissors } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";

import "./ChooseStylist.scss";
import {stylists} from "../../../../data/booking";

export default function ChooseStylist() {
  const [selectedStylist, setSelectedStylist] = useState(null);
  const handleSelected = (stylist) => {
    setSelectedStylist(stylist);
  };

  // const [stylists, setStylishs] = useState(null);

   // useEffect(() => {
  //   const fetchStylishs = async () => {
  //      try {
  //       const response = await axios.get("stylishs");
  //       if (response.data && response.data.data) {
  //         setStylishs(response.data.data);
  //       }
  //      } catch (error) {
        
  //      }
  //   };
  //   fetchStylishs();
  // }, []);

  useEffect(() => {
    const storedStylishId = localStorage.getItem("selectedStylishId");
    const stylishId = parseInt(storedStylishId, 10);
    if (stylishId) {
      const stylish = stylists.find((s) => s.id === stylishId);
      if (stylish) {
        setSelectedStylist(stylish);
      }
    }
  }, []);
  
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
