/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Header.scss";
import { IoIosAperture } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { useEffect, useState } from "react";
import DropdownNav from "../../../redux/dropdown.js";
import { Link, useLocation } from "react-router-dom";
import loginUser from "../../../data/loginUser.js";
import { PiSignOut } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  const [active, setActive] = useState("navBar");
  const [transparent, setTransparent] = useState("navBarSection__header");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  //Code to show(toggle) navbar
  const showNav = () => {
    setActive("navBar navBar-active");
  };

  // Code to remove navbar
  const removeNav = () => {
    setActive("navBar");
  };

  // Code to add background color to header

  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent("navBarSection__header navBarSection__header-active");
    } else {
      setTransparent("navBarSection__header");
    }
  };
  window.addEventListener("scroll", addBg);

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

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault(); // Prevent navigation
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
    }
  };

  return (
    <section className="navBarSection">
      {/* navBarSection__header navBarSection__header-active */}
      <div className={transparent}>
        <div className="navBarSection__header-logo">
          <Link to="/" onClick={handleHomeClick} className="logo-link">
            <h1 className="flex">
              <img src="logo_white_noBackground.png" alt="logo" />
              F-Salon
            </h1>
          </Link>
        </div>
        {/* navBar navBar-active */}
        {/* `${active} ${isLoggedIn ? " logged-in" : " logged-out"}` */}
        <div className={active}>
          <ul className="navBar__lists flex">
            <li className="navBar__lists-items">
              <Link to={""}> About Us</Link>
            </li>
            <li className="navBar__lists-items">
              <DropdownNav title="Service" />
            </li>
            <li className="navBar__lists-items">
              <Link to={""}>Upcoming Package</Link>
            </li>
            <div className="navBar__lists-infor flex">
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
                  <button className="btn">
                    <Link to={"/login"}>Login</Link>
                  </button>
                </>
              )}
            </div>
          </ul>
          <div onClick={removeNav} className="navBar__close">
            <IoCloseCircleSharp className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="Header__toggle">
          <CiGrid41 className="icon" />
          <img src={loginUser.avatar} alt="User-Avatar" />
        </div>
      </div>
    </section>
  );
}
