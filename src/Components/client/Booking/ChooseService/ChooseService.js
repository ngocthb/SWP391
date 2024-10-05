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
import { services } from "../../../../data/booking";
import api from "../../../../config/axios";

export default function ChooseService() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchResults, setSearchResults] = useState(services);
  const [areServicesHidden, setAreServicesHidden] = useState(false);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const selectedBranchId = localStorage.getItem("selectedBranchId");
    if (!selectedBranchId) {
      navigate("/booking/step1");
    }
  }, []);

  useEffect(() => {
    const storedServices = localStorage.getItem("selectedServicesId");
    if (storedServices) {
      const serviceIds = JSON.parse(storedServices);
      const selected = services.filter(service => serviceIds.includes(service.id));
      setSelectedServices(selected);
    }
  }, []);

  useEffect(() => {
    const fetchService = async () => {
       try {
        const response = await api.get("service");
        if (response.data && response.data.result) {
          setSearchResults(response.data.result);
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
      try {
        const response = await api.get(`service/searchByName`, {
          params: { name: searchValue },
        });
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

  const handleClearSearch = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleRemoveService = (serviceToRemove) => {
    setSelectedServices((prev) =>
      prev.filter((service) => service.id !== serviceToRemove.id)
    );
  };

  const isServiceSelected = (serviceId) => {
    return selectedServices.some((service) => service.id === serviceId);
  };

  const toggleServicesHidden = () => {
    setAreServicesHidden((prev) => !prev);
  };

  const isSelectedServices = !!localStorage.getItem("selectedServicesId");
  const isSelectedStylish = !!localStorage.getItem("selectedStylishId");

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
          <li className={`chooseService__tagNavigation--item-content ${isSelectedStylish ? '' : 'disable'}`}>
            <Link to={isSelectedStylish ? "/booking/step4" : "/booking/step2"} aria-label="Select Time">
              <div className="filled"></div>
              <RiCalendarScheduleLine />
            </Link>
            <div className="tooltip">Time</div>
          </li>
          
        </ul>
      </div>

      <div className="chooseService__container">
        <div className="chooseService__container-header">
          <Link to="/booking/step1" aria-label="Back to Salon Selection">
            <FaArrowLeft className="chooseService-icon" />
          </Link>
          <h1>Choose Service</h1>
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
            onClick={handleClearSearch}
            aria-label="Clear search"
          />
        </div>
        <div className="chooseService__container-locations">
          F-Salon has the following services:
        </div>
        <div className="chooseService__container-lists">
          {searchResults.map((service) => (
            <div key={service.id} className="chooseService__card">
              <img alt="service banner" src={service.image} />
              <div className="card__content">
                <h2>{service.serviceName}</h2>
                <div className="card__content-time">
                  <LuClock className="card-icon" />
                  <span>{service.duration}</span>
                </div>
                <p>{service.description}</p>
                <div className="card__content-action">
                  <div className="card__content-price">
                    Price: ${service.price}
                  </div>
                  <button
                    className={`card__content-add ${isServiceSelected(service.id) ? "disabled" : ""}`}
                    onClick={() => {
                      if (!isServiceSelected(service.id)) {
                        setSelectedServices((prev) => [...prev, service]);
                      }
                    }}
                    disabled={isServiceSelected(service.id)}
                  >
                    {isServiceSelected(service.id) ? "Added" : "Add service"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="chooseService__container-footer">
          <div className="footer__hidden" onClick={toggleServicesHidden}>
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

          {selectedServices.map((service) => (
            <div key={service.id} className={`footer__service ${areServicesHidden ? "hidden" : ""}`}>
              <span className="footer__service-name">{service.serviceName}</span>
              <div>
                <span className="footer__service-price">${service.price}</span>
                <IoIosCloseCircle
                  className="footer__service-icon"
                  onClick={() => handleRemoveService(service)}
                  aria-label={`Remove ${service.serviceName}`}
                />
              </div>
            </div>
          ))}

          <div className="footer__promo">
            <span className="footer__promo-action">Select Offer</span>
          </div>

          <div className="footer__pay">
            <span className="footer__pay-services">
              Selected services: {selectedServices.length}
            </span>
            <div>
              <span className="footer__pay-price">
                Total Pay: $
                {selectedServices.reduce(
                  (total, service) => total + service.price,
                  0
                )}
              </span>
            </div>
          </div>
        </div>
        <Link
          to="/booking/step3"
          className={`chooseService__container-btn btn flex ${selectedServices.length === 0 ? "btn-disable" : ""}`}
          onClick={(e) => {
            if (selectedServices.length === 0) {
              e.preventDefault();
            } else {
              const selectedServiceIds = selectedServices.map(service => service.id);
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
