import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import logo from "../../../Assets/logo.png";
import logoFold from "../../../Assets/logo_blue_noBackground.png";
import { collapse } from "../../../actions/Collapse";
import "./ManagerHeader.scss";

const pageNames = {
  "/manager/dashboard": "Dashboard",
  "/manager/stylish": "Stylish",
  "/manager/booking": "Booking",
  "/manager/service": "Service",
};

const ManagerHeader = () => {
  const collapsed = useSelector((state) => state.collapseReducer);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const [pageName, setPageName] = useState("");

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".header-manager__user-info")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setPageName(pageNames[location.pathname] || "");
  }, [location.pathname]);

  const handleCollapse = useCallback(() => {
    dispatch(collapse());
  }, [dispatch]);

  return (
    <header className="header-manager">
      <div
        className={`header-manager__logo ${
          collapsed ? "header-manager__logo--collapsed" : ""
        }`}
      >
        <img
          src={collapsed ? logoFold : logo}
          alt={collapsed ? "Logo Fold" : "Logo"}
        />
      </div>
      <div className="header-manager__nav">
        <div className="header-manager__nav-left">
          <div className="header-manager__collapse" onClick={handleCollapse}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div className="header-manager__name-page">{pageName}</div>
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
          {dropdownOpen && (
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
                <i className="fas fa-user"></i> Edit Profile
              </Link>
              <Link to="#">
                <i className="fas fa-cog"></i> Account Setting
              </Link>
              <Link to="#">
                <i className="fas fa-folder"></i> Projects
              </Link>
              <Link to="#">
                <i className="fas fa-sign-out-alt"></i> Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ManagerHeader;