import React, { useState } from 'react'
import eyeOff from "../../Assets/eye-off.svg";
import eye from "../../Assets/eye.svg";
import {ReactComponent as GoogleIcon} from '../../Assets/GoogleIcon.svg';
import {Link} from 'react-router-dom';
import './Signup.scss';


const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };


  return (
    <>
      <>
            <div className="signup__container">
                <div className="signup__left-side">
                    <div className="signup__logo">
                        <h2>Logo</h2>
                        <img src="arrow.svg" alt="Arrow" />
                    </div>
                    <div className="signup__illustration">
                        <img
                            src="https://myxteam.vn/wp-content/uploads/2020/08/10.-5-Quy-tri%CC%80nh-thu%CC%9B%CC%A3c-hie%CC%A3%CC%82n-qua%CC%89n-ly%CC%81-du%CC%9B%CC%A3-a%CC%81n-da%CC%82%CC%80u-tu%CC%9B-xa%CC%82y-du%CC%9B%CC%A3ng.png"
                            alt="Illustration"
                        />
                    </div>
                    <div className="signup__title">
                        <h3>Title</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun.
                        </p>
                    </div>
                </div>
                <div className="signup__right-side">
                    <h1>Sign Up</h1>
                    <button className="signup__button-google">
                        <GoogleIcon />
                        Sign in with Google
                    </button>
                    <form className="signup__form">
                        <label htmlFor="email">Email</label>
                        <input type="email" required id="email" />
                        <label htmlFor="userName">User name</label>
                        <input type="text" required id="userName" />
                        <label htmlFor="fullName">Full name</label>
                        <input type="text" required id="fullName" />
                        <label htmlFor="password">Password</label>
                        <div className="signup__password-input">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                required
                            />
                            <img
                                src={passwordVisible ? eyeOff : eye}
                                alt="Eye Icon"
                                onClick={handlePasswordVisibility}
                            />
                        </div>
                        <label htmlFor="passwordConfirm">Confirm password</label>
                        <div className="signup__password-input">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                id="passwordConfirm"
                                required
                            />
                            <img
                                src={confirmPasswordVisible ? eyeOff : eye}
                                alt="Eye Icon"
                                onClick={handleConfirmPasswordVisibility}
                            />
                        </div>
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input type="tel" required id="phoneNumber" />
                        <div className="signup__flex-box">
                            <div className="signup__checkbox">
                                <input type="checkbox" id="remember-me" />
                                <label htmlFor="remember-me">I accept the terms & Condition</label>
                            </div>
                            <button type="submit" className="signup__log-in-button">
                                Sign Up
                            </button>
                        </div>
                        <p className="signup__sign-up">Own an Accoun yet? <Link to='/signin'>SIGN IN</Link></p>
                    </form>
                </div>
            </div>
        </>
    </>
  )
}

export default Signup
