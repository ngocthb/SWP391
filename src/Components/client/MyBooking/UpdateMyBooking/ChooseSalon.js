import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

import React, { useState, useEffect, useContext } from "react";

import api from "../../../../config/axios";
import "./UpdateMyBooking.scss";

import { bookingIdContext } from "../MyBooking";

export function ChooseSalon({ onClose, onNext }) {
  const [salonLocations, setSalonLocations] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(0);
  const bookingId = useContext(bookingIdContext);

  useEffect(() => {
    const storedBranchId = sessionStorage.getItem("selectedBranchId");
    if (storedBranchId) {
      const branchId = parseInt(storedBranchId, 10);
      const branch = salonLocations.find((b) => b.id === branchId);
      if (branch) {
        setSelectedBranch(branch);
      }
    }
  }, [salonLocations]);

  useEffect(() => {
    const fetchSalonLocations = async () => {
      try {
        const response = await api.get("salons");
        if (response.data) {
          // setSalonLocations(response.data);
          setSalonLocations(response.data.result);
        }
      } catch (error) {}
    };
    fetchSalonLocations();
  }, []);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get(
          // `bookingHistory?bookingId=${bookingId}`
          `booking/${bookingId}`
        );
        // const data = response.data[0];
        const data = response.data.result;
        console.log(data);
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
    };
    fetchBooking();
  }, [salonLocations, bookingId]);

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

        <div className="myBooking__salon-locations">
          F-salon is available in the following:
        </div>
        <div className="myBooking__salon-lists">
          {(salonLocations || []).map((branch) => (
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
            } else {sessionStorage.setItem("selectedBranchId", selectedBranch);
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