/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Header.scss";
import { IoIosAperture } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { useState } from "react";
import DropdownNav from "../../redux/dropdow.js";
import { Link } from "react-router-dom";
<CiGrid41 />;

export default function Header() {
  const [active, setActive] = useState("navBar");

  //Code to show(toggle) navbar
  const showNav = () => {
    setActive("navBar navBar-active");
  };

  // Code to remove navbar
  const removeNav = () => {
    setActive("navBar");
  };

  // Code to add background color to header
  const [transparent, setTransparent] = useState("navBarSection__header");
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent("navBarSection__header navBarSection__header-active");
    } else {
      setTransparent("navBarSection__header");
    }
  };
  window.addEventListener("scroll", addBg);

  return (
    <section className="navBarSection">
      <div className={transparent}>
        <div className="navBarSection__header-logo">
        <Link to={"/"}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <h1 className="flex">
                <IoIosAperture />
                F-Salon
              </h1>
            </Link>
        </div>

        <div className={active}>
          <ul className="navBar__lists flex">
            <li className="navBar__lists-items">
              <Link to={""}>About Us</Link>
            </li>
            <li className="navBar__lists-items">
              <Link to={""}>
                <DropdownNav title="Service" />
              </Link>
            </li>
            <li className="navBar__lists-items">
              <Link to={""}>Upcoming Package</Link>
            </li>
            <div className="navBar__lists-button flex">
              <button className="navBar__btn btn">
                <Link to={"/signin"}>Login</Link>
              </button>
            </div>
          </ul>
          <div onClick={removeNav} className="navBar__close">
            <IoCloseCircleSharp className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="navBar__toggle">
          <CiGrid41 className="icon" />
        </div>
      </div>
    </section>
  );
}
