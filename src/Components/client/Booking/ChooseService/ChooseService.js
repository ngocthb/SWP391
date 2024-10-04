import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { FaAngleDoubleDown } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { FaAngleDoubleUp } from "react-icons/fa";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CiHome } from "react-icons/ci";
import { PiScissors } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";

import "./ChooseService.scss";

const services = [
  {
    id: 1,
    avatar:
      "https://i.pinimg.com/564x/71/00/cd/7100cdf88f9f52393c2c42f1305002f0.jpg",
    bio: "ShineCombo cắt gội 10 bước aytoyoloy0uwefqdqwdqdd",
    time: "45 phút",
    description: "Combo Cắt kỹ và Combo Gội Massage",
    followers_count: 120,
  },
  {
    id: 2,
    avatar:
      "https://i.pinimg.com/564x/1f/6a/3e/1f6a3e27dbebd53d87d321572622e5d1.jpg",
    bio: "Dịch vụ nhuộm tóc",
    time: "60 phút",
    description: "Dịch vụ nhuộm tóc thời trang",
    followers_count: 500,
  },
  {
    id: 3,
    avatar:
      "https://i.pinimg.com/564x/21/bf/df/21bfdfeefbfbdf5ba151d468d2683bc5.jpg",
    bio: "Cắt tóc nam",
    time: "30 phút",
    description: "Cắt tóc tạo kiểu cho nam giới",
    followers_count: 80,
  },
];

