import { FaArrowLeft } from "react-icons/fa6";

import { LuCalendarSearch } from "react-icons/lu";

import { message, Spin } from "antd";

import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";

import api from "../../../../config/axios";
import "./UpdateMyBooking.scss";

import { slots } from "../../../../data/booking";

import { bookingIdContext } from "../MyBooking";
import { updateBooking } from "../../../../actions/Update";

export function ChooseDateTime({ accountId, onPre, onSave }) {
  const bookingId = useContext(bookingIdContext);
  const [messageApi, contextHolder] = message.useMessage();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);
  const [timeSlots, setTimeSlots] = useState(slots);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [formData, setFormData] = useState({
    salonId: 0,
    customerId: 0,
    slotId: 0,
    bookingDate: 0,
    serviceId: 0,
    stylistId: 0,
    voucherId: 0,
  });
  const dispatch = useDispatch();
  const fetchBooking = async () => {
    const storedSlotId = sessionStorage.getItem("selectedTimeId");
    if (!storedSlotId) {
      try {
        const response = await api.get(
          // `bookingHistory?bookingId=${bookingId}`
          `customer/${accountId}/pending/${bookingId}`
        );
        const data = response.data[0];
        if (data) {
          setSelectedDate(new Date(data.date));
          const foundSlot = timeSlots.find(
            (item) => item.slottime === formatSlot(data.time)
          );
          if (foundSlot) {
            setSelectedTime(foundSlot.slotid);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedTime(sessionStorage.getItem("selectedTimeId"));
      setSelectedDate(sessionStorage.getItem("selectedDate"));
    }
  };
  useEffect(() => {
    fetchBooking();
  }, [timeSlots, bookingId]);

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

  // chỉnh format của time slot "10:00:00" thành 10h00
  function formatSlot(timeString) {
    if (!timeString) {
      console.error("Invalid time string:", timeString);
      return null; // or some default value
    }
    const timeParts = timeString.split(":");
    if (timeParts.length < 2) {
      console.error("Time string is not in the correct format:", timeString);
      return null;
    }
    const [hours, minutes] = timeParts;
    const formattedTime = `${String(parseInt(hours)).padStart(
      2,
      "0"
    )}h${minutes}`;

    return formattedTime;
  }

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
        const response = await api./*post*/ get("booking-slots", bookingValue);
        if (response.data /*&& response.data.result*/) {
          setAvailableSlots(response.data /*.result*/);
        }
      } catch (error) {}
    };
    fetchTimeSlots();
  }, [selectedDate, handleTimeSlotClick]);

  const toggleModal = async (bookingId) => {
    if (bookingId) {
      await fetchBooking(bookingId);
    }
    onSave();
  };
  const updateBookingData = async (e) => {
    e.preventDefault();
    const updateValues = {
      salonId: sessionStorage.getItem("selectedBranchId"),
      customerId: accountId,
      slotId: sessionStorage.getItem("selectedTimeId"),
      bookingDate: sessionStorage.getItem("selectedDate"),
      serviceId: sessionStorage.getItem("selectedServicesId"),
      stylistId: sessionStorage.getItem("selectedStylistId"),
      voucherId: sessionStorage.getItem("selectedVoucherId"),
    };

    setLoading(true);
    try {
      const response = await api.put(
        // `bookingHistory/${bookingId}`,
        `booking/${bookingId}`,
        updateValues
      );
      const data = response.data;

      if (data) {
        setFormData((prev) => ({
          ...prev,
          salonId: data.salonId || 0,
          customerId: data.customerId || 0,
          slotId: data.slotId || 0,
          bookingDate: data.bookingDate || "",
          serviceId: data.serviceId || "",
          stylistId: data.stylistId || 0,
          voucherId: data.voucherId || 0,
        }));
        dispatch(updateBooking());
        messageApi.success("Booking information updated successfully!");
        toggleModal();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      onSave();
    }
  };
  const handleSubmit = (e) => {
    updateBookingData(e);
  };
  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit} className="myBooking__dateTime">
        <div className="myBooking__dateTime-header">
          <div onClick={onPre}>
            <FaArrowLeft className="chooseDateTime-icon" />
          </div>
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
                  : ""
              } ${selectedTime === slot.slotid ? "selected" : ""}`}
              onClick={() => handleTimeSlotClick(slot.slotid)}
            >
              {slot.slottime}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="myBooking__dateTime-btn btn flex"
          onClick={(e) => {
            toggleModal(bookingId);
            if (!isSelectedTime) {
              e.preventDefault();
            } else {
              sessionStorage.setItem("selectedTimeId", selectedTime);
              sessionStorage.setItem(
                "selectedDate",
                formatDateForInput(selectedDate)
              );
            }
          }}
          disabled={loading}
        >
          {loading ? <Spin size="small" /> : "Save"}
        </button>
      </form>
    </>
  );
}
