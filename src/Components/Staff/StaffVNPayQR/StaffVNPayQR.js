import React from "react";
import "./StaffVNPayQR.scss";
import { QRCode, Space } from "antd";
import { useLocation } from "react-router-dom";

const StaffVNPayQR = () => {
    const location = useLocation();
    const { paymentUrl, bookingId, totalAmount } = location.state || {}; 
    const formatPrice = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    

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
