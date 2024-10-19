import React, { useEffect, useRef, useState } from "react";
import "./ForgetPassword.scss";
import api from "../../../config/axios";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(70);
  const [loading, setLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  const resetOtpState = () => {
    setOtp(Array(6).fill(""));
    setTimer(70);
  };

  useEffect(() => {
    if (showOtpModal && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }

    if(timer===0) {
      setShowOtpModal(false);
      resetOtpState();
    }
  }, [showOtpModal, timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = e.target.email.value;
    setEmail(emailValue);
    setLoading(true);

    try {
      const response = await api.post(`verifyEmail/${emailValue}`, { 
        email: emailValue 
      });
      
      if (response.data.code === 1000) {
        setShowOtpModal(true);
        resetOtpState();
      }
    } catch (error) {
      console.error(error);
      messageApi.open({
        type: 'error',
        content: error.response.data.message,
      });
    }finally{
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if not empty
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    setLoadingVerify(true);
    
    try {
      const response = await api.post(`verifyOtp/${email}/${otpCode}`);
      if (response.data.code === 1000) {
        navigate("/login/confirmPassword",{ 
          state: { verified: true, email: email} 
        });
      }
    } catch (error) {
      console.error(error);
      messageApi.open({
        type: 'error',
        content: error.response.data.message,
      });
    }finally{
      setLoadingVerify(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
    {contextHolder}
      <div className="forget-password__container">
        <div className="forget-password__left-side">
          <div className="forget-password__logo">
            <h2>Logo</h2>
            <img src="arrow.svg" alt="Arrow" />
          </div>
          <div className="forget-password__illustration">
            <img
              src="https://myxteam.vn/wp-content/uploads/2020/08/10.-5-Quy-tri%CC%80nh-thu%CC%9B%CC%A3c-hie%CC%A3%CC%82n-qua%CC%89n-ly%CC%81-du%CC%9B%CC%A3-a%CC%81n-da%CC%82%CC%80u-tu%CC%9B-xa%CC%82y-du%CC%9B%CC%A3ng.png"
              alt="Illustration"
            />
          </div>
          <div className="forget-password__title">
            <h3>Title</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
        </div>
        <div className="forget-password__right-side">
          <h1>Forget Password</h1>
          <form className="forget-password__form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" required id="email" />
            <div className="forget-password__flex-box">
              <button type="submit" className="forget-password__log-in-button" disabled={loading}>
                {loading ? <Spin size="small" /> : "CONTINUE"} 
              </button>
            </div>
          </form>
        </div>
      </div>

      {showOtpModal && (
      <div className="otp-modal">
        <div
          className="otp-backdrop"
          onClick={() => setShowOtpModal(false)}
        />
        <div className="otp-container">
          <form className="otp-form" onSubmit={handleClick}>
            <h2 className="otp-form__title">OTP</h2>
            <h3 className="otp-form__subtitle">Verification Code</h3>
            <p className="otp-form__message">
              We have sent a verification code to your email.
            </p>
            <p className="otp-form__timer">
              Time remaining: {formatTime(timer)}
            </p>
            <div className="otp-form__inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  className="otp-form__input"
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>
            <button className="otp-form__submit" type="submit" disabled={(timer === 0) || (loadingVerify)}>
              {loadingVerify ? <Spin size="small" /> : "Verify me"} 
            </button>
          </form>
        </div>
      </div>
    )}
    </>
  );
};

export default ForgetPassword;
