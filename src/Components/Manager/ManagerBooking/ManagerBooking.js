/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./ManagerBooking.scss";
import api from "../../../config/axios";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../../actions/Update";
import { slots } from "../../../data/booking";

const ManagerBooking = () => {
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
  const [customers, setCustomers] = useState([]);
  const [vouchers, setVouchers] = useState([]);
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
  const [selectedTime, setSelectedTime] = useState("");
  const [manager, setManager] = useState([]);

  const handleDateChange = (event) => {
    setFormData((prev) => ({ ...prev, date: event.target.value }));
  };

  const handleTimeChange = (event) => {
    setFormData((prev) => ({ ...prev, time: event.target.value }));
    fetchStylistsData();
  };

  const handleStylistChange = (event) => {
    setFormData((prev) => ({ ...prev, stylistId: event.target.value }));
  };

  const handleServiceNameChange = (e) => {
    setSelectedTime([e.target.value]);
    setFormData((prev) => ({
      ...prev,
      serviceName: selectedTime,
    }));
  };

  const getServiceNameValue = () => {
    return formData.serviceName.length > 0
      ? formData.serviceName.map((service) => `• ${service}`).join("\n")
      : "";
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
    fetchData("customers", setCustomers);
    fetchData("vouchers", setVouchers);
    fetchData("service", setServices);
    fetchData("stylist/read", setAllStylists);
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
  }, [isUpdate]);

  const fetchBookingData = async (bookingId) => {
    try {
      const response = await api.get(`booking/${bookingId}`);
      const data = response.data.result;

      if (data) {
        const foundSalon = salonLocations.find(
          (item) => item.address === data.salonName
        );
        const salonId = foundSalon ? foundSalon.id : null;

        const foundCustomer = customers.find(
          (item) => item.fullname === data.customerName
        );
        const customerId = foundCustomer ? foundCustomer.accountid : null;

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
          customerId: Number(customerId),
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
    const foundSlot = slots.find(
      (item) => item.slottime === formatTime(formData.time)
    );
    const slotId = foundSlot ? foundSlot.slotid : null;
    const value = {
      salonId: formData.salonId,
      serviceId: formData.serviceId,
      date: formData.bookingDate,
      slotId: slotId,
    };

    try {
      const response = await api.post("booking/stylist/update", value);
      const data = response.data.result;
      if (data) {
        setStylists(data);
      }
    } catch (error) {}
  };

  const updateCustomerData = async (e) => {
    e.preventDefault();

    const foundSlot = slots.find(
      (item) => item.slottime === formatTime(formData.time)
    );
    const slotId = foundSlot ? foundSlot.slotid : null;

    const updateValues = {
      customerId: formData.customerId,
      voucherId: formData.voucherId,
      slotId: slotId,
      bookingDate: formData.bookingDate,
      stylistId: formData.stylistId,
      serviceId: formData.serviceId,
      salonId: formData.salonId,
    };

    console.log(updateValues);
    setLoading(true);
    try {
      const response = await api.put(
        `bookings/${formData.bookingId}`,
        updateValues
      );
      const data = response.data.result;

      if (data) {
        dispatch(updateCustomer());
        toggleModal();
      }
    } catch (err) {
    } finally {
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
      await fetchBookingData(id);
    }
    setIsModalOpen(!isModalOpen);
  };

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

  function convertTime(input) {
    return input.replace("h", ":") + ":00";
  }

  return (
    <>
      <div className="manager-booking">
        <div className="manager-booking__header">
          <div className="manager-booking__header-searchBar">
            <BiSearchAlt className="searchBar-icon" />
            {/* <i class="fas fa-search"></i> */}
            <input placeholder="Search here..." type="text" />
          </div>
          <div className="manager-booking__header-filter">
            <select>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>
        <div className="manager-booking__container">
          <div className="manager-booking__content">
            <table className="manager-booking__table">
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
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="manager-booking__id">{booking.id}</td>
                    <td>
                      <div className="manager-booking__customer">
                        <span className="manager-booking__customer-name">
                          {booking.customerName}
                        </span>
                      </div>
                    </td>

                    <td className="manager-booking__discountAmount">
                      {booking.stylistName}
                    </td>
                    <td>
                      <span className={`manager-booking__quantity`}>
                        {formatDate(booking.date)}
                      </span>
                    </td>
                    <td>
                      <span className={`manager-booking__quantity`}>
                        {formatTime(booking.time)}
                      </span>
                    </td>
                    <td className="manager-booking__date">
                      {booking.salonName}
                    </td>
                    <td className="manager-booking__actions">
                      <button
                        className="manager-booking__action-button"
                        onClick={() => toggleModal(booking.id)}
                      >
                        ✎
                      </button>
                      <button className="manager-booking__action-button">
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="manager-booking-backdrop" onClick={toggleModal}>
            <div
              className="manager-booking-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit}>
                <h2 className="manager-booking-modal__header">
                  Update Booking
                </h2>
                <div className="manager-booking-modal__form-section">
                  <div className="manager-booking-modal__form-grid">
                    <div className="manager-booking-modal__form-grid manager-booking-modal__form-grid--half-width">
                      <div className="manager-booking-modal__form-group">
                        <label
                          htmlFor="customerName"
                          className="manager-booking-modal__label"
                        >
                          Customer Name:
                        </label>
                        <input
                          type="text"
                          id="customerName"
                          className="manager-booking-modal__input"
                          placeholder="Customer Name"
                          defaultValue={formData.customerName}
                          disabled
                        />
                      </div>
                      <div className="manager-booking-modal__form-group">
                        <label
                          htmlFor="voucherCode"
                          className="manager-booking-modal__label"
                        >
                          Voucher Code:
                        </label>
                        <input
                          type="text"
                          id="voucherCode"
                          className="manager-booking-modal__input"
                          placeholder="Voucher Code"
                          defaultValue={formData.voucherCode}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="manager-booking-modal__form-grid manager-booking-modal__form-grid--full-width">
                      <div className="manager-booking-modal__form-group">
                        <label
                          htmlFor="time"
                          className="manager-booking-modal__label"
                        >
                          Select Time:
                        </label>
                        <div className="manager-booking-modal__skills-list">
                          {slots.map((time) => (
                            <label
                              key={time.slotid}
                              className="manager-booking-modal__option"
                            >
                              <input
                                type="radio"
                                name="time"
                                value={convertTime(time.slottime)}
                                checked={
                                  formData.time === convertTime(time.slottime)
                                }
                                onChange={handleTimeChange}
                                className="manager-booking-modal__radio"
                              />
                              <span>{time.slottime}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className="manager-booking-modal__form-grid
              manager-booking-modal__form-grid--half-width"
                    >
                      <div className="manager-booking-modal__form-group">
                        <label
                          htmlFor="date"
                          className="manager-booking-modal__label"
                        >
                          Date:
                        </label>
                        <input
                          type="text"
                          id="date"
                          className="manager-booking-modal__input"
                          placeholder="Date"
                          value={formatDate(formData.date)}
                          disabled
                          onChange={handleDateChange}
                        />
                      </div>
                      <div className="manager-booking-modal__form-group">
                        <label
                          htmlFor="stylistName"
                          className="manager-booking-modal__label"
                        >
                          Stylist Name:
                        </label>
                        <select
                          id="stylistName"
                          className="manager-booking-modal__select"
                          defaultValue={formData.stylistId || ""}
                          onChange={handleStylistChange}
                        >
                          <option value="" disabled>
                            Select Stylist
                          </option>
                          {stylists.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.fullname}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div
                      className="manager-booking-modal__form-grid
                manager-booking-modal__form-grid--full-width"
                    >
                      <div className="manager-booking-modal__form-group manager-booking-modal__form-group--full-width">
                        <label
                          htmlFor="serviceName"
                          className="manager-booking-modal__label"
                        >
                          Service Name:
                        </label>
                        <textarea
                          id="serviceName"
                          className="manager-booking-modal__select"
                          value={getServiceNameValue()}
                          onChange={handleServiceNameChange}
                          disabled
                        />
                      </div>
                    </div>
                    <div
                      className="manager-booking-modal__form-grid
                manager-booking-modal__form-grid--full-width"
                    >
                      <div className="manager-booking-modal__form-group manager-booking-modal__form-group--full-width">
                        <label
                          htmlFor="salon"
                          className="manager-booking-modal__label"
                        >
                          Select Salon:
                        </label>
                        <select
                          disabled
                          id="salon"
                          className="manager-booking-modal__select"
                          defaultValue={
                            formData.salonName ? formData.salonName : ""
                          }
                        >
                          <option value="" disabled>
                            Select Salon
                          </option>
                          {salonLocations.map((item) => (
                            <option key={item.id} value={item.address}>
                              {item.address}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="manager-stylist-modal__button-container">
                  <button
                    type="submit"
                    className="manager-stylist-modal__button"
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

export default ManagerBooking;
