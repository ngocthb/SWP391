import loginUser from "../../../data/loginUser";
import "./UserInfor.scss";

import { FaFire } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
export default function UserInfor() {
  return (
    <>
      <div className="main">
        <div className="profile">
          <div className="profile__left">
            <h1>Your Profile</h1>
            <img
              alt="User-Avata"
              className="profile__left-pic"
              height="100"
              src={loginUser.avatar}
              width="100"
            />
          </div>
          <div className="profile__right">
            <div className="description">
              <div className="description__details">
                <span>Name </span>
                <p>{loginUser.name}</p>
              </div>
              <div className="description__details">
                <span>Phone </span>
                <p>{loginUser.phone}</p>
              </div>
              <div className="description__details">
                <span>Email </span>
                <p>{loginUser.email}</p>
              </div>

              <div className="description__details">
                <span>Birthday </span>
                <p>{loginUser.dob}</p>
              </div>
            </div>
          </div>
          <div className="profile__activity">
            <div>
              <FaFire />
              <p>19</p>
              <p>Service</p>
            </div>
            <div>
              <FaCalendarAlt />
              <p>567</p>
              <p>Days</p>
            </div>
            <div>
              <FaCalendarAlt />
              <p>567</p>
              <p>Days</p>
            </div>
            <div>
              <FaCalendarAlt />
              <p>567</p>
              <p>Days</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
