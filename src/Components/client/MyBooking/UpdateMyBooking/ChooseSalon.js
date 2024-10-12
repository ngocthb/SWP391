import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

import React, { useState, useEffect, useRef, useContext } from "react";

import api from "../../../../config/axios";
import "./UpdateMyBooking.scss";

import { bookingIdContext } from "../MyBooking";

export function ChooseSalon({ onClose, onNext }) {
  const [searchValue, setSearchValue] = useState("");
  const [salonLocations, setSalonLocations] = useState([]);
  const [searchResults, setSearchResults] = useState(salonLocations);
  const [selectedBranch, setSelectedBranch] = useState(0);
  const inputRef = useRef();
  const bookingId = useContext(bookingIdContext);

  useEffect(() => {
    const fetchSalonLocations = async () => {
      try {
        const response = await api.get("salons");
        if (response.data) {
          //      setSalonLocations(response.data);
          setSalonLocations(response.data.result);
        }
      } catch (error) {}
    };
    fetchSalonLocations();
  }, []);

  useEffect(() => {
    const fetchBooking = async () => {
      const storedBranchId = sessionStorage.getItem("selectedBranchId");
      if (!storedBranchId) {
        try {
          const response = await api.get(
            // `bookingHistory?bookingId=${bookingId}`
            `booking?bookingId=${bookingId}`
          );
          // const data = response.data[0];
          const data = response.data.result;
          if (data) {
            const foundSalon = salonLocations.find(
              (item) => item.address === data.salonName
            );
            const salonId = foundSalon ? foundSalon.id : null;

            if (salonId) {
              setSelectedBranch(salonId);
            }
          }
        } catch (error) {
          console.log("Error fetching booking:", error);
        }
      } else {
        setSelectedBranch(sessionStorage.getItem("selectedBranchId"));
      }
    };
    fetchBooking();
  }, [salonLocations, bookingId]);

  // useEffect(() => {
  //   if (!searchValue.trim()) {
  //     setSearchResults(salonLocations);
  //     return;
  //   }

  //   const fetchSalons = async () => {
  //     try {
  //       const response = await axios.get(`users/search`, {
  //         params: {
  //           q: searchValue,
  //           type: "less",
  //         },
  //       });
  //       if (response.data && response.data.data) {
  //         setSearchResults(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching salons:", error);
  //     }
  //   };

  //   fetchSalons();
  // }, [searchValue]);

  const handleClearSearch = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch.id);
  };
  return (
    <>
      <div className="myBooking__salon">
        <div className="myBooking__salon-header">
          <div onClick={onClose}>
            <FaArrowLeft className="chooseSalon-icon" />
          </div>
          <h1>Choose Salon</h1>
        </div>
        <div className="myBooking__salon-search">
          <IoSearchOutline className="myBooking__salon-icon" />
          <input
            placeholder="Search for salons by address..."
            ref={inputRef}
            value={searchValue}
            onChange={handleSearchChange}
          />
          <IoCloseCircle
            className="myBooking__salon-closeIcon"
            aria-label="Clear search"
            onClick={handleClearSearch}
          />
        </div>

        <div className="myBooking__salon-locations">
          F-salon is available in the following:
        </div>
        <div className="myBooking__salon-lists">
          {salonLocations.map((branch) => (
            <div
              onClick={() => handleBranchSelect(branch)}
              className={`myBooking__salon-single ${
                selectedBranch && selectedBranch === branch.id ? "selected" : ""
              }`}
              key={branch.id}
            >
              {branch.address}
            </div>
          ))}
        </div>
        <button
          className="myBooking__salon-btn flex btn"
          onClick={(e) => {
            onNext();

            if (!selectedBranch) {
              e.preventDefault();
            } else {
              sessionStorage.setItem("selectedBranchId", selectedBranch);
            }
          }}
        >
          Next Step
          <FaArrowRight className="myBooking__salon-icon" />
        </button>
      </div>
    </>
  );
}
