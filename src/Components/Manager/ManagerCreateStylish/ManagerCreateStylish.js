import React from "react";
import "./ManagerCreateStylish.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ManagerCreateStylish = () => {
  return (
    <div className="manager-create-stylish">
      <h2 className="manager-create-stylish__header">Basic Information</h2>
      <div className="manager-create-stylish__avatar-section">
        <div className="manager-create-stylish__avatar">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="manager-create-stylish__avatar-info">
          <h3 className="manager-create-stylish__avatar-title">
            Change Avatar
          </h3>
          <p className="manager-create-stylish__avatar-description">
            Recommended Dimensions: 120x120 Max file size: 5MB
          </p>
          <button className="manager-create-stylish__upload-btn">Upload</button>
        </div>
      </div>
      <div className="manager-create-stylish__form-section">
        <div className="manager-create-stylish__form-grid">
          <div className="manager-create-stylish__form-group manager-create-stylish__form-group--full-width">
            <label htmlFor="fullname" className="manager-create-stylish__label">
              Full Name:
            </label>
            <input
              type="text"
              id="fullname"
              className="manager-create-stylish__input"
              placeholder="Full Name"
            />
          </div>
          <div className="manager-create-stylish__form-group">
            <label htmlFor="email" className="manager-create-stylish__label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="manager-create-stylish__input"
              placeholder="Email"
            />
          </div>
          <div className="manager-create-stylish__form-grid manager-create-stylish__form-grid--half-width">
            <div className="manager-create-stylish__form-group">
              <label htmlFor="dob" className="manager-create-stylish__label">
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                className="manager-create-stylish__input"
                placeholder="Date of Birth"
              />
            </div>
            <div className="manager-create-stylish__form-group">
              <label htmlFor="phone" className="manager-create-stylish__label">
                Phone Number:
              </label>
              <input
                type="text"
                id="phone"
                className="manager-create-stylish__input"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="manager-create-stylish__form-grid manager-create-stylish__form-grid--half-width">
            <div className="manager-create-stylish__form-group">
              <label
                htmlFor="username"
                className="manager-create-stylish__label"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="manager-create-stylish__input"
                placeholder="Username"
              />
            </div>
            <div className="manager-create-stylish__form-group">
              <label
                htmlFor="password"
                className="manager-create-stylish__label"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="manager-create-stylish__input"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="manager-create-stylish__form-grid manager-create-stylish__form-grid--half-width">
            <div className="manager-create-stylish__form-group">
              <label htmlFor="skill" className="manager-create-stylish__label">
                Select Skill:
              </label>
              <select id="skill" className="manager-create-stylish__select">
                <option value="" disabled selected>
                  Select Skill
                </option>
                {/* Add options here */}
              </select>
            </div>
            <div className="manager-create-stylish__form-group">
              <label htmlFor="level" className="manager-create-stylish__label">
                Select Level:
              </label>
              <select id="level" className="manager-create-stylish__select">
                <option value="" disabled selected>
                  Select Level
                </option>
                {/* Add options here */}
              </select>
            </div>
          </div>
          <div className="manager-create-stylish__form-group">
            <label htmlFor="salon" className="manager-create-stylish__label">
              Select Salon:
            </label>
            <select id="salon" className="manager-create-stylish__select">
              <option value="" disabled selected>
                Select Salon
              </option>
              {/* Add options here */}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerCreateStylish;
