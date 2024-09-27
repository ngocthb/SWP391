import { useEffect, useState } from "react";
import loginUser from "../../../data/loginUser";
import "./UserInfor.scss";
import api from "../../../config/axios";
import { FaEdit } from "react-icons/fa";

export default function UserInfor() {
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [fileName, setFileName] = useState("No file chosen");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user"); // Adjust this endpoint as needed
        setUserInfo(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, []);
  // console.log(userInfo);
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("No file chosen");
    }
  };

  const handleSave = () => {
    // Handle save logic here
    console.log({ name, phone, email, birthday });
    onclose(); // Close modal after saving
  };
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <div className="main">
        <div className="profile">
          <div className="profile__left">
            <h1>Your Profile</h1>
            <img
              alt="User-Avatar"
              className="profile__left-pic"
              height="100"
              src={/*userInfo ? userInfo.avatar :*/ loginUser.avatar}
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
                <p>{/*userInfo ? userInfo.name :*/ loginUser.name}</p>
              </div>
              <div className="description__details">
                <span>Phone </span>
                <p>{/*userInfo ? userInfo.phone :*/ loginUser.phone}</p>
              </div>
              <div className="description__details">
                <span>Email </span>
                <p>{/*userInfo ? userInfo.email :*/ loginUser.email}</p>
              </div>
              <div className="description__details">
                <span>Birthday </span>
                <p>{/*userInfo ? userInfo.dob :*/ loginUser.dob}</p>
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
            <div className="profile-modal__body">
              <div className="profile-modal__input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="profile-modal__input-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="profile-modal__input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="profile-modal__input-group">
                <label htmlFor="birthday">Birthday</label>
                <input
                  type="date"
                  id="birthday"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>
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
                <span className="profile-modal__file-path">{fileName}</span>
              </div>
            </div>
            <div className="profile-modal__footer">
              <button
                className="profile-modal__save-button"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
