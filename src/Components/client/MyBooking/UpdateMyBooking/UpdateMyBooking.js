import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { LuCalendarSearch } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import api from "../../../../config/axios";
import "./UpdateMyBooking.scss";

import { salonLocations } from "../../../../data/booking";
import { services } from "../../../../data/booking";
import { stylists } from "../../../../data/booking";
import { slots } from "../../../../data/booking";

export function ChooseSalon({ onNext }) {
  const [searchValue, setSearchValue] = useState("");
  // const [salonLocations, setSalonLocations] = useState([]);
  const [searchResults, setSearchResults] = useState(salonLocations);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const inputRef = useRef();

  // useEffect(() => {
  //   const fetchSalonLocations = async () => {
  //     try {
  //       const response = await api.get("salon");
  //       if (response.data && response.data.result) {
  //         setSalonLocations(response.data.result);
  //       }
  //     } catch (error) {}
  //   };
  //   fetchSalonLocations();
  // }, []);

  useEffect(() => {
    const storedBranchId = sessionStorage.getItem("selectedBranchId");
    if (storedBranchId) {
      const branchId = parseInt(storedBranchId, 10);
      const branch = salonLocations.find((b) => b.id === branchId);
      if (branch) {
        setSelectedBranch(branch);
      }
    }
  }, [salonLocations]);

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults(salonLocations);
      return;
    }

    const fetchSalons = async () => {
      try {
        const response = await axios.get(`users/search`, {
          params: {
            q: searchValue,
            type: "less",
          },
        });
        if (response.data && response.data.data) {
          setSearchResults(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching salons:", error);
      }
    };

    fetchSalons();
  }, [searchValue]);

  const handleClearSearch = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
  };

  const isSelectedBranch = !!sessionStorage.getItem("selectedBranchId");
  const isSelectedStylist = !!sessionStorage.getItem("selectedStylistId");
  const isSelectedServices = !!sessionStorage.getItem("selectedServicesId");
  return (
    <>
      <div className="myBooking__salon">
        <div className="myBooking__salon-header">
          <h1>Choose Salon</h1>
        </div>
        <div className="myBooking__salon-search">
          <IoSearchOutline className="myBooking__salon-icon" />
          <input
            placeholder="Search for salons by address..."
            ref={inputRef}
            value={searchValue}
            onChange={handleSearchChange}
          />
          <IoCloseCircle
            className="myBooking__salon-closeIcon"
            aria-label="Clear search"
            onClick={handleClearSearch}
          />
        </div>

        <div className="myBooking__salon-locations">
          F-salon is available in the following:
        </div>
        <div className="myBooking__salon-lists">
          {salonLocations.map((branch) => (
            <div
              onClick={() => handleBranchSelect(branch)}
              className={`myBooking__salon-single ${
                selectedBranch && selectedBranch.id === branch.id
                  ? "selected"
                  : ""
              }`}
              key={branch.id}
            >
              {branch.address}
            </div>
          ))}
        </div>
        <button className="myBooking__salon-btn flex btn" onClick={onNext}>
          Next Step
          <FaArrowRight className="myBooking__salon-icon" />
        </button>
      </div>
    </>
  );
}

