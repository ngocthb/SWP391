import React, { useEffect, useState } from "react";
import "./ManagerCreateStylist.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Spin } from "antd";
import loginUser from "../../../data/loginUser";
import api from "../../../config/axios";

const ManagerCreateStylist = () => {
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
    <div className="manager-create-stylist">
      <form>
        <h2 className="manager-create-stylist__header">New Stylish</h2>
        <div className="manager-create-stylist__avatar-section">
          <div className="manager-create-stylist__avatar">
            <img src={selectedFile || formData.image} alt={formData.fullname} />
          </div>
          <div className="manager-create-stylist__avatar-info">
            <h3 className="manager-create-stylist__avatar-title">
              Change Avatar
            </h3>
            <p className="manager-create-stylist__avatar-description">
              Recommended Dimensions: 120x120 Max file size: 5MB
            </p>
            <label className="manager-create-stylist__upload-btn">
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
        <div className="manager-create-stylist__form-section">
          <div className="manager-create-stylist__form-grid">
            <div className="manager-create-stylist__form-group manager-create-stylist__form-group--full-width">
              <label
                htmlFor="fullname"
                className="manager-create-stylist__label"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullname"
                className="manager-create-stylist__input"
                placeholder="Full Name"
              />
            </div>
            <div className="manager-create-stylist__form-group">
              <label htmlFor="email" className="manager-create-stylist__label">
                Email:
              </label>
              <input
                type="text"
                id="email"
                className="manager-create-stylist__input"
                placeholder="Email"
              />
            </div>
            <div className="manager-create-stylist__form-grid manager-create-stylist__form-grid--half-width">
              <div className="manager-create-stylist__form-group">
                <label htmlFor="dob" className="manager-create-stylist__label">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  id="dob"
                  className="manager-create-stylist__input"
                  placeholder="Date of Birth"
                />
              </div>
              <div className="manager-create-stylist__form-group">
                <label
                  htmlFor="phone"
                  className="manager-create-stylist__label"
                >
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phone"
                  className="manager-create-stylist__input"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="manager-create-stylist__form-group">
              <label
                htmlFor="username"
                className="manager-create-stylist__label"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="manager-create-stylist__input"
                placeholder="Username"
              />
            </div>
            <div className="manager-create-stylist__form-group">
              <label
                htmlFor="password"
                className="manager-create-stylist__label"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="manager-create-stylist__input"
                placeholder="Password"
              />
            </div>
            <div className="manager-create-stylist__form-group">
              <label htmlFor="skill" className="manager-create-stylist__label">
                Select Skill:
              </label>
              <select id="skill" className="manager-create-stylist__select">
                <option value="" disabled selected>
                  Select Skill
                </option>
                {/* Add options here */}
              </select>
            </div>
            <div className="manager-create-stylist__form-group">
              <label htmlFor="level" className="manager-create-stylist__label">
                Select Level:
              </label>
              <select id="level" className="manager-create-stylist__select">
                <option value="" disabled selected>
                  Select Level
                </option>
                {/* Add options here */}
              </select>
            </div>
            <div className="manager-create-stylist__form-group manager-create-stylist__form-group--full-width">
              <label htmlFor="salon" className="manager-create-stylist__label">
                Select Salon:
              </label>
              <select id="salon" className="manager-create-stylist__select">
                <option value="" disabled selected>
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
        <div className="manager-create-stylist__button-container">
          <button
            type="submit"
            className="manager-create-stylist__button"
            disabled={loading}
          >
            {loading ? <Spin size="small" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManagerCreateStylist;
