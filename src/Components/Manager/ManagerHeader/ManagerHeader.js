import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import logo from "../../../Assets/logo.png";
import logoFold from "../../../Assets/logo_blue_noBackground.png";
import { collapse } from "../../../actions/Collapse";
import "./ManagerHeader.scss";
import api from "../../../config/axios";
import loginUser from "../../../data/loginUser";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";

const pageNames = {
  "/manager/dashboard": "Dashboard",
  "/manager/stylist": "Stylist",
  "/manager/stylist/create": "New Stylist",
  "/manager/booking": "Booking",
  "/manager/service": "Service",
  "/manager/staff": "Staff",
  "/manager/staff/create": "New Staff",
  "/manager/customer": "Customer",
};

const ManagerHeader = () => {
  const collapsed = useSelector((state) => state.collapseReducer);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const [pageName, setPageName] = useState("");
  const navigate = useNavigate();
  const [managerInfo, setManagerInfo] = useState([]);

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
    const fetchManagerData = async () => {
      try {
        const response = await api.get(`manager/profile`);
        const data = response.data.result;
        console.log(data);
        if (data) {
          setManagerInfo(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchManagerData();
  }, []);

  useEffect(() => {
    setPageName(pageNames[location.pathname] || "");
  }, [location.pathname]);

  const handleCollapse = useCallback(() => {
    dispatch(collapse());
  }, [dispatch]);

  const handleGoback = () => {
    navigate("/manager/dashboard");
  };

  function formatRole(input) {
    return input
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header className="header-manager">
      <div
        className={`header-manager__logo ${
          collapsed ? "header-manager__logo--collapsed" : ""
        }`}
      >
        <img
          onClick={handleGoback}
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
              <div className="header-manager__name">{managerInfo.fullname}</div>
              <div className="header-manager__role">
                {managerInfo.role ? formatRole(managerInfo.role) : ""}
              </div>
            </div>
            <div className="header-manager__avatar">
              <img
                alt="User avatar"
                src={managerInfo.image || loginUser.avatar}
              />
            </div>
          </div>
          {dropdownOpen && (
            <div className="header-manager__dropdown">
              <div className="header-manager__dropdown--header">
                <img
                  height={60}
                  alt="User avatar"
                  src={managerInfo.image || loginUser.avatar}
                />
                <div>
                  <h2>{managerInfo.fullname}</h2>
                  <p>
                    {managerInfo.role
                      ? formatRole(managerInfo.role)
                      : ""}
                  </p>
                </div>
              </div>
              <Link to="#">
                <i>
                  <CgProfile />
                </i>{" "}
                Edit Profile
              </Link>
              <Link to="/" onClick={handleLogout}>
                <i>
                  {" "}
                  <TbLogout />
                </i>{" "}
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
