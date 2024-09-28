import React, { useState } from "react";
import logo from "../../../Assets/Logo.png";
import logoFold from "../../../Assets/logo-fold.png";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./ManagerHeader.scss";
import { useDispatch, useSelector } from "react-redux";
import { collapse } from "../../../actions/Collapse";
import { Link } from "react-router-dom";

const ManagerHeader = () => {
  const collapsed = useSelector((state) => state.collapseReducer);
  const dispatch = useDispatch();
  const [isDropdownActive, setDropdownActive] = useState(false);

  const toggleDropdown = () => {
    setDropdownActive((prev) => !prev);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    const dropdown = document.querySelector(".header-manager__dropdown");
    if (dropdown && !dropdown.contains(event.target)) {
      setDropdownActive(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header-manager">
      <div className={`header-manager__logo ${collapsed ? "header-manager__logo--collapsed" : ""}`}>
        {collapsed ? (
          <img src={logoFold} alt="Logo Fold" />
        ) : (
          <img src={logo} alt="Logo" />
        )}
      </div>
      <div className="header-manager__nav">
        <div className="header-manager__nav-left">
          <div className="header-manager__collapse" onClick={() => dispatch(collapse())}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            <div className="header-manager__name-page">Stylish</div>
          </div>
        </div>
        <div className="header-manager__nav-right">
          <div className="header-manager__user-info" onClick={toggleDropdown}>
            <div className="header-manager__text">
              <div className="header-manager__name">Nabila A.</div>
              <div className="header-manager__role">Admin</div>
            </div>
            <div className="header-manager__avatar">
              <img
                alt="User avatar"
                src="https://enlink.themenate.net/assets/images/avatars/thumb-3.jpg"
              />
            </div>
          </div>
          {isDropdownActive && (
            <div className="header-manager__dropdown">
              <div className="header-manager__dropdown--header">
                <img
                  height={60}
                  alt="User avatar"
                  src="https://enlink.themenate.net/assets/images/avatars/thumb-3.jpg"
                />
                <div>
                  <h2>Marshall Nichols</h2>
                  <p>UI/UX Designer</p>
                </div>
              </div>
              <Link to="#">
                <i className="fas fa-user"></i>
                Edit Profile
              </Link>
              <Link to="#">
                <i className="fas fa-cog"></i>
                Account Setting
              </Link>
              <Link to="#">
                <i className="fas fa-folder"></i>
                Projects
              </Link>
              <Link to="#">
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ManagerHeader;
