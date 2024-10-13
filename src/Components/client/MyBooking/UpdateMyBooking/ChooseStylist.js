import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import api from "../../../../config/axios";
import "./UpdateMyBooking.scss";
import { bookingIdContext } from "../MyBooking";

export function ChooseStylist({ onNext, onPre }) {
  const bookingId = useContext(bookingIdContext);
  const [selectedStylistId, setSelectedStylistId] = useState(null); // Store only the ID
  const [stylists, setStylists] = useState([]);

  const handleSelected = (stylist) => {
    setSelectedStylistId(stylist.id); // Set the selected stylist ID
  };

  useEffect(() => {
    const storedBranchId = sessionStorage.getItem("selectedBranchId");
    const branchId = parseInt(storedBranchId, 10);
    const storedServices = sessionStorage.getItem("selectedServicesId");
    const serviceIds = JSON.parse(storedServices);

    const fetchStylists = async () => {
      const bookingValue = {
        salonId: branchId,
        serviceId: serviceIds,
      };

      try {
        // const response = await api.get(
        //   `booking-stylists`,
        //   bookingValue
        // );
        const response = await api.post("booking/stylists", bookingValue);
        if (response.data) {
          // setStylists(response.data);
          setStylists(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching stylists:", error);
      }
    };
    fetchStylists();
  }, []);

  useEffect(() => {
    const storedStylistId = sessionStorage.getItem("selectedStylistId");
    if (storedStylistId) {
      const stylistId = parseInt(storedStylistId, 10);
      const stylistSelect = stylists.find((s) => Number(s.id) === stylistId);
      if (stylistSelect) {
        setSelectedStylistId(stylistSelect);
      }
    }
  }, [stylists]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get(
          // `bookingHistory?bookingId=${bookingId}`
          `booking?bookingId=${bookingId}`
        );
        // const data = response.data[0];
        const data = response.data.result;

        if (data) {
          const foundStylistId = stylists.find(
            (item) => item.id === data.stylistId
          )?.id;
          if (foundStylistId) {
            setSelectedStylistId(foundStylistId);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooking();
  }, [stylists, bookingId]);

  useEffect(() => {
    const storedStylistId = sessionStorage.getItem("selectedStylistId");
    if (storedStylistId) {
      const stylistId = parseInt(storedStylistId, 10);
      const stylist = stylists.find((s) => s.id === stylistId);
      if (stylist) {
        setSelectedStylistId(stylist.id); // Just ensure it is the ID
      }
    }
  }, [stylists]);

  // Determine selected stylist object
  const selectedStylist = stylists.find(
    (stylist) => stylist.id === selectedStylistId
  );

  return (
    <div className="myBooking__stylist">
      <div className="myBooking__stylist-header">
        <div onClick={onPre}>
          <FaArrowLeft className="myBooking__stylist-icon" />
        </div>
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
            {/* Additional stylist details can be displayed here if needed */}
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
              onClick={() => handleSelected(stylist)}
              className={`myBooking__stylist-single ${
                selectedStylistId === stylist.id ? "selected" : ""
              }`}
            >
              <img alt={stylist.fullname} src={stylist.image} />
              <p>{stylist.fullname}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="myBooking__stylist-btn btn flex"
        onClick={(e) => {
          if (!selectedStylistId) {
            e.preventDefault();
          } else {
            sessionStorage.setItem("selectedStylistId", selectedStylistId); // Store only the ID
            onNext();
          }
        }}
      >
        Next Step
        <FaArrowRight className="myBooking__stylist-icon" />
      </button>
    </div>
  );
}
