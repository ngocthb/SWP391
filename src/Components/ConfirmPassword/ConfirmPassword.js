import React, { useState } from 'react'
import eyeOff from "../../Assets/eye-off.svg";
import eye from "../../Assets/eye.svg";
import './ConfirmPassword.scss';


const ConfirmPassword = () => {
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
            <div className="confirm-password__container">
                <div className="confirm-password__left-side">
                    <div className="confirm-password__logo">
                        <h2>Logo</h2>
                        <img src="arrow.svg" alt="Arrow" />
                    </div>
                    <div className="confirm-password__illustration">
                        <img
                            src="https://myxteam.vn/wp-content/uploads/2020/08/10.-5-Quy-tri%CC%80nh-thu%CC%9B%CC%A3c-hie%CC%A3%CC%82n-qua%CC%89n-ly%CC%81-du%CC%9B%CC%A3-a%CC%81n-da%CC%82%CC%80u-tu%CC%9B-xa%CC%82y-du%CC%9B%CC%A3ng.png"
                            alt="Illustration"
                        />
                    </div>
                    <div className="confirm-password__title">
                        <h3>Title</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun.
                        </p>
                    </div>
                </div>
                <div className="confirm-password__right-side">
                    <h1>Confirm Password</h1>
                    <form className="confirm-password__form">
                        <label htmlFor="password"> New password</label>
                        <div className="confirm-password__password-input">
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
                        <div className="confirm-password__password-input">
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
                        <div className="confirm-password__flex-box">
                            <button type="submit" className="confirm-password__log-in-button">
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    </>
  )
}

export default ConfirmPassword
