import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { LuCalendarSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiHome } from "react-icons/ci";
import { PiScissors } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";
import "./ChooseDateTime.scss";
import { timeSlots } from "../../../../data/booking";

export default function ChooseDateTime() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    const storedTimeId = localStorage.getItem("selectedTimeId");
    const storedDate = localStorage.getItem("selectedDate");

    if (storedTimeId) {
      setSelectedTime(Number(storedTimeId));
    }
    if (storedDate) {
      setSelectedDate(new Date(storedDate));
    }
  }, []);

  const handleTimeSlotClick = (slotId) => {
    setSelectedTime(slotId);
  };

  const handleDateChange = (e) => {
    const date = e.target.value === "today" ? today : tomorrow;
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    return `${dayOfWeek} (${day}/${month})`;
  };

  const isSelectedTime = selectedTime !== null;

  return (
    <div className="chooseDateTime">
      <nav className="chooseDateTime__tagNavigation">
        <ul className="chooseDateTime__tagNavigation--item">
          <li className="chooseDateTime__tagNavigation--item-content">
            <Link to="/booking/step1" aria-label="Salon">
              <div className="filled"></div>
              <CiHome />
            </Link>
            <div className="tooltip">Salon</div>
          </li>
          <li className="chooseDateTime__tagNavigation--item-content">
            <Link to="/booking/step2" aria-label="Service">
              <div className="filled"></div>
              <PiScissors />
            </Link>
            <div className="tooltip">Service</div>
          </li>
          <li className="chooseDateTime__tagNavigation--item-content active">
            <Link to="/booking/step3" aria-label="Time">
              <div className="filled"></div>
              <RiCalendarScheduleLine />
            </Link>
            <div className="tooltip">Time</div>
          </li>
          <li className={`chooseDateTime__tagNavigation--item-content ${isSelectedTime ? '' : 'disable'}`}>
            <Link to={isSelectedTime ? "/booking/step4" : "/booking/step3"} aria-label="Stylist">
              <div className="filled"></div>
              <SlPeople />
            </Link>
            <div className="tooltip">Stylist</div>
          </li>
        </ul>
      </nav>

      <div className="chooseDateTime__container">
        <div className="chooseDateTime__container-header">
          <Link to="/booking/step2" aria-label="Back to Service">
            <FaArrowLeft className="chooseDateTime-icon" />
          </Link>
          <h1>Choose Date & Time</h1>
        </div>
        <div className="chooseDateTime__container-date">
          <LuCalendarSearch className="select-icon" />
          <select onChange={handleDateChange} value={selectedDate.toDateString() === today.toDateString() ? "today" : "tomorrow"}>
            <option value="today">Today, {formatDate(today)}</option>
            <option value="tomorrow">Tomorrow, {formatDate(tomorrow)}</option>
          </select>
        </div>
        <div className="chooseDateTime__container-time">
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              className={`time-slot ${selectedTime === slot.id ? "selected" : ""}`}
              onClick={() => handleTimeSlotClick(slot.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTimeSlotClick(slot.id)}
              aria-label={`Select time slot ${slot.time}`}
            >
              {slot.time}
            </div>
          ))}
        </div>
        <Link
          to="/booking/step4"
          className={`chooseDateTime__container-btn btn flex ${isSelectedTime ? "" : "btn-disable"}`}
          onClick={(e) => {
            if (!isSelectedTime) {
              e.preventDefault();
            } else {
              localStorage.setItem('selectedTimeId', selectedTime);
              localStorage.setItem('selectedDate', selectedDate.toISOString());
            }
          }}
        >
          Next Step
          <FaArrowRight className="chooseDateTime-icon" />
        </Link>
      </div>
    </div>
  );
}
