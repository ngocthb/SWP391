/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { IoIosAperture } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import DropdownNav from "../../../redux/dropdown.js";
import "./HeaderNormal.scss";
import { Link } from "react-router-dom";
import loginUser from "../../../data/loginUser.js";
import { PiSignOut } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

export default function HeaderNormal() {
  const [active, setActive] = useState("header-normal");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Toggle header-normal
  const showNav = () => setActive("header-normal header-normal-active");
  const removeNav = () => setActive("header-normal");

  // Background color change on page load (without scroll)
  // useEffect(() => {
  //   setTransparent(" header-normalSection__header-active");
  // }, []);

  const isLoggedIn = !!localStorage.getItem("token");

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".content")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    // Redirect to home or login page
    window.location.href = "/";
  };

  return (
    <>
      <section className="header-normalSection">
        <div className="header-normalSection__header">
          <div className="header-normalSection__header-logo">
            <Link to={"/"}>
              <h1 className="flex">
                <img src="logo_white_noBackground.png" alt="logo" />
                F-Salon
              </h1>
            </Link>
          </div>
          {/* header-normal header-normal-active */}
          <div className={active}>
            <ul className="header-normal__lists flex">
              <li className="header-normal__lists-items">
                <Link to={""}>About Us</Link>
              </li>
              <li className="header-normal__lists-items">
                <DropdownNav title="Service" />
              </li>
              <li className="header-normal__lists-items">
                <Link to={""}>Upcoming Package</Link>
              </li>

              <div className="header-normal__lists-infor flex">
                {isLoggedIn ? (
                  <>
                    <div className="content" onClick={toggleDropdown}>
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
                    {dropdownOpen && (
                      <div className="header__dropdown">
                        <Link
                          to="/user/profile"
                          className="header__dropdown-item"
                        >
                          <CgProfile /> Profile
                        </Link>
                        <Link
                          to="#"
                          onClick={handleLogout}
                          className="header__dropdown-item"
                        >
                          <PiSignOut /> Logout
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <button className=" btn">
                      <Link to={""}>Login</Link>
                    </button>
                  </>
                )}
              </div>
            </ul>
            <div onClick={removeNav} className="header-normal__close">
              <IoCloseCircleSharp className="icon" />
            </div>
          </div>

          <div onClick={showNav} className="header-normal__toggle">
            <CiGrid41 className="icon" />
            <img src={loginUser.avatar} alt="User-Avatar" />
          </div>
        </div>
      </section>
    </>
  );
}
