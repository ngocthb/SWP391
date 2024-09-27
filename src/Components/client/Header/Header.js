import "./Header.scss";
import { IoIosAperture } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { useEffect, useState } from "react";
import DropdownNav from "../../../redux/dropdown.js";
import { Link, useLocation } from "react-router-dom";
import { PiSignOut } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import user from "../../../data/loginUser.js";

export default function Header() {
  const [active, setActive] = useState("navBar");
  const [transparent, setTransparent] = useState("navBarSection__header");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");
  const loginUser = JSON.parse(localStorage.getItem("user"));

  const showNav = () => {
    setActive("navBar navBar-active");
  };

  const removeNav = () => {
    setActive("navBar");
  };

  const addBg = () => {
    setTransparent(
      window.scrollY >= 10
        ? "navBarSection__header navBarSection__header-active"
        : "navBarSection__header"
    );
  };

  window.addEventListener("scroll", addBg);

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
    window.location.href = "/";
  };

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="navBarSection">
        <div className={transparent}>
          <div className="navBarSection__header-logo">
            <Link to="/" onClick={handleHomeClick} className="logo-link">
              <h1 className="flex">
                <IoIosAperture />
                F-Salon
              </h1>
            </Link>
          </div>
          <div
            className={`${active} ${isLoggedIn ? " logged-in" : " logged-out"}`}
          >
            <ul className="navBar__lists flex">
              <li
                className={`navBar__lists-items ${
                  isLoggedIn ? "logged-in" : ""
                }`}
              >
                <Link to="">About Us</Link>
              </li>
              <li
                className={`navBar__lists-items ${
                  isLoggedIn ? "logged-in" : ""
                }`}
              >
                <DropdownNav title="Service" />
              </li>
              <li
                className={`navBar__lists-items ${
                  isLoggedIn ? "logged-in" : ""
                }`}
              >
                <Link to="">Upcoming Package</Link>
              </li>
              <div className="navBar__lists-infor flex">
                {isLoggedIn && loginUser ? (
                  <>
                    <div className="content" onClick={toggleDropdown}>
                      <div className="content__infor">
                        <div>
                          <h3>{loginUser.name || ""}</h3>
                          <p>{loginUser.role || ""}</p>
                        </div>
                        <div>
                          <img
                            src={loginUser.avatar || user.avatar}
                            alt="User-Avatar"
                          />
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
                  <button className="btn">
                    <Link to="/login">Login</Link>
                  </button>
                )}
              </div>
            </ul>
            <div onClick={removeNav} className="navBar__close">
              <IoCloseCircleSharp className="icon" />
            </div>
          </div>

          <div onClick={showNav} className="Header__toggle">
            <CiGrid41 className="icon" />
            {loginUser && (
              <img src={loginUser.avatar || user.avatar} alt="User-Avatar" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