export function ChooseService({ onNext }) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchResults, setSearchResults] = useState(services);
  const [areServicesHidden, setAreServicesHidden] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const storedServices = localStorage.getItem("selectedServicesId");
    if (storedServices) {
      const serviceIds = JSON.parse(storedServices);
      const selected = services.filter((service) =>
        serviceIds.includes(service.id)
      );
      setSelectedServices(selected);
    }
  }, []);

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults(services);
      return;
    }

    const fetchServices = async () => {
      try {
        const response = await axios.get(`users/search`, {
          params: { q: searchValue, type: "less" },
        });
        if (response.data && response.data.data) {
          setSearchResults(response.data.data);
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

  return (
    <div className="myBooking__service">
      <div className="myBooking__service-header">
        <h1>Choose Service</h1>
      </div>
      <div className="myBooking__service-search">
        <IoSearchOutline className="myBooking__service-icon" />
        <input
          ref={inputRef}
          placeholder="Search for services..."
          value={searchValue}
          onChange={handleChange}
        />
        <IoCloseCircle
          className="myBooking__service-closeIcon"
          onClick={handleClearSearch}
          aria-label="Clear search"
        />
      </div>
      <div className="myBooking__service-locations">
        F-Salon has the following services:
      </div>
      <div className="myBooking__service-lists">
        {searchResults.map((service) => (
          <div key={service.id} className="myBooking__service__card">
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
                  className={`card__content-add ${
                    isServiceSelected(service.id) ? "disabled" : ""
                  }`}
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
      <div className="myBooking__service-footer">
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
          <div
            key={service.id}
            className={`footer__service ${areServicesHidden ? "hidden" : ""}`}
          >
            <span className="footer__service-name">{service.serviceName}</span>
            <div>
              <span className="footer__service-price">{service.price} VND</span>
              <IoIosCloseCircle
                className="footer__service-icon"
                onClick={() => handleRemoveService(service)}
                aria-label={`Remove ${service.description}`}
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
              Total Pay:
              {selectedServices.reduce(
                (total, service) => total + service.price,
                0
              )}{" "}
              VND
            </span>
          </div>
        </div>
      </div>
      <button className="myBooking__service-btn btn flex" onClick={onNext}>
        Next Step
        <FaArrowRight className="myBooking__salon-icon" />
      </button>
    </div>
  );
}

export function ChooseStylist({ onNext }) {
  const [selectedStylist, setSelectedStylist] = useState(null);
  const handleSelected = (stylist) => {
    setSelectedStylist(stylist);
  };

  // const [stylists, setStylists] = useState();

  // useEffect(() => {
  //   const storedBranchId = sessionStorage.getItem("selectedBranchId");
  //   const branchId = parseInt(storedBranchId, 10);

  //   const storedServices = sessionStorage.getItem("selectedServicesId");
  //   const serviceIds = JSON.parse(storedServices);

  //   const fetchStylists = async () => {
  //     const bookingValue = {
  //       salonId: branchId,
  //       serviceId: serviceIds,
  //     };

  //     try {
  //       const response = await api.post(`booking/stylists`, bookingValue);
  //       if (response.data /*&& response.data.result*/) {
  //         setStylists(response.data /*.result*/);
  //       }
  //     } catch (error) {}
  //   };
  //   fetchStylists();
  // }, []);

  useEffect(() => {
    const storedStylistId = sessionStorage.getItem("selectedStylistId");
    const stylistId = parseInt(storedStylistId, 10);
    if (stylistId) {
      const stylist = stylists.find((s) => s.id === stylistId);
      if (stylist) {
        setSelectedStylist(stylist);
      }
    }
  }, [stylists]);

  const isSelectedStylist = !!sessionStorage.getItem("selectedStylistId");

  return (
    <>
      <div className="myBooking__stylist">
        <div className="myBooking__stylist-header">
          <h1>Choose Stylist</h1>
        </div>
        {selectedStylist && (
          <>
            <div className="myBooking__stylist-name">
              <IoPersonOutline className="stylist-icon" />
              <h1>{selectedStylist.fullname}</h1>
            </div>
            <div className="myBooking__stylist-info">
              <p>Stylist: {selectedStylist.fullname}</p>
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
        )}

        <Swiper
          className="myBooking__stylist-lists"
          slidesPerView={3}
          navigation={true}
          modules={[Navigation]}
        >
          {stylists.map((stylist) => (
            <SwiperSlide key={stylist.id}>
              <div
                onClick={() => {
                  handleSelected(stylist);
                }}
                className={`myBooking__stylist-single ${
                  selectedStylist && selectedStylist.id === stylist.id
                    ? "selected"
                    : ""
                }`}
              >
                <img alt={stylist.fullname} src={stylist.image} />
                <p>{stylist.fullname}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="myBooking__stylist-btn btn flex " onClick={onNext}>
          Next Step
          <FaArrowRight className="myBooking__stylist-icon" />
        </button>
      </div>
    </>
  );
}

export function ChooseDateTime() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);
  const [timeSlots, setTimeSlots] = useState(slots);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const storedTimeId = sessionStorage.getItem("selectedTimeId");
    const storedDate = sessionStorage.getItem("selectedDate");

    if (storedTimeId) {
      setSelectedTime(Number(storedTimeId));
    }
    if (storedDate) {
      setSelectedDate(new Date(storedDate));
    }
  }, [timeSlots]);

  const handleTimeSlotClick = (slotId) => {
    if (availableSlots.some((slot) => slot.slotid === slotId)) {
      setSelectedTime(slotId);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value === "today" ? today : tomorrow;
    formatDateForInput(date);
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${dayOfWeek} (${day}/${month})`;
  };

  const isSelectedTime = selectedTime !== null;

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const storedBranchId = sessionStorage.getItem("selectedBranchId");
    const branchId = parseInt(storedBranchId, 10);

    const storedServices = sessionStorage.getItem("selectedServicesId");
    const serviceIds = JSON.parse(storedServices);

    const storedStylist = sessionStorage.getItem("selectedStylistId");
    const stylistId = JSON.parse(storedStylist);

    const fetchTimeSlots = async () => {
      const bookingValue = {
        salonId: branchId,
        serviceId: serviceIds,
        accountId: stylistId,
        date: formatDateForInput(selectedDate),
      };

      try {
        const response = await api.post("booking/slots", bookingValue);
        if (response.data && response.data.result) {
          setAvailableSlots(response.data /*.result*/);
        }
      } catch (error) {}
    };
    fetchTimeSlots();
  }, [selectedDate, handleTimeSlotClick]);

  return (
    <div className="myBooking__dateTime">
      <div className="myBooking__dateTime-header">
        <h1>Choose Date & Time</h1>
      </div>
      <div className="myBooking__dateTime-date">
        <LuCalendarSearch className="select-icon" />
        <select
          value={
            selectedDate.toDateString() === today.toDateString()
              ? "today"
              : "tomorrow"
          }
          onChange={handleDateChange}
        >
          <option value="today">Today, {formatDate(today)}</option>
          <option value="tomorrow">Tomorrow, {formatDate(tomorrow)}</option>
        </select>
      </div>
      <div className="myBooking__dateTime-time">
        {timeSlots.map((slot) => (
          <div
            key={slot.slotid}
            className={`time-slot ${
              availableSlots.some(
                (availableSlot) => availableSlot.slotid === slot.slotid
              )
                ? ""
                : "disabled"
            } ${selectedTime === slot.slotid ? "selected" : ""}`}
            onClick={() => handleTimeSlotClick(slot.slotid)}
          >
            {slot.slottime}
          </div>
        ))}
      </div>
      <button className="myBooking__dateTime-btn btn flex">
        Next Step
        <FaArrowRight className="chooseDateTime-icon" />
      </button>
    </div>
  );
}
