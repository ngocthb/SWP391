/* eslint-disable jsx-a11y/anchor-is-valid */
import "./HeaderCustomer.scss";
import { IoIosAperture } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { useState } from "react";
import DropdownNav from "../../redux/dropdow.js";
import { Link } from "react-router-dom";
<CiGrid41 />;

export default function HeaderCustomer() {
  const [active, setActive] = useState("HeaderCustomer");

  //Code to show(toggle) HeaderCustomer
  const showNav = () => {
    setActive("HeaderCustomer HeaderCustomer-active");
  };

  // Code to remove HeaderCustomer
  const removeNav = () => {
    setActive("HeaderCustomer");
  };

  // Code to add background color to header
  const [transparent, setTransparent] = useState("HeaderCustomerSection__header");
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent("HeaderCustomerSection__header HeaderCustomerSection__header-active");
    } else {
      setTransparent("HeaderCustomerSection__header");
    }
  };
  window.addEventListener("scroll", addBg);

  return (
    <section className="HeaderCustomerSection">
      <div className={transparent}>
        <div className="HeaderCustomerSection__header-logo">
          <Link to={""}>
            <h1 className="flex">
              <IoIosAperture />
              F-Salon
            </h1>
          </Link>
        </div>

        <div className={active}>
          <ul className="HeaderCustomer__lists flex">
            <li className="HeaderCustomer__lists-items">
              <Link to={""}>About Us</Link>
            </li>
            <li className="HeaderCustomer__lists-items">
              <Link to={""}>
                <DropdownNav title="Service" />
              </Link>
            </li>
            <li className="HeaderCustomer__lists-items">
              <Link to={""}>Upcoming Package</Link>
            </li>
            <div className="HeaderCustomer__lists-button flex">
              <button className="HeaderCustomer__btn btn">
                <Link to={""}>Login</Link>
              </button>
            </div>
          </ul>
          <div onClick={removeNav} className="HeaderCustomer__close">
            <IoCloseCircleSharp className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="HeaderCustomer__toggle">
          <CiGrid41 className="icon" />
        </div>
      </div>
    </section>
  );
}
