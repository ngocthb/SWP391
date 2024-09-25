/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { IoIosAperture } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import DropdownNav from "../../../redux/dropdow.js"; // Adjust path based on your structure
import "./HeaderNormal.scss";
import { Link } from "react-router-dom";
import loginUser from "../../../data/loginUser.js";

export default function HeaderNormal() {
  const [active, setActive] = useState("header-normal");
  const [transparent, setTransparent] = useState(
    "header-normalSection__header header-normalSection__header-active"
  );

  // Toggle header-normal
  const showNav = () => setActive("header-normal header-normal-active");
  const removeNav = () => setActive("header-normal");

  // Background color change on page load (without scroll)
  useEffect(() => {
    setTransparent(
      "header-normalSection__header header-normalSection__header-active"
    );
  }, []);

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <section className="header-normalSection">
        <div className={transparent}>
          <div className="header-normalSection__header-logo">
            <Link to={"/"}>
              <h1 className="flex">
                <IoIosAperture />
                F-Salon
              </h1>
            </Link>
          </div>

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

              <div className="header-normal__lists-button flex">
                {isLoggedIn ? (
                  <>
                    <div className="content">
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
                  </>
                ) : (
                  <>
                    {" "}
                    <button className="header-normal__btn btn">
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
          </div>
        </div>
      </section>
    </>
  );
}
