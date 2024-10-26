/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./ManagerBookingCancel.scss";
import api from "../../../config/axios";
import { BiSearchAlt } from "react-icons/bi";
import { FaAngleLeft, FaChevronRight } from "react-icons/fa";

const ManagerBookingCancel = () => {
  const [bookings, setBookings] = useState([]);
  const [originalBookings, setOriginalBookings] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(today);
  const [manager, setManager] = useState([]);

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChangeFilter = (e) => {
    const date = e.target.value === "today" ? today : tomorrow;
    setSelectedDate(date);
  };

    useEffect(() => {
      const fetchManagerData = async () => {
        try {
          const response = await api.get(`manager/profile`);
          const data = response.data.result;
          if (data) {
            setManager(data);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchManagerData();
    }, []);
  
    useEffect(() => {
      if (manager.salonId !== undefined) {
      const fetchBookings = async (page) => {
        try {
          const response = await api.get(
            `manager/stylists/booking/cancel/${page}/6/${manager.salonId}/${formatDateForInput(selectedDate)}`
          );
         
          const data = response.data.result.content;
          const total = response.data.result.totalPages;
          console.log(data)
          if (data) {
            setBookings(data);
            setOriginalBookings(data);
            setTotalPages(total);
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchBookings(currentPage);
       }
       
    }, [ manager, selectedDate]);
  
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
        if (sortConfig.direction === "ascending") return " ▲";if (sortConfig.direction === "descending") return " ▼";
      }
      return "";
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
  
    const formatTime = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return `${hours.toString().padStart(2, "0")}h${minutes
        .toString()
        .padStart(2, "0")}`;
    };

    const handlePageChange = (page) => {
      if (page >= 0 && page < totalPages) {
        setCurrentPage(page);
      }
    };
  
    return (
      <>
        <div className="manager-booking-cancel">
          <div className="manager-booking-cancel__header">
            <div className="manager-booking-cancel__header-searchBar">
              <BiSearchAlt className="searchBar-icon" />
              {/* <i class="fas fa-search"></i> */}
              <input placeholder="Search here..." type="text" />
            </div>
            <div className="manager-booking-cancel__header-filter">
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
          <div className="manager-booking-cancel__container">
            <div className="manager-booking-cancel__content">
              <table className="manager-booking-cancel__table">
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
                  </tr>
                </thead>
  
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}><td className="manager-booking-cancel__id">{booking.id}</td>
                    <td>
                      <div className="manager-booking-cancel__customer">
                        <span className="manager-booking-cancel__customer-name">
                          {booking.customerName}
                        </span>
                      </div>
                    </td>
                    <td className="manager-booking-cancel__status">
                        {booking.customerPhone}
                      </td>
                    <td className="manager-booking-cancel__discountAmount">
                      {booking.stylistName}
                    </td>
                    <td>
                      <span className={`manager-booking-cancel__quantity`}>
                        {formatDate(booking.date)}
                      </span>
                    </td>
                    <td>
                      <span className={`manager-booking-cancel__quantity`}>
                        {formatTime(booking.time)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {bookings && bookings.length > 0 && (
        <div className="manager-booking-cancel__pagination">
          <div className="manager-booking-cancel__pagination-pages">
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
        )}
      </div>
      </>
    );
  };
  
  export default ManagerBookingCancel;