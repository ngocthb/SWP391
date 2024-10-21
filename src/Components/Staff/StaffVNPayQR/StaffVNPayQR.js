/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./StaffVNPayQR.scss";
import { QRCode, Space } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import Swal from "sweetalert2";

const StaffVNPayQR = () => {
    const location = useLocation();
    const { paymentUrl, bookingId, totalAmount } = location.state || {}; 
    const navigate = useNavigate();
    const formatPrice = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    
      useEffect(() => {
        const checkComplete = async () => {
          try {
            const response = await api.get(`booking/status/${bookingId}`);
            const data = response.data.result;
            if (data && data === "true") {
              const result = await Swal.fire({
                  icon: "success",
                  title: "Payment successfully.",
                  confirmButtonText: "OK",
                  showCancelButton: false,
              });
              if (result.isConfirmed) {
                  navigate("/staff/booking");
              }
          }
          } catch (error) {
            console.error(error);
          }
        };
    
        checkComplete();
    
        const intervalId = setInterval(checkComplete, 2000);
    
        return () => clearInterval(intervalId);
      }, []);


  return (
    <div className="StaffVNPayQR__container">
      <div className="StaffVNPayQR__title">INVOICE PAYMENT:  #{bookingId ? bookingId : ""}!</div>
      <div className="StaffVNPayQR__amount">Payment amount: {totalAmount ? formatPrice(totalAmount) : ""} VND</div>
      <div className="StaffVNPayQR__qr-code">
      <Space>
        <QRCode type="canvas" value={paymentUrl} />
      </Space>
      </div>
    </div>
  );
};

export default StaffVNPayQR;
