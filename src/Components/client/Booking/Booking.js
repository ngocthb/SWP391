import { CiHome } from "react-icons/ci";
import { PiScissors } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import "./Booking.scss";
import { useEffect, useState } from "react";
import { salonLocations, services, timeSlots, stylists } from "../../../data/booking";
import { RiTimeLine } from "react-icons/ri";

export default function Booking() {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState('');

  useEffect(() => {
    const storedBranchId = localStorage.getItem("selectedBranchId");
    if (storedBranchId) {
      const branch = salonLocations.find((b) => b.id === storedBranchId);
      if (branch) {
        setSelectedBranch(branch.first_name);
      }
    }
  }, []);

  useEffect(() => {
    const storedServices = localStorage.getItem("selectedServicesId");
    if (storedServices) {
      const serviceIds = JSON.parse(storedServices);
      const selected = services.filter(service => serviceIds.includes(service.id));
      setSelectedServices(selected.map(item => item.bio));
    }
  }, []);

  useEffect(() => {
    const storedTimeId = localStorage.getItem("selectedTimeId");
    const storedDate = localStorage.getItem("selectedDate");

    if (storedTimeId) {
      const timeId = parseInt(storedTimeId, 10);
      if (timeId) {
        const time = timeSlots.find((t) => t.id === timeId);
        if (time) {
          setSelectedTime(time.time);
        }
      }
    }

    if (storedDate) {
      setSelectedDate(new Date(storedDate));
    }
  }, []);

  useEffect(() => {
    const storedStylishId = localStorage.getItem("selectedStylishId");
    const stylishId = parseInt(storedStylishId, 10);
    if (stylishId) {
      const stylish = stylists.find((s) => s.id === stylishId);
      if (stylish) {
        setSelectedStylist(stylish.name);
      }
    }
  }, []);

  const formattedDate = selectedDate ? selectedDate.toLocaleDateString('en-US') : '';

  const handleBookNow = () => {
    localStorage.removeItem("selectedBranchId");
    localStorage.removeItem("selectedServicesId");
    localStorage.removeItem("selectedTimeId");
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("selectedStylishId");
  }

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
                defaultValue={selectedServices.map(service => `● ${service}`).join('\n')}
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
              <RiTimeLine className="form-icon"/>
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

          <Link
            to="/"
            className="booking__container-btn btn flex"
            onClick={handleBookNow}
          >
            Book Now
          </Link>
        </form>
      </div>
    </div>
  );
}
