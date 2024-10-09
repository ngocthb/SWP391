import React, { useEffect, useState } from "react";
import "./ManagerCreateStaff.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Spin } from "antd";
import loginUser from "../../../data/loginUser";
import api from "../../../config/axios";
import { Link } from "react-router-dom";

const ManagerCreateStaff = () => {
  const [loading, setLoading] = useState(false);
  const [salonLocations, setSalonLocations] = useState([]);
  const [selectedFileObject, setSelectedFileObject] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    accountid: 0,
    fullname: "",
    email: "",
    salonAddress: "",
    phone: "",
    levelName: "",
    image: loginUser.avatar,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
      setSelectedFileObject(file);
    }
  };

  useEffect(() => {
    const fetchSalonLocations = async () => {
      try {
        const response = await api.get("salon");
        if (response.data /*&& response.data.result*/) {
          setSalonLocations(response.data /*.result*/);
        }
      } catch (error) {}
    };
    fetchSalonLocations();
  }, []);

  return (
    <>
     <div className="manager-create-staff__breadcrumb">
          <Link to="/manager/staff" className="manager-create-staff__breadcrumb-link">Staff</Link> &gt;
          <span className="manager-create-staff__breadcrumb-current">New Staff</span>
        </div>
    <div className="manager-create-staff">
      <div className="manager-create-staff__container">
      <form>
        <h2 className="manager-create-staff__header">New Staff</h2>
        <div className="manager-create-staff__avatar-section">
          <div className="manager-create-staff__avatar">
            <img src={selectedFile || formData.image} alt={formData.fullname} />
          </div>
          <div className="manager-create-staff__avatar-info">
            <h3 className="manager-create-staff__avatar-title">
              Change Avatar
            </h3>
            <p className="manager-create-staff__avatar-description">
              Recommended Dimensions: 120x120 Max file size: 5MB
            </p>
            <label className="manager-create-staff__upload-btn">
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>
        <div className="manager-create-staff__form-section">
          <div className="manager-create-staff__form-grid">
            <div className="manager-create-staff__form-group manager-create-staff__form-group--full-width">
              <label
                htmlFor="fullname"
                className="manager-create-staff__label"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullname"
                className="manager-create-staff__input"
                placeholder="Full Name"
              />
            </div>
            <div className="manager-create-staff__form-group">
              <label htmlFor="email" className="manager-create-staff__label">
                Email:
              </label>
              <input
                type="text"
                id="email"
                className="manager-create-staff__input"
                placeholder="Email"
              />
            </div>
            <div className="manager-create-staff__form-grid manager-create-staff__form-grid--half-width">
              <div className="manager-create-staff__form-group">
                <label htmlFor="dob" className="manager-create-staff__label">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  id="dob"
                  className="manager-create-staff__input"
                  placeholder="Date of Birth"
                />
              </div>
              <div className="manager-create-staff__form-group">
                <label
                  htmlFor="phone"
                  className="manager-create-staff__label"
                >
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phone"
                  className="manager-create-staff__input"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="manager-create-staff__form-group">
              <label
                htmlFor="username"
                className="manager-create-staff__label"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="manager-create-staff__input"
                placeholder="Username"
              />
            </div>
            <div className="manager-create-staff__form-group">
              <label
                htmlFor="password"
                className="manager-create-staff__label"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="manager-create-staff__input"
                placeholder="Password"
              />
            </div>
            <div className="manager-create-staff__form-group">
              <label htmlFor="skill" className="manager-create-staff__label">
                Select Skill:
              </label>
              <select id="skill" className="manager-create-staff__select">
                <option value="" disabled>
                  Select Skill
                </option>
                {/* Add options here */}
              </select>
            </div>
            <div className="manager-create-staff__form-group">
              <label htmlFor="level" className="manager-create-staff__label">
                Select Level:
              </label>
              <select id="level" className="manager-create-staff__select">
                <option value="" disabled>
                  Select Level
                </option>
                {/* Add options here */}
              </select>
            </div>
            <div className="manager-create-staff__form-group manager-create-staff__form-group--full-width">
              <label htmlFor="salon" className="manager-create-staff__label">
                Select Salon:
              </label>
              <select id="salon" className="manager-create-staff__select">
                <option value="" disabled>
                  Select Salon
                </option>
                {salonLocations.map((item) => (
                  <option key={item.id} value={item.address}>
                    {item.address}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="manager-create-staff__button-container">
          <button
            type="submit"
            className="manager-create-staff__button"
            disabled={loading}
          >
            {loading ? <Spin size="small" /> : "Save"}
          </button>
        </div>
      </form>
      </div>
    </div>
    </>
  );
};

export default ManagerCreateStaff;
