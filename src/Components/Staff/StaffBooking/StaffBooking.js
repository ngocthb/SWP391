/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./StaffBooking.scss";
import api from "../../../config/axios";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking, updateCustomer } from "../../../actions/Update";

const StaffBooking = ({ buttonLabel }) => {
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

  const [slots, setSlots] = useState([]);
  const [slotRealTime, setSlotRealTime] = useState([]);

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

  useEffect(() => {
    fetchStylistsData();
  }, [formData.time]);
  const handleStylistChange = (event) => {
    setFormData((prev) => ({ ...prev, stylistId: event.target.value }));
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

    fetchData(`slot/${selectedDate}`, setSlotRealTime);
  }, [selectedDate]);

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
    console.log(updateValues);
    setLoading(true);
    try {
      const response = await api.put(
        `bookings/${formData.bookingId}`,
        updateValues
      );
      const data = response.data.result;

      if (data) {
        dispatch(updateBooking());
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

  useEffect(() => {
    if (formData.serviceId) {
      setSelectedServices(formData.serviceId.map(id => id.toString()));
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

  const createBooking = () => {
    navigate("/staff/booking/create");
  };

  return (
    <>
      <div className="staff-booking">
        <div className="staff-booking__header">
          <div className="staff-booking__header-searchBar">
            <BiSearchAlt className="searchBar-icon" />
            {/* <i class="fas fa-search"></i> */}
            <input placeholder="Search here..." type="text" />
          </div>
          <div className="staff-booking__header-filter">
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
        <div className="staff-booking__container">
          <div className="staff-booking__content">
            <table className="staff-booking__table">
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
                {(bookings || []).map((booking) => (
                  <tr key={booking.id}>
                    <td className="staff-booking__id">{booking.id}</td>
                    <td>
                      <div className="staff-booking__customer">
                        <span className="staff-booking__customer-name">
                          {booking.customerName}
                        </span>
                      </div>
                    </td>

                    <td className="staff-booking__discountAmount">
                      {booking.stylistName}
                    </td>
                    <td>
                      <span className={`staff-booking__quantity`}>
                        {formatDate(booking.date)}
                      </span>
                    </td>
                    <td>
                      <span className={`staff-booking__quantity`}>
                        {booking.time ? formatTime(booking.time) : ""}
                      </span>
                    </td>
                    <td className="staff-booking__date">{booking.salonName}</td>
                    <td className="staff-booking__actions">
                      <button
                        className="staff-booking__action-button"
                        onClick={() => toggleModal(booking.id)}
                      >
                        ✎
                      </button>
                      <button className="staff-booking__action-button">
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
          <div className="staff-booking-backdrop" onClick={toggleModal}>
            <div
              className="staff-booking-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit}>
                <h2 className="staff-booking-modal__header">Update Booking</h2>
                <div className="staff-booking-modal__form-section">
                  <div className="staff-booking-modal__form-grid">
                    <div className="staff-booking-modal__form-grid staff-booking-modal__form-grid--half-width">
                      <div className="staff-booking-modal__form-group">
                        <label
                          htmlFor="customerName"
                          className="staff-booking-modal__label"
                        >
                          Customer Name:
                        </label>
                        <input
                          type="text"
                          id="customerName"
                          className="staff-booking-modal__input"
                          placeholder="Customer Name"
                          defaultValue={formData.customerName}
                          disabled
                        />
                      </div>
                      <div className="staff-booking-modal__form-group">
                        <label
                          htmlFor="voucherCode"
                          className="staff-booking-modal__label"
                        >
                          Voucher Code:
                        </label>
                        <input
                          type="text"
                          id="voucherCode"
                          className="staff-booking-modal__input"
                          placeholder="Voucher Code"
                          defaultValue={formData.voucherCode}
                          disabled
                        />
                      </div>
                    </div>

                    <div
                      className="staff-booking-modal__form-grid
              staff-booking-modal__form-grid--half-width"
                    >
                      <div className="staff-booking-modal__form-group">
                        <label
                          htmlFor="stylistName"
                          className="staff-booking-modal__label"
                        >
                          Stylist Name:
                        </label>
                        <select
                          id="stylistName"
                          className="staff-booking-modal__select"
                          defaultValue={formData.stylistId || ""}
                          onChange={handleStylistChange}
                        >
                          <option value="" disabled>
                            Select Stylist
                          </option>
                          {(stylists || []).map((item) => (
                            <option key={item.accountid} value={item.accountid}>
                              {item.fullname}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="staff-booking-modal__form-group">
                        <label
                          htmlFor="date"
                          className="staff-booking-modal__label"
                        >
                          Date:
                        </label>
                        <input
                          type="text"
                          id="date"
                          className="staff-booking-modal__input"
                          placeholder="Date"
                          value={formatDate(formData.date)}
                          disabled
                          onChange={handleDateChange}
                        />
                      </div>
                    </div>
                    <div className="staff-booking-modal__form-grid staff-booking-modal__form-grid--full-width">
                      <div className="staff-booking-modal__form-group">
                        <label
                          htmlFor="time"
                          className="staff-booking-modal__label"
                        >
                          Select Time:
                        </label>
                        <div className="staff-booking-modal__slots-list">
                          {(slots || []).map((time) => (
                            <label
                              key={time.slotid}
                              className={`staff-booking-modal__slots-option disabled`}
                            >
                              <input
                                type="radio"
                                name="time"
                                value={time.slottime}
                                checked={formData.time === time.slottime}
                                onChange={handleTimeChange}
                                disabled
                                className={`staff-booking-modal__radio disabled`}
                              />
                              <span>{formatTime(time.slottime)}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div
                      className="staff-booking-modal__form-grid
                staff-booking-modal__form-grid--full-width"
                    >
                      <div className="staff-booking-modal__form-group">
                        <label
                          htmlFor="serviceName"
                          className="staff-booking-modal__label"
                        >
                          Service Name:
                        </label>
                        <div className="staff-booking-modal__services-list">
                          {(services || []).map((service) => (
                            <label
                              key={service.id}
                              className="staff-booking-modal__option"
                            >
                              <input
                                type="checkbox"
                                checked={selectedServices.includes(service.id)}
                                onChange={() => handleServiceToggle(service.id)}
                                className="staff-booking-modal__checkbox"
                              />
                              <span>{service.serviceName}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div
                      className="staff-booking-modal__form-grid
                staff-booking-modal__form-grid--full-width"
                    >
                      <div className="staff-booking-modal__form-group staff-booking-modal__form-group--full-width">
                        <label
                          htmlFor="salon"
                          className="staff-booking-modal__label"
                        >
                          Select Salon:
                        </label>
                        <select
                          disabled
                          id="salon"
                          className="staff-booking-modal__select"
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

export default StaffBooking;
