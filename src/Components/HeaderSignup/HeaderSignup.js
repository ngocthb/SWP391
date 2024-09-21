/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { IoIosAperture } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import DropdownNav from "../../redux/dropdow"; // Adjust path based on your structure
import "./HeaderSignup.scss";

export default function HeaderSignup() {
  const [active, setActive] = useState("navBar");
  const [transparent, setTransparent] = useState("navBarSection__header navBarSection__header-active");

  // Toggle navbar
  const showNav = () => setActive("navBar navBar-active");
  const removeNav = () => setActive("navBar");

  // Background color change on page load (without scroll)
  useEffect(() => {
    setTransparent("navBarSection__header navBarSection__header-active");
  }, []);

  return (
   <>
       <section className="navBarSection">
      <div className={transparent}>
        <div className="navBarSection__header-logo">
          <a href="#">
            <h1 className="flex">
              <IoIosAperture />
              F-Salon
            </h1>
          </a>
        </div>

        <div className={active}>
          <ul className="navBar__lists flex">
            <li className="navBar__lists-items">
              <a href="#">About Us</a>
            </li>
            <li className="navBar__lists-items">
              <DropdownNav title="Service" />
            </li>
            <li className="navBar__lists-items">
              <a href="#">Upcoming Package</a>
            </li>
            <div className="navBar__lists-button flex">
              <button className="navBar__btn btn">
                <a href="#">Login</a>
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
   </>
  );
}
