/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./AdminCustomer.scss";
import api from "../../../config/axios";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../../actions/Update";
import loginUser from "../../../data/loginUser";
import uploadFile from "../../../utils/upload";

const AdminVoucher = ({ buttonLabel }) => {
  const [customers, setCustomers] = useState([]);
  const [originalCustomers, setOriginalCustomers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isUpdate = useSelector(state => state.updateCustomerReducer);
  const [formData, setFormData] = useState({
    accountid: 0,
    fullname: "",
    email: "",
    dob: "",
    phone: "",
    image: loginUser.avatar,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileObject, setSelectedFileObject] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
     
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
      setSelectedFileObject(file);
    }
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("customers");
        const data = response.data; /*.result*/

        if (data) {
          setCustomers(data);
          setOriginalCustomers(data);
        }
      } catch (error) {}
    };

    fetchCustomers();
  }, [isUpdate]);

  const fetchCustomerData = async (accountid) => {
    try {
      const response = await api.get(`customers/${accountid}`);
      const data = response.data; /*.result*/

      if (data) {
        setFormData((prev) => ({
          ...prev,
          accountid: accountid,
          fullname: data.fullname || "",
          email: data.email || "",
          dob: data.dob || "",
          phone: data.phone || 0,
          image: data.image || prev.image,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    if (isModalOpen) {
      if (formData.accountid) {
        fetchCustomerData(formData.accountid);
      }
    }
  }, [isModalOpen]);

  const updateCustomerData = async (e) => {
    e.preventDefault();
    const updateValues = {
      accountid: formData.accountid,
      fullname: e.target[1].value,
      email: e.target[2].value,
      phone: e.target[3].value,
      dob: e.target[4].value,
      image: null,
    };

    if (selectedFileObject) {
      const firebaseResponse = await uploadFile(selectedFileObject);
      updateValues.image = firebaseResponse;
    } else {
      updateValues.image = formData.image;
    }   

    setLoading(true);
    try {
      const response = await api.put(
        `customers/${formData.accountid}`,
        updateValues
      );
      const data = response.data/*.result*/;

      if (data) {

        setFormData((prev) => ({
          ...prev,
          fullname: data.fullname || "",
          email: data.email || "",
          dob: data.dob ? formatDateForInput(data.dob) : "",
          phone: data.phone || "",
          avatarFile: selectedFile || prev.avatarFile,
        }));
         dispatch(updateCustomer());
        toggleModal();
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const formatDateString = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const sortBy = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else if (sortConfig.direction === "descending") {
        direction = null;
      }
    }

    setSortConfig({ key, direction });

    let sortedVouchers;

    if (direction === null) {
      sortedVouchers = [...originalCustomers];
    } else {
      sortedVouchers = [...customers].sort((a, b) => {
        if (key === "discountAmount") {
          return direction === "ascending"
            ? parseFloat(a[key]) - parseFloat(b[key])
            : parseFloat(b[key]) - parseFloat(a[key]);
        }
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    setCustomers(sortedVouchers);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") return " ▲";
      if (sortConfig.direction === "descending") return " ▼";
    }
    return "";
  };

  const createVoucher = () => {
    navigate("/admin/voucher/create");
  };

  const toggleModal = async (accountId) => {
    if (accountId) {
      await fetchCustomerData(accountId);
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (e) => {
    updateCustomerData(e)
  };

  return (
    <>
      <div className="admin-customer">
        <div className="admin-customer__header">
          <div className="admin-customer__header-searchBar">
            <BiSearchAlt className="searchBar-icon" />
            {/* <i class="fas fa-search"></i> */}
            <input placeholder="Search here..." type="text" />
          </div>
          <div className="admin-customer__header-filter">
            <select>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
            <button onClick={createVoucher}> {buttonLabel}</button>
          </div>
        </div>
        <div className="admin-customer__container">
          <div className="admin-customer__content">
            <table className="admin-customer__table">
              <thead>
                <tr>
                  <th onClick={() => sortBy("id")}>
                    ID{getSortIndicator("id")}
                  </th>
                  <th onClick={() => sortBy("fullname")}>
                  Full Name{getSortIndicator("fullname")}
                  </th>
                  <th onClick={() => sortBy("email")}>
                  Email{getSortIndicator("email")}
                  </th>
                  <th onClick={() => sortBy("dob")}>
                    Date of Birth{getSortIndicator("dob")}
                  </th>
                  <th onClick={() => sortBy("phone")}>
                  Phone{getSortIndicator("phone")}
                  </th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.accountid}>
                    <td className="admin-customer__id">{customer.accountid}</td>
                    <td>
                    <div className="manager-booking__customer">
                      <img src={customer.image || formData.image} alt={customer.fullname} className="manager-booking__customer-image" />
                      <span className="manager-booking__customer-name">{customer.fullname}</span>
                    </div>
                    </td>
                    <td className="admin-customer__date">
                      {customer.email}
                    </td>
                    <td className="admin-customer__discountAmount">
                      {formatDateString(customer.dob)}
                    </td>
                    <td>
                      <span
                        className={`admin-customer__quantity`}
                      >
                        {customer.phone}
                      </span>
                    </td>
                    <td className="admin-customer__actions">
                      <button
                        className="admin-customer__action-button"
                        onClick={() => toggleModal(customer.accountid)}
                      >
                        ✎
                      </button>
                      <button className="manager-booking__action-button">🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="admin-customer-backdrop" onClick={toggleModal}>
            <div className="admin-customer-modal" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSubmit}>
                <h2 className="admin-customer-modal__header">Update admin-customer</h2>
                <div className="admin-customer-modal__avatar-section">
                  <div className="admin-customer-modal__avatar">
                    <img src={selectedFile || formData.image} alt={formData.fullname} />
                  </div>
                  <div className="admin-customer-modal__avatar-info">
                    <h3 className="admin-customer-modal__avatar-title">
                      Change Avatar
                    </h3>
                    <p className="admin-customer-modal__avatar-description">
                      Recommended Dimensions: 120x120 Max file size: 5MB
                    </p>
                    <label className="admin-customer-modal__upload-btn">
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
                <div className="admin-customer-modal__form-section">
                  <div className="admin-customer-modal__form-grid">
                    <div className="admin-customer-modal__form-group admin-customer-modal__form-group--full-width">
                      <label
                        htmlFor="fullname"
                        className="admin-customer-modal__label"
                      >
                        Full Name:
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        className="admin-customer-modal__input"
                        placeholder="Full Name"
                        defaultValue={formData.fullname}
                      />
                    </div>
                    <div className="admin-customer-modal__form-group admin-customer-modal__form-group--full-width">
                      <label htmlFor="email" className="admin-customer-modal__label">
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="admin-customer-modal__input"
                        placeholder="Email"
                        defaultValue={formData.email}
                      />
                    </div>
                    <div className="admin-customer-modal__form-group">
                      <label htmlFor="phone" className="admin-customer-modal__label">
                        Phone:
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="admin-customer-modal__input"
                        placeholder="Phone"
                        defaultValue={formData.phone}
                      />
                    </div>
                    <div className="admin-customer-modal__form-group">
                      <label htmlFor="dob" className="admin-customer-modal__label">
                        Date of Birth:
                      </label>
                      <input
                        type="date"
                        id="dob"
                        className="admin-customer-modal__input"
                        placeholder="Date of Birth"
                        defaultValue={formData.dob}
                      />
                    </div>
                  </div>
                </div>
                <div className="admin-customer-modal__button-container">
                  <button
                    type="submit"
                    className="admin-customer-modal__button"
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
};

export default AdminVoucher;
