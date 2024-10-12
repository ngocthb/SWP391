import React, { useEffect, useState } from "react";
import "./ManagerCreateStylist.scss";
import { Spin } from "antd";
import loginUser from "../../../data/loginUser";
import api from "../../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../../../utils/upload";

const ManagerCreateStylist = () => {
  const [loading, setLoading] = useState(false);
  const [salonLocations, setSalonLocations] = useState([]);
  const [selectedFileObject, setSelectedFileObject] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [levels, setLevels] = useState([]);
  const [skills, setSkills] = useState([]);
  const [genders, setGenders] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
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
          setter(response.data /*.result*/);
        }
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    };

    fetchData("salons", setSalonLocations);
    fetchData("levels", setLevels);
    fetchData("skills", setSkills);
    fetchData("gender", setGenders);
  }, []);

  const handleSkillToggle = (skillId) => {
    setSelectedSkills((prevSelected) => {
      const newSelected = prevSelected.includes(skillId)
        ? prevSelected.filter((id) => id !== skillId)
        : [...prevSelected, skillId];

      setSelectedSkills(newSelected);
      return newSelected;
    });
  };

  const createStylishData = async (e) => {
    e.preventDefault();
    const selectedSkillsId = selectedSkills.map(Number);
    const createValues = {
      fullName: e.target[1].value,
      email: e.target[2].value,
      phone: e.target[3].value,
      dob: e.target[4].value,
      gender: e.target[5].value,
      username: e.target[6].value,
      password: e.target[7].value,
      skillIds: selectedSkillsId,
      levelId: e.target[9].value,
      salonId: e.target[10].value,
      image: null,
    };

    if (selectedFileObject) {
      const firebaseResponse = await uploadFile(selectedFileObject);
      createValues.image = firebaseResponse;
    } else {
      createValues.image = formData.image;
    }

    setLoading(true);
    try {
      const response = await api.post(`stylist/create`, createValues);
      const data = response.data.result;

      if (data) {
        setFormData((prev) => ({
          ...prev,
          image: selectedFile || prev.image,
        }));
        navigate("/manager/stylist");
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
      <div className="manager-create-stylist__breadcrumb">
        <Link
          to="/manager/stylist"
          className="manager-create-stylist__breadcrumb-link"
        >
          Stylist
        </Link>{" "}
        &gt;
        <span className="manager-create-stylist__breadcrumb-current">
          New Stylish
        </span>
      </div>
      <div className="manager-create-stylist">
        <div className="manager-create-stylist__container">
          <form onSubmit={handleSubmit}>
            <h2 className="manager-create-stylist__header">New Stylish</h2>
            <div className="manager-create-stylist__avatar-section">
              <div className="manager-create-stylist__avatar">
                <img
                  src={selectedFile || formData.image}
                  alt={formData.fullname}
                />
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
                <div className="manager-create-stylist__form-grid manager-create-stylist__form-grid--half-width">
                  <div className="manager-create-stylist__form-group">
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
                    <label
                      htmlFor="email"
                      className="manager-create-stylist__label"
                    >
                      Email:
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="manager-create-stylist__input"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div
                  className="manager-create-stylist__form-grid
              manager-create-stylist__form-grid--half-width"
                >
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
                  <div className="manager-create-stylist__form-grid manager-create-stylist__form-grid--half-width">
                    <div className="manager-create-stylist__form-group">
                      <label
                        htmlFor="dob"
                        className="manager-create-stylist__label"
                      >
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
                        htmlFor="gender"
                        className="manager-create-stylist__label"
                      >
                        Gender:
                      </label>
                      <select
                        id="gender"
                        className="manager-create-stylist__select"
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
                  className="manager-create-stylist__form-grid
                manager-create-stylist__form-grid--half-width"
                >
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
                </div>
                <div
                  className="manager-create-stylist__form-grid
                manager-create-stylist__form-grid--half-width"
                >
                  <div className="manager-create-stylist__form-group">
                    <label
                      htmlFor="skill"
                      className="manager-create-stylist__label"
                    >
                      Select Skill:
                    </label>
                    <div className="manager-create-stylist__skills-list">
                      {skills.map((skill) => (
                        <label
                          key={skill.id}
                          className="manager-create-stylist__option"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSkills.includes(skill.id)}
                            onChange={() => handleSkillToggle(skill.id)}
                            className="manager-create-stylist__checkbox"
                          />
                          <span>{skill.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="manager-create-stylist__form-group">
                    <label
                      htmlFor="level"
                      className="manager-create-stylist__label"
                    >
                      Select Level:
                    </label>
                    <select
                      id="level"
                      className="manager-create-stylist__select"
                      defaultValue={0}
                    >
                      <option value={0} disabled>
                        Select level
                      </option>
                      {levels.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="manager-create-stylist__form-group manager-create-stylist__form-group--full-width">
                    <label
                      htmlFor="salon"
                      className="manager-create-stylist__label"
                    >
                      Select Salon:
                    </label>
                    <select
                      id="salon"
                      className="manager-create-stylist__select"
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
      </div>
    </>
  );
};

export default ManagerCreateStylist;
