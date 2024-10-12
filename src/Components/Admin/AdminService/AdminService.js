/* eslint-disable react-hooks/exhaustive-deps */
import "./AdminService.scss";
import { React, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { HiTrash } from "react-icons/hi2";
import { FaUserEdit } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { Spin } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import service from "../../../data/service";
import uploadFile from "../../../utils/upload";
import { useDispatch, useSelector } from "react-redux";
import { updateService } from "../../../actions/Update";

export default function AdminService() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createService = () => {
    navigate("/admin/service/create");
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceId: 0,
    serviceName: "",
    price: 0,
    description: "",
    duration: "",
    image: service.image,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileObject, setSelectedFileObject] = useState(null);
  const dispatch = useDispatch();
  const isUpdate = useSelector(state => state.updateServiceReducer);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
      setSelectedFileObject(file);
    }
  };

  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const response = await api.get("service");
    const data = response.data.result;

    if (data) {
      setServices(data);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [isUpdate]);

  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };

  const formatDuration = (duration) => {
    const [hours, minutes] = duration.split(":").map(Number);

    if (hours > 0 && minutes > 0) {
      return `${hours}h${minutes}`;
    } else if (hours > 0) {
      return `${hours} hour`;
    } else {
      return `${minutes} minutes`;
    }
  };

  const deleteServiceData = async (serviceId) => {
    try {
      const response = await api.delete(`service/delete/${serviceId}`);
      if (response.data) {
        Swal.fire({
          title: "Deleted!",
          text: "The service has been deleted.",
          icon: "success",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDeleteModal = (serviceId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete this service!",
    }).then(async (result) => {
      console.log(result.isConfirmed);
      if (result.isConfirmed) {
        try {
          await deleteServiceData(serviceId);
          fetchServices();
        } catch (error) {}
      }
    });
  };

  const updateStylistData = async (e) => {
    e.preventDefault();

    const updateValues = {
      serviceName: e.target[1].value,
      price: Number(e.target[2].value),
      duration: e.target[3].value,
      description: e.target[4].value,
      image: null,
    };

    if (selectedFileObject) {
      const firebaseResponse = await uploadFile(selectedFileObject);
      updateValues.image = firebaseResponse;
    } else {
      updateValues.image = formData.image;
    }

    console.log(updateValues);
    setLoading(true);
    try {
      const response = await api.put(
        `service/${formData.serviceId}`,
        updateValues
      );
      const data = response.data.result;

      if (data) {
        setFormData((prev) => ({
          ...prev,
          serviceName: data.id,
          price: data.price,
          description: data.description,
          duration: data.duration,
          image: selectedFileObject || prev.image,
        }));
        dispatch(updateService());
        toggleModal();
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const fetchServiceData = async (serviceId) => {
    try {
      const response = await api.get(`service/${serviceId}`);
      const data = response.data; /*.result*/
      
      if (data) {
  
        setFormData(prev => ({
          ...prev,
          serviceId: serviceId,
          serviceName: data.serviceName,
          price: data.price,
          description: data.description,
          duration: data.duration,
          image: data.image,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      if (formData.serviceId) {
        fetchServiceData(formData.serviceId);
      }
    }
  }, [isModalOpen]);

  const toggleModal = async (serviceId) => {
    if (serviceId) {
      await fetchServiceData(serviceId);
    }
    setIsModalOpen(!isModalOpen);
    setSelectedFile(null);
  };

  const handleSubmit = (e) => {
    updateStylistData(e)
  };

  return (
    <>
      <div className="admin-service">
      <div className="admin-service__content">
        <div className="admin-service__header">
          <div className="admin-service__header-searchBar">
            <BiSearchAlt className="searchBar-icon" />
            <input placeholder="Search here..." type="text" />
          </div>
          <div className="admin-service__header-filter">
            <select>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
            <button onClick={createService}> + New Service</button>
          </div>
        </div>
        <div className="service">
          {(services || []).map((service) => (
            <div key={service.id} className="service__card">
              <div className="service__card-content">
                <img alt="Service Img" src={service.image} />
                <div className="content-info">
                  <h3>{service.serviceName}</h3>
                  <p>Price : {formatCurrency(service.price)}</p>
                  <p>Duration : {formatDuration(service.duration)}</p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(service.description || ""),
                    }}
                  />
                </div>
              </div>
              <div className="service-actions">
                <button
                  className="delete btn"
                  onClick={() => confirmDeleteModal(service.id)}
                >
                  <HiTrash />
                </button>
                <button
                  className="update btn"
                  onClick={() => toggleModal(service.id)}
                >
                  <FaUserEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>

        <div className="admin-service__pagination">
          <p>Showing 1-6 from {services.length} data</p>
          <div className="admin-service__pagination-pages">
            <span>
              <FaAngleLeft className="pagination-icon" />
            </span>
            <span className="active">1</span>
            <span>2</span>
            <span>3</span>
            <span>
              <FaChevronRight className="pagination-icon" />
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="admin-service-backdrop" onClick={toggleModal}>
            <div
              className="admin-service-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit}>
                <h2 className="admin-service-modal__header">Update Service</h2>
                <div className="admin-service-modal__avatar-section">
                  <div className="admin-service-modal__avatar">
                    <img
                      src={selectedFile || formData.image}
                      alt={formData.fullname}
                    />
                  </div>
                  <div className="admin-service-modal__avatar-info">
                    <h3 className="admin-service-modal__avatar-title">
                      Change Avatar
                    </h3>
                    <p className="admin-service-modal__avatar-description">
                      Recommended Dimensions: 120x120 Max file size: 5MB
                    </p>
                    <label className="admin-service-modal__upload-btn">
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
                <div className="admin-service-modal__form-section">
                  <div className="admin-service-modal__form-grid">
                    <div className="admin-service-modal__form-grid admin-service-modal__form-grid--half-width">
                      <div className="admin-service-modal__form-group">
                        <label
                          htmlFor="serviceName"
                          className="admin-service-modal__label"
                        >
                          Service Name:
                        </label>
                        <input
                          type="text"
                          id="serviceName"
                          className="admin-service-modal__input"
                          placeholder="Service Name"
                          defaultValue={formData.serviceName}
                        />
                      </div>
                      <div className="admin-service-modal__form-group">
                        <label
                          htmlFor="price"
                          className="admin-service-modal__label"
                        >
                          Price:
                        </label>
                        <input
                          type="text"
                          id="price"
                          className="admin-service-modal__input"
                          placeholder="Price"
                          defaultValue={formData.price}
                        />
                      </div>
                    </div>
                    <div
                      className="admin-service-modal__form-grid
              admin-service-modal__form-grid--half-width"
                    >
                      <div className="admin-service-modal__form-group">
                        <label
                          htmlFor="duration"
                          className="admin-service-modal__label"
                        >
                          Duration:
                        </label>
                        <input
                          type="text"
                          id="duration"
                          className="admin-service-modal__input"
                          placeholder="Duration"
                          defaultValue={formData.duration}
                        />
                      </div>
                    </div>

                    <div className="admin-service-modal__form-grid">
                      <div className="admin-service-modal__form-group">
                        <label
                          htmlFor="description"
                          className="admin-service-modal__label"
                        >
                          Description:
                        </label>
                        <Editor
                          apiKey="dya5knpqqmhhdeokfh6wz8b93r5ect5nmnnphysh88w5gjvp"
                          init={{
                            plugins: [
                              "anchor",
                              "autolink",
                              "charmap",
                              "codesample",
                              "emoticons",
                              "image",
                              "link",
                              "lists",
                              "media",
                              "searchreplace",
                              "table",
                              "visualblocks",
                              "wordcount",
                              "checklist",
                              "mediaembed",
                              "casechange",
                              "export",
                              "formatpainter",
                              "pageembed",
                              "a11ychecker",
                              "tinymcespellchecker",
                              "permanentpen",
                              "powerpaste",
                              "advtable",
                              "advcode",
                              "editimage",
                              "advtemplate",
                              "ai",
                              "mentions",
                              "tinycomments",
                              "tableofcontents",
                              "footnotes",
                              "mergetags",
                              "autocorrect",
                              "typography",
                              "inlinecss",
                              "markdown",
                            ],
                            toolbar:
                              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                            tinycomments_mode: "embedded",
                            tinycomments_author: "Author name",
                            mergetags_list: [
                              { value: "First.Name", title: "First Name" },
                              { value: "Email", title: "Email" },
                            ],
                            ai_request: (request, respondWith) =>
                              respondWith.string(() =>
                                Promise.reject(
                                  "See docs to implement AI Assistant"
                                )
                              ),
                          }}
                          initialValue={formData.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="admin-service-modal__button-container">
                  <button
                    type="submit"
                    className="admin-service-modal__button"
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
