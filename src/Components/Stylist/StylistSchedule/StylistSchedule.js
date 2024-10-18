import React, { useState } from "react";

import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";

import "./StylistSchedule.scss";

// Fake fetch function to simulate fetching data from an API
function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      // Randomly generate days to highlight (could be replaced with fetched data)
      const daysToHighlight = [14, 19, 25];

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs();

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🔔" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const StylistSchedule = () => {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([14, 19, 25]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // Ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // Abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // Make sure that you are aborting useless requests
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]); // Clear highlighted days while loading
    fetchHighlightedDays(date);
  };

  return (
    <div className="StylistSchedule">
      <div className="StylistSchedule__left">
        <div className="calendar-container">
          <h2>
            Your <span>Calendar</span>
          </h2>
          <div className="schedule">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={initialValue}
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    highlightedDays, // Pass highlightedDays to ServerDay
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className="today-task">
          <h3>
            Today Task <span>(3)</span>
            <i className="fas fa-plus"></i>
          </h3>
          <ul>
            <li>
              <span>Working on Asla Project</span>
              <span>08.00-10.00 AM</span>
            </li>
            <li>
              <span>Team Meeting</span>
              <span>11.00-12.00 AM</span>
            </li>
            <li>
              <span>Doing Research</span>
              <span>13.00-16.00 PM</span>
            </li>
            <li>
              <span>Doing Research</span>
              <span>13.00-16.00 PM</span>
            </li>
            <li>
              <span>Doing Research</span>
              <span>13.00-16.00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="StylistSchedule__right">
        <div className="schedule-details">
          <h2>
            View <span>Details</span>
          </h2>
          <div className="lists-details">
            <div className="details-item">
              <img
                alt="Profile picture of Rachel Patel"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/YOAO4k8ZxmK5KhmydViB5Qd7xLrMAxksWBgXsOdgFzvPD35E.jpg"
                width="50"
              />
              <div className="details-content">
                <div className="details-header">
                  <div>
                    <h3>Rachel Patel</h3>
                    <span>October 9, 2023</span>
                  </div>
                </div>
                <div className="details-text">
                  Couldn't resist buying this watch after seeing it online, and
                  I'm so glad I did. It's even more stunning in person, and the
                  build quality is exceptional. Will definitely be purchasing
                  from this brand again!
                </div>
              </div>
            </div>

            <div className="details-item">
              <img
                alt="Profile picture of Christopher Lee"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/JhDSNTa9YTb5AJJazDANE8CLTfbNDxL0xGmhtQexmkBANcnTA.jpg"
                width="50"
              />
              <div className="details-content">
                <div className="details-header">
                  <div>
                    <h3>Christopher Lee</h3>
                    <span>June 25, 2023</span>
                  </div>
                </div>
                <div className="details-text">
                  Really impressed with the quality and style of this watch.
                  It's exactly what I was looking for – versatile, durable, and
                  looks great with any outfit. Docked half a star because the
                  clasp is a bit tricky to open, but otherwise, it's perfect!
                </div>
              </div>
            </div>

            <div className="details-item">
              <img
                alt="Profile picture of Brian Chen"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/eOdBZ7Wv7BwuQK2hfC1mHo11ReqjeRAtvEhYqJlV0440zwdOB.jpg"
                width="50"
              />
              <div className="details-content">
                <div className="details-header">
                  <div>
                    <h3>Brian Chen</h3>
                    <span>April 15, 2022</span>
                  </div>
                </div>
                <div className="details-text">
                  While this watch has its merits, such as its sleek design and
                  comfortable wear, I found the strap to be somewhat flimsy, and
                  the clasp occasionally difficult to secure. Despite the minor
                  drawbacks, it does keep accurate time.
                </div>
              </div>
            </div>
            <div className="details-item">
              <img
                alt="Profile picture of Brian Chen"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/eOdBZ7Wv7BwuQK2hfC1mHo11ReqjeRAtvEhYqJlV0440zwdOB.jpg"
                width="50"
              />
              <div className="details-content">
                <div className="details-header">
                  <div>
                    <h3>Brian Chen</h3>
                    <span>April 15, 2022</span>
                  </div>
                </div>
                <div className="details-text">
                  While this watch has its merits, such as its sleek design and
                  comfortable wear, I found the strap to be somewhat flimsy, and
                  the clasp occasionally difficult to secure. Despite the minor
                  drawbacks, it does keep accurate time.
                </div>
              </div>
            </div>
            <div className="details-item">
              <img
                alt="Profile picture of Brian Chen"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/eOdBZ7Wv7BwuQK2hfC1mHo11ReqjeRAtvEhYqJlV0440zwdOB.jpg"
                width="50"
              />
              <div className="details-content">
                <div className="details-header">
                  <div>
                    <h3>Brian Chen</h3>
                    <span>April 15, 2022</span>
                  </div>
                </div>
                <div className="details-text">
                  While this watch has its merits, such as its sleek design and
                  comfortable wear, I found the strap to be somewhat flimsy, and
                  the clasp occasionally difficult to secure. Despite the minor
                  drawbacks, it does keep accurate time.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistSchedule;
