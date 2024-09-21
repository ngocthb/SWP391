/* eslint-disable jsx-a11y/anchor-is-valid */
import "./HeaderCustomer.scss";
import { IoIosAperture } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { useState } from "react";
import DropdownNav from "../../redux/dropdow.js";
import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { Dropdown, Space } from "antd";
import notis from "../../data/notification";
import loginUser from "../../data/loginUser.js";

export default function Header() {
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
  // const [transparent, setTransparent] = useState("HeaderCustomerSection__header");
  // const addBg = () => {
  //   if (window.scrollY >= 10) {
  //     setTransparent("HeaderCustomerSection__header HeaderCustomerSection__header-active");
  //   } else {
  //     setTransparent("HeaderCustomerSection__header");
  //   }
  // };
  // window.addEventListener("scroll", addBg);

  return (
    <section className="HeaderCustomerSection">
      <div className="HeaderCustomerSection__header">
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
            <div className="HeaderCustomer__lists-infor flex">
              <div className="content">
                <div className="content__noti">
                  <Dropdown
                    menu={{
                      notis,
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <IoIosNotifications className="icon" />
                      </Space>
                    </a>
                  </Dropdown>
                </div>

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
            </div>
          </ul>
          <div onClick={removeNav} className="HeaderCustomer__close">
            <IoCloseCircleSharp className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="HeaderCustomer__toggle">
          <CiGrid41 className="icon" />
          <img src={loginUser.avatar} alt="User-Avatar" />
        </div>
      </div>
    </section>
  );
}
