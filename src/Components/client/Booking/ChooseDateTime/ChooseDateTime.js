import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { LuCalendarSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiHome } from "react-icons/ci";
import { PiScissors } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";
import "./ChooseDateTime.scss";

const timeSlots = [
  { id: 1, time: "19h00" },
  { id: 2, time: "19h20" },
  { id: 3, time: "19h40" },
  { id: 4, time: "20h00" },
  { id: 5, time: "20h20" },
  { id: 6, time: "20h40" },
  { id: 7, time: "21h00" },
  { id: 8, time: "21h20" },
  { id: 9, time: "21h40" },
  { id: 10, time: "22h00" },
  { id: 11, time: "22h20" },
  { id: 12, time: "22h40" },
  { id: 13, time: "23h00" },
  { id: 14, time: "23h20" },
  { id: 15, time: "23h40" },
  { id: 16, time: "00h00" },
  { id: 17, time: "00h20" },
  { id: 18, time: "00h40" },
  { id: 19, time: "01h00" },
  { id: 20, time: "01h20" },
  { id: 21, time: "01h40" },
  { id: 22, time: "02h00" },
  { id: 23, time: "02h20" },
  { id: 24, time: "02h40" },
  { id: 25, time: "03h00" },
  { id: 26, time: "03h20" },
  { id: 27, time: "03h40" },
  { id: 28, time: "04h00" },
  { id: 29, time: "04h20" },
  { id: 30, time: "04h40" },
  { id: 31, time: "05h00" },
  { id: 32, time: "05h20" },
  { id: 33, time: "05h40" },
  { id: 34, time: "06h00" },
  { id: 35, time: "06h20" },
  { id: 36, time: "06h40" },
  { id: 37, time: "07h00" },
  { id: 38, time: "07h20" },
  { id: 39, time: "07h40" },
  { id: 40, time: "08h00" },
];

export default function ChooseDateTime() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today); // State for the selected date

  useEffect(() => {
    // Retrieve the selected time and date from localStorage on mount
    const storedTimeId = localStorage.getItem("selectedTimeId");
    const storedDate = localStorage.getItem("selectedDate");
    
    if (storedTimeId) {
      setSelectedTime(Number(storedTimeId)); // Parse to number
    }
    if (storedDate) {
      setSelectedDate(new Date(storedDate)); // Parse stored date
    }
  }, []);

  const handleTimeSlotClick = (slotId) => {
    setSelectedTime(slotId);
  };

  const handleDateChange = (e) => {
    const selectedOption = e.target.value;
    const date = selectedOption === "today" ? today : tomorrow;
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${dayOfWeek} (${day}/${month})`;
  };

  const isSelectedTime = !!localStorage.getItem("selectedTimeId");

  return (
    <div className="chooseDateTime">
      <div className="chooseDateTime__tagNavigation">
        <ul className="chooseDateTime__tagNavigation--item">
          <li className="chooseDateTime__tagNavigation--item-content">
            <Link to="/booking/step1">
              <div className="filled"></div>
              <CiHome />
            </Link>
            <div className="tooltip">Salon</div>
          </li>
          <li className="chooseDateTime__tagNavigation--item-content">
            <Link to="/booking/step2">
              <div className="filled"></div>
              <PiScissors />
            </Link>
            <div className="tooltip">Service</div>
          </li>
          <li className="chooseDateTime__tagNavigation--item-content active">
            <Link to="/booking/step3">
              <div className="filled"></div>
              <RiCalendarScheduleLine />
            </Link>
            <div className="tooltip">Time</div>
          </li>
          {isSelectedTime ? (
            <li className="chooseDateTime__tagNavigation--item-content">
              <Link to="/booking/step4">
                <div className="filled"></div>
                <SlPeople />
              </Link>
              <div className="tooltip">Stylist</div>
            </li>
          ) : (
            <li className="chooseDateTime__tagNavigation--item-content disable">
              <Link to="/booking/step3">
                <div className="filled"></div>
                <SlPeople />
              </Link>
              <div className="tooltip">Stylist</div>
            </li>
          )}
        </ul>
      </div>

      <div className="chooseDateTime__container">
        <div className="chooseDateTime__container-header">
          <Link to="/booking/step2">
            <FaArrowLeft className="chooseDateTime-icon" />
          </Link>
          <h1>Choose Date & Time</h1>
        </div>
        <div className="chooseDateTime__container-date">
          <LuCalendarSearch className="select-icon" />
          <select onChange={handleDateChange}>
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
            >
              {slot.time}
            </div>
          ))}
        </div>
        <Link
          to="/booking/step4"
          className={`chooseDateTime__container-btn btn flex ${!!selectedTime ? "" : "btn-disable"}`}
          onClick={(e) => {
            if (!selectedTime) {
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
