import React, { useState } from "react";

import "./EmployeeSchedule.scss";

export default function EmployeeSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Array of months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Array of days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Function to get the number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the first day of the month
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Functions to render empty days and days of the month
  const renderEmptyDays = (firstDay) => {
    return Array.from({ length: firstDay }, (_, index) => (
      <div key={`empty-${index}`} className="day empty"></div>
    ));
  };

  const renderDaysInMonth = (daysInMonth, month, year) => {
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
      return (
        <div key={day} className={`day ${isToday ? "today" : ""}`}>
          {day}
          <div className="events">
            {/* Depending on the day, you can add logic to display events */}
          </div>
        </div>
      );
    });
  };

  // Function to go to the next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  // Function to go to the previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  // Get current month and year
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  return (
    <>
      <div className="EmployeeSchedule">
        <div class="EmployeeSchedule__container">
          {/* <div class="header">
            <h1>Events</h1>
            <div class="search-bar">
              <input type="text" placeholder="Search here..." />
            </div>
            <div class="user-info">
              <i class="fas fa-bell"></i>
              <i class="fas fa-cog"></i>
              <span class="user-name">Nabila A.</span>
            </div>
          </div> */}
          {/* <div class="EmployeeSchedule__container-calendar"> */}
          <div class="EmployeeSchedule__container-calendar">
            <div class="calendar__header">
              <h2>Calendar</h2>

              <div class="calendar__header-filter">
                <select>
                  <option>{months[month]}</option>
                </select>
                <select>
                  <option>{year}</option>
                </select>
              </div>
            </div>
            <div class="calendar__content">
              <div className="calendar__content-dates">
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="day-details">
                    {day}
                  </div>
                ))}
                {/* Render empty days */}
                {renderEmptyDays(firstDay)}
                {/* Render days of the month */}
                {renderDaysInMonth(daysInMonth, month, year)}
              </div>
            </div>
          </div>
          <div class="schedule">
            <h3>Schedule Details</h3>
            <div class="event">
              <div class="event-icon blue"></div>
              <div class="event-details">
                <h4>Basic Algorithm</h4>
                <p>Algorithm</p>
                <p class="event-time">
                  <i class="far fa-calendar-alt"></i> March 20, 2021{" "}
                  <i class="far fa-clock"></i> 09:00 - 10:00 AM
                </p>
              </div>
            </div>
            <div class="event">
              <div class="event-icon orange"></div>
              <div class="event-details">
                <h4>Basic Art</h4>
                <p>Art</p>
                <p class="event-time">
                  <i class="far fa-calendar-alt"></i> March 20, 2021{" "}
                  <i class="far fa-clock"></i> 09:00 - 10:00 AM
                </p>
              </div>
            </div>
            <div class="event">
              <div class="event-icon purple"></div>
              <div class="event-details">
                <h4>HTML & CSS Class</h4>
                <p>Programming</p>
                <p class="event-time">
                  <i class="far fa-calendar-alt"></i> March 20, 2021{" "}
                  <i class="far fa-clock"></i> 09:00 - 10:00 AM
                </p>
              </div>
            </div>
            <div class="event">
              <div class="event-icon yellow"></div>
              <div class="event-details">
                <h4>Simple Past Tense</h4>
                <p>English</p>
                <p class="event-time">
                  <i class="far fa-calendar-alt"></i> March 20, 2021{" "}
                  <i class="far fa-clock"></i> 09:00 - 10:00 AM
                </p>
              </div>
            </div>
            <div class="view-more">
              <a href="#">View More</a>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
