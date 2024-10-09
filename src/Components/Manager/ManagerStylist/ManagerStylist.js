/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { React, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { HiTrash } from "react-icons/hi2";
import { FaUserEdit } from "react-icons/fa";
import "./ManagerStylist.scss";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import loginUser from "../../../data/loginUser";
import { useDispatch, useSelector } from "react-redux";
import { message, Spin } from "antd";
import uploadFile from "../../../utils/upload";
import { updateStylist } from "../../../actions/Update";
import Swal from "sweetalert2";

export default function ManagerStylist({ buttonLabel }) {
  const [stylists, setStylists] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [salonLocations, setSalonLocations] = useState([]);
  const [levels, setLevels] = useState([]);
  const [skills, setSkills] = useState([]);
  const [genders, setGenders] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    accountid: 0,
    fullname: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    salonId: 0,
    skillId: [],
    levelId: 0,
    image: loginUser.avatar,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.updateStylistReducer);
  const [selectedFileObject, setSelectedFileObject] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
      setSelectedFileObject(file);
    }
  };

  const handleLevelChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      levelName: value,
    }));
  };

  const handleSalonAddressChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      salonAddress: value,
    }));
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

  useEffect(() => {
    fetchStylistsData();
  }, [isUpdate]);

  const fetchStylistsData = async () => {
    try {
      const response = await api.get(`stylist-read`);
      const data = response.data; /*.result*/
      if (data) {
        setStylists(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStylistData = async (accountid) => {
    try {
      const response = await api.get(`stylist-read?accountid=${accountid}`);
      const data = response.data; /*.result*/
      
      if (data[0]) {
        const foundSalon = salonLocations.find(item => item.address === data[0].salonAddress);
        const salonId = foundSalon ? foundSalon.id : null;
  
        const foundLevel = levels.find(item => item.name === data[0].levelName);
        const levelId = foundLevel ? foundLevel.id : null;
  
        setFormData(prev => ({
          ...prev,
          accountid: accountid,
          fullname: data[0].fullname || "",
          email: data[0].email || "",
          phone: data[0].phone || "",
          dob: data[0].dob || "",
          gender: data[0].gender || "",
          salonId: salonId || 0,
          skillId: data[0].skillId || 0,
          levelId: levelId || 0,
          image: data[0].image || loginUser.avatar,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteStylistData = async (accountid) => {
    try {
      const response = await api.delete(`stylist/${accountid}`);
      return response.data.result;
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDeleteModal = (accountid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      console.log(result.isConfirmed);
      if (result.isConfirmed) {
        try {
          await deleteStylistData(accountid);
          fetchStylistsData();
        } catch (error) {}
      }
    });
  };

  const updateStylishData = async (e) => {
    e.preventDefault();
    const selectedSkillsId = selectedSkills.map(Number);
    const numberOfSkillId = skills.reduce((total, item) => {
      if (item) {
        total++;
      }
      return total;
    }, 0);
    const updateValues = {
      fullName: e.target[1].value,
      email: e.target[2].value,
      phone: e.target[3].value,
      dob: e.target[4].value,
      gender: e.target[5].value,
      skillIds: selectedSkillsId,
      levelId: e.target[5 + numberOfSkillId + 1].value,
      salonId: e.target[5 + numberOfSkillId + 2].value,
      image: null,
    };


    if (selectedFileObject) {
      const firebaseResponse = await uploadFile(selectedFileObject);
      updateValues.image = firebaseResponse;
    } else {
      updateValues.image = formData.avatarFile;
    }

    setLoading(true);
    try {
      const response = await api.put(
        `stylist/${formData.accountid}`,
        updateValues
      );
      const data = response.data.result;

      if (data) {
        const foundSalon = salonLocations.find(item => item.address === data.salonAddress);
        const salonId = foundSalon ? foundSalon.id : null;
  
        const foundLevel = levels.find(item => item.name === data.levelName);
        const levelId = foundLevel ? foundLevel.id : null;

        setFormData((prev) => ({
          ...prev,
          fullname: data.fullname || "",
          email: data.email || "",
          phone: data.phone || "",
          gender: data.gender || "",
          levelId: levelId,
          salonId: salonId,
          avatarFile: selectedFile || prev.avatarFile,
        }));
        dispatch(updateStylist());
        messageApi.success("Stylish information updated successfully!");
        toggleModal();
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      if (formData.accountid) {
        fetchStylistData(formData.accountid);
      }
    }
  }, [isModalOpen]);
  

  const toggleModal = async (accountid) => {
    if (accountid) {
      await fetchStylistData(accountid);
    }
    setIsModalOpen(!isModalOpen);
    setSelectedFile(null);
  };
  

  const createStylist = () => {
    navigate("/manager/stylist/create");
  };

  const handleSubmit = (e) => {
    updateStylishData(e);
  };

  return (
    <>
      {contextHolder}
      <div className="ManagerStylist">
        <div className="ManagerStylist__header">
          <div className="ManagerStylist__header-searchBar">
            <BiSearchAlt className="searchBar-icon" />
            {/* <i class="fas fa-search"></i> */}
            <input placeholder="Search here..." type="text" />
          </div>
          <div className="ManagerStylist__header-filter">
            <select>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
            <button onClick={createStylist}> {buttonLabel}</button>
          </div>
        </div>
        <div className="container">
          {(stylists || []).map((stylist) => (
            <div key={stylist.accountid} className="container__card">
              <img
                alt="ManagerStylist picture"
                height="50"
                src={stylist.image ? stylist.image : loginUser.avatar}
                width="50"
              />
              <h3>{stylist.fullname}</h3>
              <p>
                Level: <b>{stylist.levelName}</b>
              </p>
              <div className="container__card-info">
                <p>
                  <FaLocationDot />
                  {stylist.salonAddress}
                </p>
                <p>
                  <FaPhone /> {stylist.phone}
                </p>
                <p>
                  <IoMail />
                  {stylist.email}
                </p>
              </div>
              <div className="container__card-actions">
                <button
                  className="delete btn"
                  onClick={() => confirmDeleteModal(stylist.accountid)}
                >
                  <HiTrash />
                </button>
                <button
                  className="update btn"
                  onClick={() => toggleModal(stylist.accountid)}
                >
                  <FaUserEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="ManagerStylist__pagination">
          <p>Showing 1-8 from {stylists.length} data</p>
          <div className="ManagerStylist__pagination-pages">
            <span>
              {/* <i class="fas fa-chevron-left"></i> */}
              <FaAngleLeft className="pagination-icon" />
            </span>
            <span className="active">1</span>
            <span>2</span>
            <span>3</span>
            <span>
              {/* <i class="fas fa-chevron-right"></i> */}
              <FaChevronRight className="pagination-icon" />
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="ManagerStylist-backdrop" onClick={toggleModal}>
            <div
              className="ManagerStylist-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit}>
                <h2 className="ManagerStylist-modal__header">
                  Update ManagerStylist
                </h2>
                <div className="ManagerStylist-modal__avatar-section">
                  <div className="ManagerStylist-modal__avatar">
                    <img
                      src={selectedFile || formData.image}
                      alt={formData.fullname}
                    />
                  </div>
                  <div className="ManagerStylist-modal__avatar-info">
                    <h3 className="ManagerStylist-modal__avatar-title">
                      Change Avatar
                    </h3>
                    <p className="ManagerStylist-modal__avatar-description">
                      Recommended Dimensions: 120x120 Max file size: 5MB
                    </p>
                    <label className="ManagerStylist-modal__upload-btn">
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
                <div className="ManagerStylist-modal__form-section">
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
                          defaultValue={formData.fullname}
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
                          defaultValue={formData.email}
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
                          defaultValue={formData.phone}
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
                            defaultValue={formData.dob}
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
                            defaultValue={formData.gender ? formData.gender : ""}
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
                          defaultValue={formData.levelId ? formData.levelId : 0}
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
                          defaultValue={formData.salonId ? formData.salonId : 0}
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
                <div className="ManagerStylist-modal__button-container">
                  <button
                    type="submit"
                    className="ManagerStylist-modal__button"
                    disabled={loading}
                  >
                    {loading ? <Spin size="small" /> : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
