/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./StaffBookingPending.scss";
import api from "../../../config/axios";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking } from "../../../actions/Update";
import { IoCloseCircle } from "react-icons/io5";
import Swal from "sweetalert2";
import { BsBoxArrowInRight } from "react-icons/bs";
import { FaAngleLeft, FaChevronRight } from "react-icons/fa6";
import {
  PlusOutlined,
} from "@ant-design/icons";

const StaffBookingPending = ({ buttonLabel }) => {
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
  const [vouchers, setVouchers] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(bookings);
  const inputRef = useRef(null);
  const [isStaffLoaded, setIsStaffLoaded] = useState(false);
  const [slots, setSlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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
    phone: "",
    serviceName: [],
  });
  const [staff, setStaff] = useState([]);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChangeFilter = (e) => {
    const date = e.target.value === "today" ? today : tomorrow;
    setSelectedDate(date);
  };

  const handleDateChange = (event) => {
    setFormData((prev) => ({ ...prev, date: event.target.value }));
  };

  const handleTimeChange = (event) => {
    setFormData((prev) => ({ ...prev, time: event.target.value }));
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
          setStaff(data);
          setIsStaffLoaded(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchManagerData();
  }, []);


  const fetchService = async () => {
    if (formData.stylistId === 0) {
      return
    }

    try {
      const response = await api.get(`stylist/service/${Number(formData.stylistId)}`)
      const data = response.data.result;
      if (data) {
        setServices(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBookings = async (page) => {
    if (!isStaffLoaded || !staff.salonId) return;
    try {
      const response = await api.get(
        `manager/stylists/booking/pending/${page}/6/${staff.salonId}/${formatDateForInput(selectedDate)}`
      );
      const data = response.data.result.content;
      const total = response.data.result.totalPages;
      if (data) {
        setBookings(data);
        setOriginalBookings(data);
        setTotalPages(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const [isCheckin, setIsCheckin] = useState(false);

  const handleCheckin = async (bookingId) => {
   
    try {
      const response = await api.put(`${bookingId}/checkin`);
      if (response) {
        setIsCheckin(!isCheckin);
        Swal.fire({
          icon: "success",
          title: "Check-in successfully",
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


  useEffect(() => {
    fetchBookings(currentPage);
  }, [isUpdate, staff, isStaffLoaded, selectedDate, currentPage, isCheckin]);

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

        setFormData((prev) => ({
          ...prev,
          bookingId: bookingId,
          customerId: data.customerId,
          voucherId: Number(voucherId),
          bookingDate: data.date,
          stylistId: stylistId,
          serviceId: data.serviceId,
          salonId: Number(salonId),
          customerName: data.customerName,
          stylistName: data.stylistName,
          date: data.date,
          time: data.time,
          salonName: data.salonName,
          voucherCode: data.voucherCode,
          serviceName: data.serviceName,
          phone: data.phone,
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
        fetchService();
      }
    }

  }, [isModalOpen]);


  const updateCustomerData = async (e) => {
    e.preventDefault();
    const foundSlot = slots.find((item) => item.slottime === formData.time);
    const slotId = foundSlot ? foundSlot.slotid : null;

    const updateValues = {
      customerId: formData.customerId,
      voucherId: formData.voucherId,
      slotId: slotId,
      bookingDate: formData.bookingDate,
      stylistId: formData.stylistId,
      serviceId: selectedServices.map(Number),
      salonId: formData.salonId,
    };

    setLoading(true);
    try {
      const response = await api.put(
        `update/service/${formData.bookingId}`,
        updateValues
      );
      const data = response.data.result;

      if (data) {
        dispatch(updateBooking());
        toggleModal();
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: err.response.data.message,
        timer: 2500
      });
    }
    finally {
      setLoading(false);
    }
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
      await fetchService();
      await fetchBookingData(id);
    }
    setIsModalOpen(!isModalOpen);
  };

  const newBooking = (customerPhone) => {
    console.log(customerPhone);
    navigate("/staff/booking/create", {state: {customerPhone}});
  }

  const handleSubmit = (e) => {
    updateCustomerData(e);
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
    console.log(formData.serviceId)
    if (formData.serviceId) {

      setSelectedServices(formData.serviceId);
    }
  }, [formData.serviceId]);

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prevSelected) => {
      const newSelected = prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId];

      setSelectedServices(newSelected);
      return newSelected;
    });
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
        const response = await api.post(`staff/booking/${formatDateForInput(selectedDate)}`, value);
        const data = response.data.result;
        if (data) {
          setSearchResults(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, [searchValue, staff, bookings]);

  const createBooking = () => {
    navigate("/staff/booking/create");
  };

  return (
    <>
      <div className="staff-booking-pending">
        <div className="staff-booking-pending__header">
          <div className="staff-booking-pending__header-searchBar">
            <BiSearchAlt className="searchBar-icon" />
            {/* <i class="fas fa-search"></i> */}
            <input
              ref={inputRef}
              placeholder="Search here..."
              type="text"
              value={searchValue}
              onChange={handleChange}
            />
           {searchValue &&  <IoCloseCircle
              className="close-icon"
              onClick={handleClick}
            />}
          </div>
          <div className="staff-booking-pending__header-filter">
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
            <button onClick={createBooking}> {buttonLabel}</button>
          </div>
        </div>
        <div className="staff-booking-pending__container">
          <div className="staff-booking-pending__content">
            <table className="staff-booking-pending__table">
              <thead>
                <tr>
                  <th onClick={() => sortBy("id")}>
                    ID{getSortIndicator("id")}
                  </th>
                  <th onClick={() => sortBy("customerName")}>
                    Customer Name{getSortIndicator("customerName")}
                  </th>
                  <th onClick={() => sortBy("phone")}>
                    Phone{getSortIndicator("phone")}
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
                
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {searchResults &&
                  searchResults.map((booking) => (
                    <tr key={booking.id}>
                      <td className="staff-booking-pending__id">{booking.id}</td>
                      <td>
                        <div className="staff-booking-pending__customer">
                          <span className="staff-booking-pending__customer-name">
                            {booking.customerName}
                          </span>
                        </div>
                      </td>
                      <td className="staff-booking-pending__status">
                        {booking.customerPhone}
                      </td>
                      <td className="staff-booking-pending__discountAmount">
                        {booking.stylistName}
                      </td>
                      <td>
                        <span className={`staff-booking-pending__quantity`}>
                          {formatDate(booking.date)}
                        </span>
                      </td>
                      <td>
                        <span className={`staff-booking-pending__quantity`}>
                          {booking.time ? formatTime(booking.time) : ""}
                        </span>
                      </td>
                      
                      <td className="staff-booking-pending__actions">
                      <button
                        className="staff-booking-pending__action-button"
                         onClick={() => handleCheckin(booking.id)}
                      >
                        <BsBoxArrowInRight />
                      </button>
                        <button
                          className="staff-booking-pending__action-button"
                          onClick={() => toggleModal(booking.id)}
                        >
                          ✎
                        </button>
                        <button className="staff-booking-pending__action-button">
                          🗑
                        </button>
                        <button
                          className="staff-booking-pending__action-button"
                          onClick={() => newBooking(booking.customerPhone)}
                        >
                          <PlusOutlined />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="staff-booking-pending__pagination">
          <div className="staff-booking-pending__pagination-pages">
            <span
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage === 0 ? "disabled" : ""}
            >
              <FaAngleLeft className="pagination-icon" />
            </span>
            {[...Array(totalPages)].map((_, index) => (
              <span
                key={index}
                onClick={() => handlePageChange(index)}
                className={currentPage === index ? "active" : ""}
              >
                {index + 1}
              </span>
            ))}
            <span
              onClick={() => handlePageChange(currentPage + 1)}
              className={currentPage === totalPages - 1 ? "disabled" : ""}
            >
              <FaChevronRight className="pagination-icon" />
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="staff-booking-pending-backdrop" onClick={toggleModal}>
            <div
              className="staff-booking-pending-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit}>
                <h2 className="staff-booking-pending-modal__header">Update Booking</h2>
                <div className="staff-booking-pending-modal__form-section">
                  <div className="staff-booking-pending-modal__form-grid">
                    <div className="staff-booking-pending-modal__form-grid staff-booking-pending-modal__form-grid--half-width">
                      <div className="staff-booking-pending-modal__form-group">
                        <label
                          htmlFor="customerName"
                          className="staff-booking-pending-modal__label"
                        >
                          Customer Name:
                        </label>
                        <input
                          type="text"
                          id="customerName"
                          className="staff-booking-pending-modal__input"
                          placeholder="Customer Name"
                          defaultValue={formData.customerName}
                          disabled
                        />
                      </div>
                      <div className="staff-booking-pending-modal__form-group">
                        <label
                          htmlFor="voucherCode"
                          className="staff-booking-pending-modal__label"
                        >
                          Voucher Code:
                        </label>
                        <input
                          type="text"
                          id="voucherCode"
                          className="staff-booking-pending-modal__input"
                          placeholder="Voucher Code"
                          defaultValue={formData.voucherCode}
                          disabled
                        />
                      </div>
                    </div>

                    <div
                      className="staff-booking-pending-modal__form-grid
              staff-booking-pending-modal__form-grid--half-width"
                    >
                      <div className="staff-booking-pending-modal__form-group">
                        <label
                          htmlFor="stylistName"
                          className="staff-booking-pending-modal__label"
                        >
                          Stylist Name:
                        </label>
                        <input
                          type="text"
                          id="stylistName"
                          className="staff-booking-pending-modal__input"
                          placeholder="Stylist Name"
                          value={formData.stylistName}
                          disabled

                        />
                      </div>
                      <div className="staff-booking-pending-modal__form-group">
                        <label
                          htmlFor="date"
                          className="staff-booking-pending-modal__label"
                        >
                          Date:
                        </label>
                        <input
                          type="text"
                          id="date"
                          className="staff-booking-pending-modal__input"
                          placeholder="Date"
                          value={formatDate(formData.date)}
                          disabled
                          onChange={handleDateChange}
                        />
                      </div>
                    </div>
                    <div className="staff-booking-pending-modal__form-grid staff-booking-pending-modal__form-grid--full-width">
                      <div className="staff-booking-pending-modal__form-group">
                        <label
                          htmlFor="time"
                          className="staff-booking-pending-modal__label"
                        >
                          Select Time:
                        </label>
                        <div className="staff-booking-pending-modal__slots-list">
                          {(slots || []).map((time) => (
                            <label
                              key={time.slotid}
                              className={`staff-booking-pending-modal__slots-option disabled`}
                            >
                              <input
                                type="radio"
                                name="time"
                                value={time.slottime}
                                checked={formData.time === time.slottime}
                                onChange={handleTimeChange}
                                disabled
                                className={`staff-booking-pending-modal__radio disabled`}
                              />
                              <span>{formatTime(time.slottime)}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div
                      className="staff-booking-pending-modal__form-grid
                staff-booking-pending-modal__form-grid--full-width"
                    >
                      <div className="staff-booking-pending-modal__form-group">
                        <label
                          htmlFor="serviceName"
                          className="staff-booking-pending-modal__label"
                        >
                          Service Name:
                        </label>
                        <div className="staff-booking-pending-modal__services-list">
                          {(services || []).map((service) => (
                            <label
                              key={service.serviceId}
                              className="staff-booking-pending-modal__option"
                            >
                              <input
                                type="checkbox"
                                checked={selectedServices.includes(service.serviceId)}
                                onChange={() => handleServiceToggle(service.serviceId)}
                                className="staff-booking-pending-modal__checkbox"
                              />
                              <span>{service.serviceName}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div
                      className="staff-booking-pending-modal__form-grid
                staff-booking-pending-modal__form-grid--full-width"
                    >
                      <div className="staff-booking-pending-modal__form-group staff-booking-pending-modal__form-group--full-width">
                        <label
                          htmlFor="salon"
                          className="staff-booking-pending-modal__label"
                        >
                          Select Salon:
                        </label>
                        <select
                          disabled
                          id="salon"
                          className="staff-booking-pending-modal__select"
                          defaultValue={
                            formData.salonName ? formData.salonName : ""
                          }
                        >
                          <option value="" disabled>
                            Select Salon
                          </option>
                          {(salonLocations || []).map((item) => (
                            <option key={item.id} value={item.address}>
                              {item.address}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="staff-booking-pending-modal__button-container">
                  <button
                    type="submit"
                    className="staff-booking-pending-modal__button"
                    disabled={loading}
                  >
                    {loading ? <Spin size="small" /> : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StaffBookingPending;
