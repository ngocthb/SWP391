import { useEffect, useState } from "react";
import loginUser from "../../../data/loginUser";
import "./UserInfor.scss";
import api from "../../../config/axios";
import { FaEdit } from "react-icons/fa";
import { message, Spin } from "antd";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../actions/UpdateUser";

export default function UserInfor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountid: 0,
    fullname: "",
    email: "",
    dob: "",
    phone: "",
    gender: 0,
    fileName: loginUser.avatar,
  });
  const [loading, setLoading] = useState(false);
  const [fileInput, setFileInput] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const formatDateString = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  

  useEffect(() => {
    fetchUserData();
  }, );

  const fetchUserData = async () => {
    try {
      const response = await api.get("customer/profile");
      const data = response.data.result;

      if (data) {
        setFormData({
          accountid: data.accountid,
          fullname: data.fullname || "",
          email: data.email || "",
          dob: data.dob,
          phone: data.phone || "",
          gender: data.gender,
          fileName: data.avatar || loginUser.avatar,
        });
      }
    } catch (err) {
      console.error(err);
      messageApi.open({
        type: 'success',
        content: err.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileInput(e.target.files[0]);
      setFormData({ ...formData, fileName: e.target.files[0].name });
    } else {
      setFileInput(null);
      setFormData({ ...formData, fileName: "No file chosen" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullname = e.target[0].value;
    const phone = e.target[1].value;
    const email = e.target[2].value;
    const dob = e.target[3].value;

    setLoading(true);
    try {
      const updatedUserData = {
        fullname: fullname,
        email: email,
        phone: phone,
        dob: dob,
        // avatar: fileInput ? fileInput.name : undefined,
      };
      console.log(updatedUserData);
      

      const response = await api.put(`customer/${formData.accountid}`, updatedUserData);

      if (response) {
        const userInfo = {
          fullname: fullname,
          role: "user",
          avatar: loginUser.avatar,
        }
        localStorage.setItem("user", JSON.stringify(userInfo));
        fetchUserData();
        toggleModal();
        dispatch(updateUser());
        messageApi.open({
          type: 'success',
          content: response.data.message,
        });
      }
    } catch (error) {
      console.error(error);
      messageApi.open({
        type: 'error',
        content: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
    {contextHolder}
      <div className="main">
        <div className="profile">
          <div className="profile__left">
            <h1>Your Profile</h1>
            <img
              alt="User-Avatar"
              className="profile__left-pic"
              height="100"
              src={formData.fileName}
              width="100"
            />
          </div>
          <div className="profile__right">
            <div className="update-button">
              <button onClick={toggleModal}>
                <FaEdit />
              </button>
            </div>

            <div className="description">
              <div className="description__details">
                <span>Name </span>
                <p>{formData.fullname}</p>
              </div>
              <div className="description__details">
                <span>Phone </span>
                <p>{formData.phone}</p>
              </div>
              <div className="description__details">
                <span>Email </span>
                <p>{formData.email}</p>
              </div>
              <div className="description__details">
                <span>Birthday </span>
                <p>{formData.dob}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="profile-backdrop" onClick={toggleModal} />
          <div className="profile-modal">
            <div className="profile-modal__header">
              <h2>User Details</h2>
            </div>
            <form onSubmit={handleSubmit} className="profile-modal__body">
              <div className="profile-modal__input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  defaultValue={formData.fullname}
                  required
                />
              </div>
              <div className="profile-modal__input-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  defaultValue={formData.phone}
                  required
                />
              </div>
              <div className="profile-modal__input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  defaultValue={formData.email} // Use defaultValue
                  required
                />
              </div>
              <div className="profile-modal__input-group">
                <label htmlFor="birthday">Birthday</label>
                <input
                  type="date"
                  id="birthday"
                  defaultValue={formatDateString(formData.dob)} // Use defaultValue
                  required
                />
              </div>
              {/* <div className="profile-modal__input-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  value={formData.gender} // Use value for controlled input
                  onChange={(e) => setFormData({ ...formData, gender: Number(e.target.value) })}
                >
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                </select>
              </div> */}
              <div className="profile-modal__input-group">
                <label htmlFor="image">Choose File</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  className="profile-modal__choose-file-button"
                  onClick={() => document.getElementById("image").click()}
                >
                  Choose File
                </button>
                <span className="profile-modal__file-name">{formData.fileName}</span>
              </div>
              <div className="profile-modal__footer">
                <button
                  type="submit"
                  className="profile-modal__save-button"
                  disabled={loading}
                >
                  {loading ? <Spin size="small" /> : "Save"} 
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
