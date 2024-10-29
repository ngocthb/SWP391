import React, { useEffect, useState } from "react";
import "./AdminCreateManager.scss";
import { Spin } from "antd";
import loginUser from "../../../data/loginUser";
import api from "../../../config/axios";
import { Link, useNavigate } from "react-router-dom";

import { genders } from "../../../data/gender";

const AdminCreateManager = () => {
  const [loading, setLoading] = useState(false);
  const [salonLocations, setSalonLocations] = useState([]);
  const [selectedFileObject, setSelectedFileObject] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    image: loginUser.avatar,
  });
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
      setSelectedFileObject(file);
    }
  };

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const response = await api.get(endpoint);
        if (response.data) {
          setter(response.data.result);
        }
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    };

    fetchData("salon", setSalonLocations);
  }, []);

  const createStylishData = async (e) => {
    e.preventDefault();
    const createValues = {
      fullName: e.target[1].value,
      email: e.target[2].value,
      phone: e.target[3].value,
      dob: e.target[4].value,
      gender: e.target[5].value,
      username: e.target[6].value,
      password: e.target[7].value,
      salonId: Number(e.target[8].value),
      // image: null,
    };

    // if (selectedFileObject) {
    //   const firebaseResponse = await uploadFile(selectedFileObject);
    //   createValues.image = firebaseResponse;
    // } else {
    //   createValues.image = formData.image;
    // }

    setLoading(true);
    try {
      const response = await api.post(`manager`, createValues);
      const data = response.data.result;

      if (data) {
        setFormData((prev) => ({
          ...prev,
          image: selectedFile || prev.image,
        }));
        navigate("/admin/manager");
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    createStylishData(e);
  };

  return (
    <>
      <div className="admin-create-manager__breadcrumb">
        <Link
          to="/admin/manager"
          className="admin-create-manager__breadcrumb-link"
        >
          Manager
        </Link>{" "}
        &gt;
        <span className="admin-create-manager__breadcrumb-current">
          New Manager
        </span>
      </div>
      <div className="admin-create-manager">
        <div className="admin-create-manager__container">
          <form onSubmit={handleSubmit}>
            <h2 className="admin-create-manager__header">New Manager</h2>
            <div className="admin-create-manager__avatar-section">
              <div className="admin-create-manager__avatar">
                <img
                  src={selectedFile || formData.image}
                  alt={formData.fullname}
                />
              </div>
              <div className="admin-create-manager__avatar-info">
                <h3 className="admin-create-manager__avatar-title">
                  Change Avatar
                </h3>
                <p className="admin-create-manager__avatar-description">
                  Recommended Dimensions: 120x120 Max file size: 5MB
                </p>
                <label className="admin-create-manager__upload-btn">
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
            <div className="admin-create-manager__form-section">
              <div className="admin-create-manager__form-grid">
                <div className="admin-create-manager__form-grid admin-create-manager__form-grid--half-width">
                  <div className="admin-create-manager__form-group">
                    <label
                      htmlFor="fullname"
                      className="admin-create-manager__label"
                    >
                      Full Name:
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      className="admin-create-manager__input"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="admin-create-manager__form-group">
                    <label
                      htmlFor="email"
                      className="admin-create-manager__label"
                    >
                      Email:
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="admin-create-manager__input"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div
                  className="admin-create-manager__form-grid
              admin-create-manager__form-grid--half-width"
                >
                  <div className="admin-create-manager__form-group">
                    <label
                      htmlFor="phone"
                      className="admin-create-manager__label"
                    >
                      Phone Number:
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="admin-create-manager__input"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="admin-create-manager__form-grid admin-create-manager__form-grid--half-width">
                    <div className="admin-create-manager__form-group">
                      <label
                        htmlFor="dob"
                        className="admin-create-manager__label"
                      >
                        Date of Birth:
                      </label>
                      <input
                        type="date"
                        id="dob"
                        className="admin-create-manager__input"
                        placeholder="Date of Birth"
                      />
                    </div>
                    <div className="admin-create-manager__form-group">
                      <label
                        htmlFor="gender"
                        className="admin-create-manager__label"
                      >
                        Gender:
                      </label>
                      <select
                        id="gender"
                        className="admin-create-manager__select"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        {genders.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="admin-create-manager__form-grid
                admin-create-manager__form-grid--half-width"
                >
                  <div className="admin-create-manager__form-group">
                    <label
                      htmlFor="username"
                      className="admin-create-manager__label"
                    >
                      Username:
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="admin-create-manager__input"
                      placeholder="Username"
                    />
                  </div>
                  <div className="admin-create-manager__form-group">
                    <label
                      htmlFor="password"
                      className="admin-create-manager__label"
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="admin-create-manager__input"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div
                  className="admin-create-manager__form-grid
                admin-create-manager__form-grid--half-width"
                >
                  <div className="admin-create-manager__form-group admin-create-manager__form-group--full-width">
                    <label
                      htmlFor="salon"
                      className="admin-create-manager__label"
                    >
                      Select Salon:
                    </label>
                    <select
                      id="salon"
                      className="admin-create-manager__select"
                      defaultValue={0}
                    >
                      <option value={0} disabled>
                        Select Salon
                      </option>
                      {salonLocations.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.address}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-create-manager__button-container">
              <button
                type="submit"
                className="admin-create-manager__button"
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

export default AdminCreateManager;
