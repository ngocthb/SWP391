import React from "react";
import { ReactComponent as GoogleIcon } from "../../Assets/GoogleIcon.svg";
import "./ForgetPassword.scss";

const ForgetPassword = () => {
  return (
    <>
      <>
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
                eiusmod tempor incididun.
              </p>
            </div>
          </div>
          <div className="forget-password__right-side">
            <h1>Forget Password</h1>
            <button className="forget-password__button-google">
              <GoogleIcon />
              Sign in with Google
            </button>
            <form className="forget-password__form">
              <label htmlFor="email">Email</label>
              <input type="email" required id="email" />
              <div className="forget-password__flex-box">
                <button
                  type="submit"
                  className="forget-password__log-in-button"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default ForgetPassword;
