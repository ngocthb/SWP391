import "./Header.scss";
import { IoIosAperture } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { useEffect, useState } from "react";
import DropdownNav from "../../../redux/dropdown.js";
import { Link, useLocation } from "react-router-dom";
import { PiSignOut } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

export default function Header() {
  const [active, setActive] = useState("navBar");
  const [transparent, setTransparent] = useState("navBarSection__header");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");
  const [loginUser, setLoginUser] = useState();
  const isUpdate = useSelector((state) => state.updateUserReducer);

  useEffect(() => {
    const updateLoginUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoginUser(user);
    };

    updateLoginUser();

    window.addEventListener('storage', updateLoginUser);

    return () => {
      window.removeEventListener('storage', updateLoginUser);
    };
  }, [isUpdate]);

  
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
                          <h3>{loginUser.fullname || ""}</h3>
                          <p>{loginUser.role || ""}</p>
                        </div>
                        <div>
                          <img
                            src={loginUser.avatar}
                            alt="User-Avatar"
                          />
                        </div>
                      </div>
                    </div>
                    {dropdownOpen && (
                     <div className="navbar__dropdown">
                     <div className="navbar__dropdown--header">
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
                     <Link to="/user/profile">
                       <i className="fas fa-user"></i>
                       Profile
                     </Link>
                     <Link to="#">
                       <i className="fas fa-cog"></i>
                       Account Setting
                     </Link>
                     <Link to="#">
                       <i className="fas fa-folder"></i>
                       Projects
                     </Link>
                     <Link to="#" onClick={handleLogout}>
                       <i className="fas fa-sign-out-alt"></i>
                       Logout
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
              <img src={loginUser.avatar} alt="User-Avatar" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
