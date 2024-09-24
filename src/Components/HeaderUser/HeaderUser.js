/* eslint-disable jsx-a11y/anchor-is-valid */
import "./HeaderUser.scss";
import { IoIosAperture } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { useState } from "react";
import DropdownNav from "../../redux/dropdow.js";
import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { Dropdown, Space } from "antd";
import notis from "../../data/notification.js";
import loginUser from "../../data/loginUser.js";

export default function HeaderUser() {
  const [active, setActive] = useState("HeaderUser");

  //Code to show(toggle) HeaderUser
  const showNav = () => {
    setActive("HeaderUser HeaderUser-active");
  };

  // Code to remove HeaderUser
  const removeNav = () => {
    setActive("HeaderUser");
  };

  // Code to add background color to header
  // const [transparent, setTransparent] = useState("HeaderUserSection__header");
  // const addBg = () => {
  //   if (window.scrollY >= 10) {
  //     setTransparent("HeaderUserSection__header HeaderUserSection__header-active");
  //   } else {
  //     setTransparent("HeaderUserSection__header");
  //   }
  // };
  // window.addEventListener("scroll", addBg);

  return (
    <section className="HeaderUserSection">
      <div className="HeaderUserSection__header">
        <div className="HeaderUserSection__header-logo">
          <Link to={""}>
            <h1 className="flex">
              <IoIosAperture />
              F-Salon
            </h1>
          </Link>
        </div>

        <div className={active}>
          <ul className="HeaderUser__lists flex">
            <li className="HeaderUser__lists-items">
              <Link to={""}>About Us</Link>
            </li>
            <li className="HeaderUser__lists-items">
              <DropdownNav title="Service" />
            </li>
            <li className="HeaderUser__lists-items">
              <Link to={""}>Upcoming Package</Link>
            </li>
            <div className="HeaderUser__lists-infor flex">
              <div className="content">
                <div className="content__noti">
                  <Dropdown
                    menu={{
                      notis,
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <IoIosNotifications className="icon" />
                      </Space>
                    </a>
                  </Dropdown>
                </div>

                <div className="content__infor">
                  <div>
                    <h3>{loginUser.name}</h3>
                    <p>{loginUser.role}</p>
                  </div>
                  <div>
                    <img src={loginUser.avatar} alt="User-Avatar" />
                  </div>
                </div>
              </div>
            </div>
          </ul>
          <div onClick={removeNav} className="HeaderUser__close">
            <IoCloseCircleSharp className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="HeaderUser__toggle">
          <CiGrid41 className="icon" />
          <img src={loginUser.avatar} alt="User-Avatar" />
        </div>
      </div>
    </section>
  );
}