export default function ChooseService() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedService, setSelectedService] = useState([]);
  const [searchRst, setSearchRst] = useState(services);
  const [areServicesHidden, setAreServicesVisible] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const storedServices = localStorage.getItem("selectedServicesId");
    if (storedServices) {
      const serviceIds = JSON.parse(storedServices);
      const selected = services.filter(service => serviceIds.includes(service.id));
      setSelectedService(selected);
    }
  }, []);

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchRst(services);
      return;
    }

    axios
      .get(`https://tiktok.fullstack.edu.vn/api/users/search`, {
        params: {
          q: searchValue,
          type: "less",
        },
      })
      .then((res) => {
        setSearchRst(res.data.data);
      });
  }, [searchValue]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClick = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleRemoveService = (serviceToRemove) => {
    setSelectedService((prevServices) =>
      prevServices.filter((service) => service.id !== serviceToRemove.id)
    );
  };

  const isServiceSelected = (serviceId) => {
    return selectedService.some((service) => service.id === serviceId);
  };

  const handleHidden = () => {
    setAreServicesVisible((prev) => !prev);
  };

  const isSelectedServices = !!localStorage.getItem("selectedServicesId");
  const isSelectedTime = !!localStorage.getItem("selectedTimeId");

  return (
    <div className="chooseService">
      <div className="chooseService__tagNavigation">
        <ul class="chooseService__tagNavigation--item">
          <li class="chooseService__tagNavigation--item-content">
            <Link to="/booking/step1">
              <div class="filled"></div>
              <CiHome />
            </Link>
            <div class="tooltip">Salon</div>
          </li>
          <li class="chooseService__tagNavigation--item-content active">
            <Link to="/booking/step2">
              <div class="filled"></div>

              <PiScissors />
            </Link>
            <div class="tooltip">Service</div>
          </li>
          {isSelectedServices ? (<li class="chooseService__tagNavigation--item-content">
            <Link to="/booking/step3">
              <div class="filled"></div>

              <RiCalendarScheduleLine />
            </Link>
            <div class="tooltip">Time</div>
          </li>):
          (<li class="chooseService__tagNavigation--item-content disable">
            <Link to="/booking/step2">
              <div class="filled"></div>

              <RiCalendarScheduleLine />
            </Link>
            <div class="tooltip">Time</div>
          </li>)}
         {isSelectedTime ? ( <li class="chooseService__tagNavigation--item-content">
            <Link to="/booking/step4">
              <div class="filled"></div>

              <SlPeople />
            </Link>
            <div class="tooltip">Stylist</div>
          </li>):
          ( <li class="chooseService__tagNavigation--item-content disable">
            <Link to="/booking/step2">
              <div class="filled"></div>

              <SlPeople />
            </Link>
            <div class="tooltip">Stylist</div>
          </li>)}
        </ul>
      </div>

      <div className="chooseService__container">
        <div className="chooseService__container-header">
          <Link to="/booking/step1">
            <FaArrowLeft className="chooseService-icon" />
          </Link>
          <h1>Choose service</h1>
        </div>
        <div className="chooseService__container-search">
          <IoSearchOutline className="chooseService-icon" />
          <input
            ref={inputRef}
            placeholder="Search for services..."
            value={searchValue}
            onChange={handleChange}
          />
          <IoCloseCircle
            className="chooseService-closeIcon"
            onClick={handleClick}
          />
        </div>
        <div className="chooseService__container-locations">
          F-Salon has the following services :
        </div>
        <div className="chooseService__container-lists">
          {searchRst.map((service) => (
            <div key={service.id} className="chooseService__card">
              <img alt="service banner" src={service.avatar} />
              <div className="card__content">
                <h2>{service.bio}</h2>
                <div className="card__content-time">
                  <LuClock className="card-icon" />
                  <span>{service.time}</span>
                </div>
                <p>{service.bio}</p>
                <div className="card__content-action">
                  <div className="card__content-price">
                    Price: ${service.followers_count}
                  </div>
                  <button
                    className={`card__content-add ${
                      isServiceSelected(service.id) ? "disabled" : ""
                    }`}
                    onClick={() => {
                      if (!isServiceSelected(service.id)) {
                        setSelectedService((prev) => [...prev, service]);
                      }
                    }}
                    disabled={isServiceSelected(service.id)} // Disable button if service is already selected
                  >
                    {isServiceSelected(service.id) ? "Added" : "Add service"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="chooseService__container-footer">
          <div className="footer__hidden" onClick={handleHidden}>
            {areServicesHidden ? (
              <>
                <FaAngleDoubleUp />
                <span>Show selected services</span>
                <FaAngleDoubleUp />
              </>
            ) : (
              <>
                <FaAngleDoubleDown />
                <span>Hide selected services</span>
                <FaAngleDoubleDown />
              </>
            )}
          </div>

          {selectedService.map((service, index) => (
            <div
              key={index}
              className={`footer__service ${areServicesHidden ? "hidden" : ""}`}
            >
              <span className="footer__service-name">{service.bio}</span>
              <div>
                <span className="footer__service-price">
                  ${service.followers_count}
                </span>
                <IoIosCloseCircle
                  className="footer__service-icon"
                  onClick={() => handleRemoveService(service)}
                />
              </div>
            </div>
          ))}

          {/* <div className="checkbox-item">
            <input type="checkbox" id="unknown-service" />
            <div>
              <label htmlFor="unknown-service" className="checkbox-label">
                Anh không biết chọn dịch vụ gì!
              </label>
              <div className="checkbox-description">
                Nhân viên sẽ giúp anh chọn dịch vụ tại cửa hàng
              </div>
            </div>
          </div> */}

          <div className="footer__promo">
            {/* <span className="footer__promo-label"></span> */}
            <span className="footer__promo-action">Chọn ưu đãi</span>
          </div>

          <div className="footer__pay">
            <span className="footer__pay-services">
              Selected services : {selectedService.length}
            </span>
            <div>
              <span className="footer__pay-price">
                Total Pay : $
                {(selectedService || []).reduce(
                  (total, service) => total + service.followers_count,
                  0
                )}
              </span>
            </div>
          </div>
        </div>
        <Link
          to="/booking/step3"
          className={`chooseService__container-btn btn flex ${
            selectedService.length === 0 ? "btn-disable" : ""
          }`}
          onClick={(e) => {
            if (selectedService.length === 0) {
              e.preventDefault();
            }else {
              const selectedServiceIds = selectedService.map(service => service.id);
              localStorage.setItem("selectedServicesId", JSON.stringify(selectedServiceIds));
            }
          }}
        >
          Next Step
          <FaArrowRight className="chooseService-icon" />
        </Link>
      </div>
    </div>
  );
}
