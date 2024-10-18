/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./StaffBookingService.scss";
import api from "../../../config/axios";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SlLocationPin } from "react-icons/sl";
import { GrCompliance } from "react-icons/gr";
import Swal from 'sweetalert2';
import { IoCloseCircle } from "react-icons/io5";


const StaffBookingService = () => {
  const [bookings, setBookings] = useState([]);
  const [originalBookings, setOriginalBookings] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.updateBookingReducer);
  const [salonLocations, setSalonLocations] = useState([]);
  const [allStylist, setAllStylists] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [searchResults, setSearchResults] = useState(bookings);
  const inputRef = useRef(null);

  const [slots, setSlots] = useState([]);

  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    bookingId: 0,
    customerId: 0,
    voucherId: 0,
    slotId: 0,
    bookingDate: "",
    stylistId: 0,
    serviceId: [],
    salonId: 0,
    time: "",
    serviceName: [],
  });
  const [manager, setManager] = useState([]);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChangeFilter = (e) => {
    const date = e.target.value === "today" ? today : tomorrow;
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const response = await api.get(endpoint);
        if (response.data) {
          setter(response.data.result);
        }
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    };

    fetchData("salons", setSalonLocations);
    fetchData("vouchers", setVouchers);
    fetchData("service", setServices);
    fetchData("stylist/read", setAllStylists);
    fetchData("slot/read", setSlots);
  }, []);

  useEffect(() => {
    const fetchManagerData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`manager/profile`);
        const data = response.data.result;
        if (data) {
          setManager(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchManagerData();
  }, []);

  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0];
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get(
          `manager/stylists/booking/${manager.salonId}/${formattedDate}`
        );
        const data = response.data.result;

        if (data) {
          setBookings(data);
          setOriginalBookings(data);
        }
      } catch (error) {}
    };

    fetchBookings();
  }, [isUpdate, manager]);

  const fetchBookingData = async (bookingId) => {
    try {
      const response = await api.get(`booking/${bookingId}`);
      const data = response.data.result;

      if (data) {
        const foundSalon = salonLocations.find(
          (item) => item.address === data.salonName
        );
        const salonId = foundSalon ? foundSalon.id : null;

        const foundVoucher = vouchers.find(
          (item) => item.code === data.voucherCode
        );
        const voucherId = foundVoucher ? foundVoucher.id : null;

        const foundStylist = allStylist.find(
          (item) => item.fullname === data.stylistName
        );
        const stylistId = foundStylist ? foundStylist.accountid : null;

        const foundServices = services.filter((service) =>
          data.serviceName.includes(service.serviceName)
        );
        const serviceIds = foundServices.map((service) => Number(service.id));

        setFormData((prev) => ({
          ...prev,
          bookingId: bookingId,
          customerId: data.customerId,
          voucherId: Number(voucherId),
          bookingDate: data.date,
          stylistId: stylistId,
          serviceId: serviceIds,
          salonId: Number(salonId),
          customerName: data.customerName,
          stylistName: data.stylistName,
          date: data.date,
          time: data.time,
          salonName: data.salonName,
          voucherCode: data.voucherCode,
          serviceName: data.serviceName,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      if (formData.bookingId) {
        fetchBookingData(formData.bookingId);
        fetchStylistsData();
      }
    }
  }, [isModalOpen]);

  const fetchStylistsData = async () => {
    const foundSlot = slots.find((item) => item.slottime === formData.time);
    const slotId = foundSlot ? foundSlot.slotid : null;
    const value = {
      salonId: formData.salonId,
      serviceId: formData.serviceId,
      date: formData.bookingDate,
      slotId: slotId,
    };

    try {
      const response = await api.post("booking/stylists/update", value);
      const data = response.data.result;
      console.log(data);
      if (data) {
        setStylists(data);
      }
    } catch (error) {}
  };

  const sortBy = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else if (sortConfig.direction === "descending") {
        direction = null;
      }
    }

    setSortConfig({ key, direction });

    let sortedBookings;

    if (direction === null) {
      sortedBookings = [...originalBookings];
    } else {
      sortedBookings = [...bookings].sort((a, b) => {
        if (key === "discountAmount") {
          return direction === "ascending"
            ? parseFloat(a[key]) - parseFloat(b[key])
            : parseFloat(b[key]) - parseFloat(a[key]);
        }
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    setBookings(sortedBookings);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") return " ▲";
      if (sortConfig.direction === "descending") return " ▼";
    }
    return "";
  };

  const toggleModal = async (id) => {
    if (id) {
      await fetchBookingData(id);
    }
    setIsModalOpen(!isModalOpen);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return `${hours.toString().padStart(2, "0")}h${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    if (isNaN(date)) return "";
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${dayOfWeek} (${day}/${month}/${year})`;
  };

  useEffect(() => {
    if (formData.serviceId) {
      setSelectedServices(formData.serviceId.map((id) => id.toString()));
    }
  }, [formData.serviceId]);

  const handleCheckin = async (bookingId) => {
   
    try {
      const response = await api.put(`${bookingId}/checkin`);
      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Check-in successful",
          timer: 2500
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClick = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults(bookings);
      return;
    }

    const fetchBookings = async () => {
      const value = {
        phone: searchValue,
      };
      try {
        const response = await api.post(`staff/booking/${selectedDate}`, value);
        const data = response.data.result;
        if (data) {
          setSearchResults(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, [searchValue]);

  const handlePayment = (bookingId) => {
    navigate(`/staff/payment/${bookingId}`)
  }
  

  return (
    <>
      <div className="staff-booking-service">
        <div className="staff-booking-service__header">
          <div className="staff-booking-service__header-searchBar">
            <BiSearchAlt className="searchBar-icon" />
            {/* <i class="fas fa-search"></i> */}
            <input
              ref={inputRef}
              placeholder="Search here..."
              type="text"
              value={searchValue}
              onChange={handleChange}
            />
            <IoCloseCircle
              className="chooseService-closeIcon"
              onClick={handleClick}
            />
          </div>
          <div className="staff-booking-service__header-filter">
            <select
              value={
                selectedDate.toDateString() === today.toDateString()
                  ? "today"
                  : "tomorrow"
              }
              onChange={handleDateChangeFilter}
            >
              <option value="today">Today, {formatDate(today)}</option>
              <option value="tomorrow">Tomorrow, {formatDate(tomorrow)}</option>
            </select>
          </div>
        </div>
        <div className="staff-booking-service__container">
          <div className="staff-booking-service__content">
            <table className="staff-booking-service__table">
              <thead>
                <tr>
                  <th onClick={() => sortBy("id")}>
                    ID{getSortIndicator("id")}
                  </th>
                  <th onClick={() => sortBy("customerName")}>
                    Customer Name{getSortIndicator("customerName")}
                  </th>

                  <th onClick={() => sortBy("stylistName")}>
                    Stylist Name{getSortIndicator("stylistName")}
                  </th>
                  <th onClick={() => sortBy("date")}>
                    Date{getSortIndicator("date")}
                  </th>

                  <th onClick={() => sortBy("time")}>
                    Time{getSortIndicator("time")}
                  </th>
                  <th onClick={() => sortBy("salonName")}>
                    Salon Name{getSortIndicator("salonName")}
                  </th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {searchResults &&
                  searchResults.map((booking) => (
                  <tr key={booking.id}>
                    <td className="staff-booking-service__id">{booking.id}</td>
                    <td>
                      <div className="staff-booking-service__customer">
                        <span className="staff-booking-service__customer-name">
                          {booking.customerName}
                        </span>
                      </div>
                    </td>

                    <td className="staff-booking-service__discountAmount">
                      {booking.stylistName}
                    </td>
                    <td>
                      <span className={`staff-booking-service__quantity`}>
                        {formatDate(booking.date)}
                      </span>
                    </td>
                    <td>
                      <span className={`staff-booking-service__quantity`}>
                        {booking.time ? formatTime(booking.time) : ""}
                      </span>
                    </td>
                    <td className="staff-booking-service__date">
                      {booking.salonName}
                    </td>
                    <td className="staff-booking-service__actions">
                      <button
                        className="staff-booking-service__action-button"
                         onClick={() => handleCheckin(booking.id)}
                      >
                        <SlLocationPin />
                      </button>
                      <button
                        className="staff-booking-service__action-button"
                        onClick={() => handlePayment(booking.id)}
                      >
                        <GrCompliance />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffBookingService;
