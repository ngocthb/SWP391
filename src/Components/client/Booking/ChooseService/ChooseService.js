/* eslint-disable react-hooks/exhaustive-deps */
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { LuClock } from "react-icons/lu";

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { PiScissors } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";

import "./ChooseService.scss";
// import { services } from "../../../../data/booking";
import api from "../../../../config/axios";

export default function ChooseService() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedService, setSelectedService] = useState([]);
  const [services, setServices] = useState([]);
  const [searchResults, setSearchResults] = useState(services);
  const [areServicesHidden, setAreServicesHidden] = useState(false);
  const inputRef = useRef(null);
  

  const navigate = useNavigate();

  useEffect(() => {
    const selectedBranchId = sessionStorage.getItem("selectedBranchId");
    if (!selectedBranchId) {
      navigate("/booking/step1");
    }
  }, []);

  useEffect(() => {
    const storedServices = sessionStorage.getItem("selectedServicesId");
    if (storedServices) {
      const serviceIds = JSON.parse(storedServices);
      const selected = services.filter(service => serviceIds.includes(service.id));
      setSelectedService(selected);
    }
  }, [services]);

  useEffect(() => {
    const fetchService = async () => {
       try {
        const response = await api.get("service");
        if (response.data && response.data.result) {
          setServices(response.data.result);
          setSearchResults(response.data);
        }
       } catch (error) {
        
       }
    };
    fetchService();
  }, []);


  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults(services);
      return;
    }

    const fetchServices = async () => {
      const value = {
        name: searchValue,
      }
      try {
        const response = await api.post(`service/searchByName`, value);
        if (response.data && response.data.result) {
          setSearchResults(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [searchValue]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleHidden = () => {
    setAreServicesHidden((prev) => !prev);
  };

  const handleRemoveService = (serviceToRemove) => {
    setSelectedService((prev) =>
      prev.filter((service) => service.id !== serviceToRemove.id)
    );
  };

  const handleClick = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  const isServiceSelected = (serviceId) => {
    return selectedService.some((service) => service.id === serviceId);
  };

  const isSelectedServices = !!sessionStorage.getItem("selectedServicesId");
  const isSelectedStylist = !!sessionStorage.getItem("selectedStylistId");

  return (
    <div className="chooseService">
      <div className="chooseService__tagNavigation">
        <ul className="chooseService__tagNavigation--item">
          <li className="chooseService__tagNavigation--item-content">
            <Link to="/booking/step1" aria-label="Select Salon">
              <div className="filled"></div>
              <CiHome />
            </Link>
            <div className="tooltip">Salon</div>
          </li>
          <li className="chooseService__tagNavigation--item-content active">
            <Link to="/booking/step2" aria-label="Select Service">
              <div className="filled"></div>
              <PiScissors />
            </Link>
            <div className="tooltip">Service</div>
          </li>
          <li className={`chooseService__tagNavigation--item-content ${isSelectedServices ? '' : 'disable'}`}>
            <Link to={isSelectedServices ? "/booking/step3" : "/booking/step2"} aria-label="Select Stylist">
              <div className="filled"></div>
              <SlPeople />
            </Link>
            <div className="tooltip">Stylist</div>
          </li>
          <li className={`chooseService__tagNavigation--item-content ${isSelectedStylist ? '' : 'disable'}`}>
            <Link to={isSelectedStylist ? "/booking/step4" : "/booking/step2"} aria-label="Select Time">
              <div className="filled"></div>
              <RiCalendarScheduleLine />
            </Link>
            <div className="tooltip">Time</div>
          </li>
          
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
          {searchResults && searchResults.map((service) => (
            <div key={service.id} className="chooseService__card">
              <img alt="service banner" src={service.image} />
              <div className="card__content">
                <h2>{service.serviceName}</h2>
                <div className="card__content-time">
                  <LuClock className="card-icon" />
                  <span>{service.duration}</span>
                </div>
                <p>{service.serviceName}</p>
                <div className="card__content-action">
                  <div className="card__content-price">
                    Price: ${service.price}
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
              <span className="footer__service-name">{service.serviceName}</span>
              <div>
                <span className="footer__service-price">
                  ${service.price}
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
                Total Pay :
                {(selectedService || []).reduce(
                  (total, service) => total + service.price,
                  0
                )} VND
              </span>
              <div className="footer__pay-price">
                Total Duration : 
                {(selectedService || []).reduce(
                  (total, service) => total + service.duration,
                  0
                )}
              </div>
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
              sessionStorage.setItem("selectedServicesId", JSON.stringify(selectedServiceIds));
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
