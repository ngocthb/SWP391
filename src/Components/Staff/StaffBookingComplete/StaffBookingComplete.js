/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./StaffBookingComplete.scss";
import api from "../../../config/axios";
import { BiSearchAlt } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import { FaAngleLeft, FaChevronRight } from "react-icons/fa6";
import { Skeleton } from "@mui/material";
import { FolderOutlined } from "@ant-design/icons";

const StaffBookingComplete = () => {
  const [bookings, setBookings] = useState([]);
  const [originalBookings, setOriginalBookings] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(bookings);
  const inputRef = useRef(null);
  const [isStaffLoaded, setIsStaffLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [bookingLoading, setBookingLoading] = useState(false);

  const [staff, setStaff] = useState([]);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChangeFilter = (e) => {
    const date = e.target.value === "today" ? today : tomorrow;
    setSelectedDate(date);
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const response = await api.get(`manager/profile`);
        const data = response.data.result;
        if (data) {
          setStaff(data);
          setIsStaffLoaded(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchManagerData();
  }, []);


  const fetchBookings = async (page) => {
    setBookingLoading(true);
    if (!isStaffLoaded || !staff.salonId) return;
    try {
      const response = await api.get(
        `manager/stylists/booking/complete/${page}/9/${staff.salonId}/${formatDateForInput(selectedDate)}`
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
    }finally{
      setBookingLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };


  useEffect(() => {
    fetchBookings(currentPage);
  }, [ staff, isStaffLoaded, selectedDate, currentPage]);



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


  return (
    <>
      <div className="staff-booking-complete">
        <div className="staff-booking-complete__header">
          <div className="staff-booking-complete__header-searchBar">
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
          <div className="staff-booking-complete__header-filter">
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
        <div className="staff-booking-complete__container">
          <div className="staff-booking-complete__content">
            <table className="staff-booking-complete__table">
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
              {bookingLoading
                  ? [...Array(9)].map((_, index) => (
                      <tr key={index}>
                        <td>
                          <Skeleton width={40} />
                        </td>
                        <td>
                          <Skeleton width={120} />
                        </td>
                        <td>
                          <Skeleton width={100} />
                        </td>
                        <td>
                          <Skeleton width={120} />
                        </td>
                        <td>
                          <Skeleton width={150} />
                        </td>
                        <td>
                          <Skeleton width={80} />
                        </td>
                      </tr>
                    ))
                  : bookings.length === 0 ? (
                    <tr>
                      <td colSpan={7}>
                        <div className="staff-booking-complete__notValid">
                          <FolderOutlined className="notValid--icon" />
                          <p>Currently, there are no complete bookings</p>
                        </div>
                      </td>
                    </tr>
                  ) :
                (bookings &&
                  bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="staff-booking-complete__id">{booking.id}</td>
                      <td>
                        <div className="staff-booking-complete__customer">
                          <span className="staff-booking-complete__customer-name">
                            {booking.customerName}
                          </span>
                        </div>
                      </td>
                      <td className="staff-booking-complete__status">
                        {booking.customerPhone}
                      </td>
                      <td className="staff-booking-complete__discountAmount">
                        {booking.stylistName}
                      </td>
                      <td>
                        <span className={`staff-booking-complete__quantity`}>
                          {formatDate(booking.date)}
                        </span>
                      </td>
                      <td>
                        <span className={`staff-booking-complete__quantity`}>
                          {booking.time ? formatTime(booking.time) : ""}
                        </span>
                      </td>
                    </tr>
                  )))}
              </tbody>
            </table>
          </div>
        </div>
        {bookings && bookings.length > 0 && (
        <div className="staff-booking-complete__pagination">
          <div className="staff-booking-complete__pagination-pages">
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

export default StaffBookingComplete;
