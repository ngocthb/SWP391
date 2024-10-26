import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Checkbox, Space, Calendar, message, Spin, Select } from "antd";
import { StarFilled } from "@ant-design/icons";
import { FolderOutlined } from "@ant-design/icons";
import { TiScissorsOutline } from "react-icons/ti";
import Swal from "sweetalert2";
import "./ManagerUpdateShift.scss";
import api from "../../../config/axios";
import { updateBooking } from "../../../actions/Update";
import { useDispatch } from "react-redux";

export default function ManagerUpdateShift() {
  const { state } = useLocation();
  const [booking, setBooking] = useState([]);
  const [services, setServices] = useState([]);
  const [slots, setSlots] = useState([]);
  const [salonLocations, setSalonLocations] = useState([]);
  const [availableStylist, setAvailableStylist] = useState([]);
  const scheduleId = state.stylistScheduleId;
  const shift = state.shiftId;
  const date = state.date;
  const stylist = state.stylist;
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formUpdate, setFormUpdate] = useState({
    salonId: 0,
    customerId: 0,
    slotId: 0,
    bookingDate: "",
    serviceId: 0,
    stylistId: 0,
    voucherId: 0,
  });

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
    fetchData("service", setServices);
    fetchData("slot/read", setSlots);
  }, []);

  useEffect(() => {
    if (shift && scheduleId) {
      fetchBookingBusy();
    }
  }, [shift, scheduleId, services, salonLocations, slots]);

  const fetchBookingBusy = async () => {
    const value = {
      stylistScheduleId: scheduleId,
      shiftId: Array.isArray(shift) ? [...shift] : [shift],
    };

    try {
      const response = await api.post(`manager/booking/stylist/busy`, value);
      const data = response.data.result;
      console.log(data);
      if (data) {
        const bookingData = data.map((booking) => {
          const serviceNames = booking.serviceId.map(
            (serviceId) =>
              services.find((service) => service.id === serviceId)?.serviceName
          );
          const salon = salonLocations.find(
            (sa) => sa.address === booking.salonName
          );
          const salonId = salon ? salon.id : null;
          const slot = slots.find((slot) => slot.slottime === booking.time);
          const slotId = slot ? slot.slotid : null;
          const formattedTime = slot ? slot.slottime : booking.time;

          return {
            ...booking,
            serviceNames,
            salonId,
            slotId,
            time: formattedTime,
          };
        });

        // Replace booking data to avoid duplicates
        setBooking(bookingData);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchAvailableStylist = async (booking) => {
    const value = {
      salonId: booking.salonId,
      serviceId: booking.serviceId,
      date: booking.date,
      slotId: booking.slotId,
    };
    console.log(value);
    try {
      const response = await api.post(`/booking/stylists/update`, value);
      const data = response.data.result;
      if (data) {
        setAvailableStylist(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAvailableStylist = async (booking) => {
    if (booking) {
      setSelectedBooking(booking);
      await fetchAvailableStylist(booking);
    }
  };

  const onCheckboxChange = (stylistId) => {
    setSelectedStylist(selectedStylist === stylistId ? null : stylistId);
  };

  const updateBookingData = async (booking) => {
    const updateValues = {
      salonId: booking.salonId,
      customerId: booking.customerId,
      slotId: booking.slotId,
      bookingDate: booking.date,
      serviceId: booking.serviceId,
      stylistId: selectedStylist,
      voucherId: booking.voucherCode,
    };
    console.log(updateValues);
    setLoading(true);
    try {
      const response = await api.put(`booking/${booking.id}`, updateValues);
      const data = response.data;
      if (data) {
        setFormUpdate((prev) => ({
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
        Swal.fire({
          title: "Updated!",
          text: "The booking has been update.",
          icon: "success",
        });
        navigate("/manager/shift/update");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (booking) => {
    await updateBookingData(booking);
  };
  function convertTimeFormat(time) {
    const [hours, minutes] = time.split(":");

    return `${hours}h${minutes}`;
  }
  return (
    <div className="shift-manager">
      <div className="shift-manager__sidebar">
        <section className="stylist-info">
          <h2 className="stylist-info__title">
            Stylist <span>Information</span>
          </h2>
          <div className="stylist-info__card">
            <div className="stylist-info__avatar">
              <img alt={stylist.stylistName} src={stylist.image} />
            </div>
            <div className="stylist-info__details">
              <div className="stylist-info__header">
                <h2>
                  #Date: <span>{date}</span>
                </h2>
                <h2>
                  #Shift:
                  <span>
                    {shift.map((item) => (
                      <span key={item}>{item} </span>
                    ))}
                  </span>
                </h2>
              </div>
              <h1>{stylist.stylistName}</h1>
            </div>
          </div>
        </section>

        <section className="task-list">
          <h3 className="task-list__title">
            Task <span>({booking.length})</span>
          </h3>
          <div className="task-list__container">
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Time</th>
                  </tr>
                </thead>
              </table>
              <div className="data-table__body-wrapper">
                <table className="data-table">
                  <tbody>
                    {(booking || []).map((booking) => (
                      <tr
                        key={booking.id}
                        onClick={() => handleAvailableStylist(booking)}
                      >
                        <td className="data-table__id">{booking.id}</td>
                        <td>
                          <div className="customer-info">
                            <span className="customer-info__name">
                              {booking.customerName}
                            </span>
                          </div>
                        </td>
                        <td>
                          {(booking.serviceNames || []).map(
                            (service, index) => (
                              <div key={index}>{service}</div>
                            )
                          )}
                        </td>
                        <td>{convertTimeFormat(booking.time)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="shift-manager__main">
        <section className="available-stylists">
          <h2 className="available-stylists__title">
            Available <span>Stylist</span>
          </h2>
          {availableStylist.length === 0 ? (
            <div className="empty-state">
              <TiScissorsOutline className="empty-state__icon" />
              <p>Don't have stylist available</p>
            </div>
          ) : (
            <div>
              <div className="data-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Stylist</th>
                      <th>Score</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                </table>
                <div className="data-table__body-wrapper">
                  <table className="data-table">
                    <tbody>
                      {(availableStylist || []).map((stylist) => (
                        <tr key={stylist.id}>
                          <td className="data-table__id">{stylist.id}</td>
                          <td className="stylist-avatar">
                            <img src={stylist.image} alt={stylist.fullname} />
                          </td>
                          <td className="stylist-name">{stylist.fullname}</td>
                          <td>
                            <div className="rating">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div key={star}>
                                  <StarFilled
                                    className={
                                      stylist.feedbackScore / 2 < star
                                        ? "rating__star--inactive"
                                        : "rating__star--active"
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          </td>
                          <td>
                            <Checkbox
                              checked={selectedStylist === stylist.id}
                              onChange={() => onCheckboxChange(stylist.id)}
                            >
                              {selectedStylist === stylist.id
                                ? "Selected"
                                : "Available"}
                            </Checkbox>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="action-bar">
                <button
                  className="action-bar__button"
                  disabled={loading}
                  onClick={() => handleSubmit(selectedBooking)}
                >
                  {loading ? <Spin size="small" /> : "Save"}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
