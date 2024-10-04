import { CiHome } from "react-icons/ci";
import { PiScissors } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";
import { FaArrowLeft } from "react-icons/fa6";

import { Link, Outlet } from "react-router-dom";

import "./Booking.scss";

export default function Booking() {
  return (
    <>
      <div className="booking">
        <div className="booking__container">
          <form className="booking__form">
            <div className="booking__form-header">
              <Link to="/">
                <FaArrowLeft className="booking-icon" />
              </Link>
              <h1>Book a reservation </h1>
            </div>
            <div className="booking__form-item">
              <label>Choose a salon</label>
              <div className="form-input">
                <CiHome className="form-icon" />

                <input type="text" placeholder="View All Salons" />
              </div>
              <Outlet />
            </div>

            <div className="booking__form-item">
              <label>Select Service</label>
              <div className="form-input">
                <PiScissors className="form-icon" />

                <input type="text" placeholder="View all attractive services" />
              </div>
            </div>
            <div className="booking__form-item">
              <label>Select Date & Time</label>
              <div className="form-input">
                <RiCalendarScheduleLine className="form-icon" />

                <input type="text" placeholder="View All Salons" />
              </div>
            </div>
            <div className="booking__form-item">
              <label>Select Stylist</label>
              <div className="form-input">
                <SlPeople className="form-icon" />

                <input type="text" placeholder="View All Stylists" />
              </div>
            </div>

            <Link
              to="/booking/step1"
              type="submit"
              className="booking__container-btn btn flex"
            >
              Book Now
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
