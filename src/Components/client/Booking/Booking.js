/* eslint-disable react-hooks/exhaustive-deps */
import { CiHome } from "react-icons/ci";
import { PiScissors } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Booking.scss";
import { useEffect, useState } from "react";
import { RiTimeLine } from "react-icons/ri";
import api from "../../../config/axios";

export default function Booking() {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState("");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const isSelectedDate = sessionStorage.getItem("selectedDate");
    const isSelectedTimeId = sessionStorage.getItem("selectedTimeId");
    if (!isSelectedDate || !isSelectedTimeId) {
      navigate("/booking/step4");
      const isSelectedStylist = sessionStorage.getItem("selectedStylistId");
      if (!isSelectedStylist) {
        navigate("/booking/step3");
        const isSelectedServices = sessionStorage.getItem("selectedServicesId");
        if (!isSelectedServices) {
          navigate("/booking/step2");
          const selectedBranchId = sessionStorage.getItem("selectedBranchId");
          if (!selectedBranchId) {
            navigate("/booking/step1");
          }
        }
      }
    }
  }, []);

  const [salonLocations, setSalonLocations] = useState([]);
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const fetchSalonLocations = async () => {
      try {
        const response = await api.get("salon");
        if (response.data && response.data.result) {
          setSalonLocations(response.data.result);
        }
      } catch (error) {}
    };
    fetchSalonLocations();

    const fetchService = async () => {
      try {
        const response = await api.get("service");
        if (response.data && response.data.result) {
          setServices(response.data.result);
        }
      } catch (error) {}
    };
    fetchService();

    const storedBranchId = sessionStorage.getItem("selectedBranchId");
    const branchId = parseInt(storedBranchId, 10);

    const storedServices = sessionStorage.getItem("selectedServicesId");
    const serviceIds = JSON.parse(storedServices);

    const fetchstylists = async () => {
      const bookingValue = {
        salonId: branchId,
        serviceId: serviceIds,
      };

      try {
        const response = await api.post("booking/stylists", bookingValue);
        if (response.data && response.data.result) {
          setStylists(response.data.result);
        }
      } catch (error) {}
    };
    fetchstylists();

    const storedStylist = sessionStorage.getItem("selectedStylistId");
    const stylistId = JSON.parse(storedStylist);

    const storedDate = sessionStorage.getItem("selectedDate");
    const date = new Date(storedDate);

    const fetchTimeSlots = async () => {
      const bookingValue = {
        salonId: branchId,
        serviceId: serviceIds,
        accountId: stylistId,
        date: formatDateForInput(date),
      };

      try {
        const response = await api.get("booking/slots", bookingValue);
        if (response.data && response.data.result) {
          setTimeSlots(response.data.result);
        }
      } catch (error) {}
    };
    fetchTimeSlots();
  }, []);

  useEffect(() => {
    const storedBranchId = sessionStorage.getItem("selectedBranchId");
    if (storedBranchId) {
      const branchId = parseInt(storedBranchId, 10);
      const branch = salonLocations.find((b) => b.id === branchId);
      if (branch) {
        setSelectedBranch(branch.address);
      }
    }

    const storedServices = sessionStorage.getItem("selectedServicesId");
    if (storedServices) {
      const serviceIds = JSON.parse(storedServices);
      const selected = services.filter((service) =>
        serviceIds.includes(service.id)
      );
      setSelectedServices(selected.map((item) => item.serviceName));
    }

    const storedTimeId = sessionStorage.getItem("selectedTimeId");
    const storedDate = sessionStorage.getItem("selectedDate");
    if (storedTimeId) {
      const timeId = parseInt(storedTimeId, 10);
      if (timeId) {
        const time = timeSlots.find((t) => t.slotid === timeId);
        if (time) {
          setSelectedTime(time.slottime);
        }
      }
    }
    if (storedDate) {
      setSelectedDate(new Date(storedDate));
    }

    const storedStylistId = sessionStorage.getItem("selectedStylistId");
    const stylistId = parseInt(storedStylistId, 10);
    if (stylistId) {
      const stylist = stylists.find((s) => s.id === stylistId);
      if (stylist) {
        setSelectedStylist(stylist.fullname);
      }
    }
  }, [salonLocations, services, stylists, timeSlots]);

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchUserData = async () => {
    try {
      const response = await api.get("customer/profile");
      const data = response.data.result;
      if (data) {
        setUserInfo(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleBookNow = async () => {
    const customerId = userInfo.accountid;

    const storedBranchId = sessionStorage.getItem("selectedBranchId");
    const branchId = parseInt(storedBranchId, 10);

    const storedServices = sessionStorage.getItem("selectedServicesId");
    const serviceIds = JSON.parse(storedServices);

    const storedStylist = sessionStorage.getItem("selectedStylistId");
    const stylistId = JSON.parse(storedStylist);

    const storedDate = sessionStorage.getItem("selectedDate");
    const date = new Date(storedDate);

    const storeSlotId = sessionStorage.getItem("selectedTimeId");
    const slotId = parseInt(storeSlotId, 10);

    const bookingValue = {
      salonId: branchId,
      serviceId: serviceIds,
      stylistId: stylistId,
      customerId: customerId,
      slotId: slotId,
      bookingDate: formatDateForInput(date),
      voucherId: null,
    };

    try {
      const response = await api.post("booking", bookingValue);
      if (response.data && response.data.result) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }

    sessionStorage.removeItem("selectedBranchId");
    sessionStorage.removeItem("selectedServicesId");
    sessionStorage.removeItem("selectedTimeId");
    sessionStorage.removeItem("selectedDate");
    sessionStorage.removeItem("selectedStylistId");
  };

  const formatDate = (date) => {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${dayOfWeek} (${day}/${month}/${year})`;
  };

  const handleCancle = () => {
    sessionStorage.removeItem("selectedBranchId");
    sessionStorage.removeItem("selectedServicesId");
    sessionStorage.removeItem("selectedTimeId");
    sessionStorage.removeItem("selectedDate");
    sessionStorage.removeItem("selectedStylistId");
  };

  const formattedDate = selectedDate ? formatDate(selectedDate) : "";

  return (
    <div className="booking">
      <div className="booking__container">
        <form className="booking__form">
          <div className="booking__form-header">
            <Link to="/booking/step1">
              <FaArrowLeft className="booking-icon" />
            </Link>
            <h1>Book a Reservation</h1>
          </div>

          <div className="booking__form-item">
            <label>Salon</label>
            <div className="form-input">
              <CiHome className="form-icon" />
              <input
                type="text"
                placeholder="View All Salons"
                defaultValue={selectedBranch}
                readOnly
              />
            </div>
            <Outlet />
          </div>

          <div className="booking__form-item">
            <label>Select Service</label>
            <div className="form-input">
              <PiScissors className="form-icon" />
              <textarea
                placeholder="View all attractive services"
                defaultValue={selectedServices
                  .map((service) => `● ${service}`)
                  .join("\n")}
                readOnly
              />
            </div>
          </div>

          <div className="booking__form-item">
            <label>Date</label>
            <div className="form-input">
              <RiCalendarScheduleLine className="form-icon" />
              <input
                type="text"
                placeholder="View Selected Date"
                defaultValue={formattedDate}
                readOnly
              />
            </div>
          </div>

          <div className="booking__form-item">
            <label>Time</label>
            <div className="form-input">
              <RiTimeLine className="form-icon" />
              <input
                type="text"
                placeholder="View Selected Time"
                defaultValue={selectedTime}
                readOnly
              />
            </div>
          </div>

          <div className="booking__form-item">
            <label>Select Stylist</label>
            <div className="form-input">
              <SlPeople className="form-icon" />
              <input
                type="text"
                placeholder="View All Stylists"
                defaultValue={selectedStylist}
                readOnly
              />
            </div>
          </div>
          <div className="booking__button-group">
            <Link
              to="/"
              className="booking__container-btn btn flex"
              onClick={handleCancle}
            >
              Cancel
            </Link>
            <Link
              to="/"
              className="booking__container-btn btn flex"
              onClick={handleBookNow}
            >
              Book Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
