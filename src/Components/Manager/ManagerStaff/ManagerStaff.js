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
import "./ManagerStaff.scss";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import loginUser from "../../../data/loginUser";
import { useDispatch, useSelector } from "react-redux";
import { message, Spin } from "antd";
import uploadFile from "../../../utils/upload";
import { updateStylist } from "../../../actions/Update";
import Swal from "sweetalert2";

export default function ManagerStaff({ buttonLabel }) {
  const [staffs, setStaffs] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [salonLocations, setSalonLocations] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    accountid: 0,
    fullname: "",
    email: "",
    salonAddress: "",
    phone: "",
    levelName: "",
    image: loginUser.avatar,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isUpdate = useSelector(state => state.updateStylistReducer);
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

  useEffect(() => {
    fetchStaffsData();
  }, [isUpdate]);

  const fetchStaffsData = async () => {
    try {
      const response = await api.get(`stylist-read`);
      const data = response.data; /*.result*/

      if (data) {
        setStaffs(data);
      }
    } catch (err) {
      console.error(err);
    }
  };


  const fetchStylistData = async (accountid) => {
    try {
      const response = await api.get(`stylist-read?accountid=${accountid}`);
      const data = response.data; /*.result*/
      if (data) {
        setFormData({
          accountid: accountid,
          fullname: data[0].fullname || "",
          email: data[0].email || "",
          salonAddress: data[0].salonAddress || "",
          phone: data[0].phone || "",
          levelName: data[0].levelName || "",
          image: data[0].image || loginUser.avatar,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteStylistData = async (accountid) => {
    const value = {
      accountid: accountid
    }
    try {
      const response = await api.delete(`stylist-read`, value);
      return response.data;
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
      console.log(result.isConfirmed)
      if (result.isConfirmed) {
        try {
          await deleteStylistData(accountid);
          fetchStaffsData();
        } catch (error) {
        }
      }
    });
  };
  
  const updateStylishData = async (e) => {
    e.preventDefault();
    const updateValues = {
      fullName: e.target[1].value,
      email: e.target[2].value,
      phone: e.target[3].value,
      levelName:  e.target[4].value,
      salonAddress:  e.target[5].value,
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
      
      const response = await api.put(`stylist/read?accountid=${formData.accountid}`, updateValues);
      const data = response.data.result;
      
      if (data) {
        setFormData((prev) => ({
          ...prev,
          fullname: data.fullname || "",
          email: data.email || "",
          phone: data.phone || "",
          levelName:  data.levelName || "",
          salonAddress: data.salonAddress || "",
          avatarFile: selectedFile || prev.avatarFile,
        }));
         dispatch(updateStylist());
        messageApi.success("Stylish information updated successfully!");
        toggleModal();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = (accountid) => {
    if (accountid) {
      fetchStylistData(accountid);
    }
    setIsModalOpen(!isModalOpen);
    setSelectedFile(null);
  };

  const createStaff = () => {
    navigate("/manager/staff/create");
  };

  const handleSubmit = (e) => {
    updateStylishData(e);
  };

  return (
    <>
    {contextHolder}
      <div className="ManagerStaff">
        <div className="ManagerStaff__header">
          <div className="ManagerStaff__header-searchBar">
            <BiSearchAlt className="searchBar-icon" />
            {/* <i class="fas fa-search"></i> */}
            <input placeholder="Search here..." type="text" />
          </div>
          <div className="ManagerStaff__header-filter">
            <select>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
            <button onClick={createStaff}> {buttonLabel}</button>
          </div>
        </div>
        <div className="container">
          {(staffs || []).map((stylist) => (
            <div key={stylist.accountid} className="container__card">
              <img
                alt="ManagerStaff picture"
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
                <button className="delete btn" onClick={() => confirmDeleteModal()}>
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
        <div className="ManagerStaff__pagination">
          <p>Showing 1-8 from {staffs.length} data</p>
          <div className="ManagerStaff__pagination-pages">
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
          <div className="ManagerStaff-backdrop" onClick={toggleModal}>
            <div
              className="ManagerStaff-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit}>
                <h2 className="ManagerStaff-modal__header">
                  Update ManagerStaff
                </h2>
                <div className="ManagerStaff-modal__avatar-section">
                  <div className="ManagerStaff-modal__avatar">
                    <img
                      src={selectedFile || formData.image}
                      alt={formData.fullname}
                    />
                  </div>
                  <div className="ManagerStaff-modal__avatar-info">
                    <h3 className="ManagerStaff-modal__avatar-title">
                      Change Avatar
                    </h3>
                    <p className="ManagerStaff-modal__avatar-description">
                      Recommended Dimensions: 120x120 Max file size: 5MB
                    </p>
                    <label className="ManagerStaff-modal__upload-btn">
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
                <div className="ManagerStaff-modal__form-section">
                  <div className="ManagerStaff-modal__form-grid">
                    <div className="ManagerStaff-modal__form-group ManagerStaff-modal__form-group--full-width">
                      <label
                        htmlFor="fullname"
                        className="ManagerStaff-modal__label"
                      >
                        Full Name:
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        className="ManagerStaff-modal__input"
                        placeholder="Full Name"
                        defaultValue={formData.fullname}
                      />
                    </div>
                    <div className="ManagerStaff-modal__form-group ManagerStaff-modal__form-group--full-width">
                      <label
                        htmlFor="email"
                        className="ManagerStaff-modal__label"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="ManagerStaff-modal__input"
                        placeholder="Email"
                        defaultValue={formData.email}
                      />
                    </div>
                    <div className="ManagerStaff-modal__form-group">
                      <label
                        htmlFor="phone"
                        className="ManagerStaff-modal__label"
                      >
                        Phone:
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="ManagerStaff-modal__input"
                        placeholder="Phone"
                        defaultValue={formData.phone}
                      />
                    </div>
                    <div className="ManagerStaff-modal__form-group">
                      <label
                        htmlFor="levelName"
                        className="ManagerStaff-modal__label"
                      >
                        Level:
                      </label>
                      <select
                        value={formData.levelName}
                        onChange={handleLevelChange}
                        id="levelName"
                        className="ManagerStaff-modal__input"
                      >
                        <option value="" disabled>Select a level</option>
                        <option value="assistan stylist">
                          assistan stylist
                        </option>
                        <option value="master stylist">master stylist</option>
                      </select>
                    </div>
                    <div className="ManagerStaff-modal__form-group ManagerStaff-modal__form-group--full-width">
                      <label
                        htmlFor="salonAddress"
                        className="ManagerStaff-modal__label"
                      >
                        Salon address:
                      </label>
                      <select
                        value={formData.salonAddress}
                        onChange={handleSalonAddressChange}
                        id="salonAddress"
                        className="ManagerStaff-modal__input"
                      >
                        <option value="" disabled>
                          Select a salon
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
                <div className="ManagerStaff-modal__button-container">
                  <button
                    type="submit"
                    className="ManagerStaff-modal__button"
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
