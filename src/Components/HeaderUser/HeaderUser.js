/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import { IoIosNotifications } from "react-icons/io";
import { Dropdown, Space } from "antd";
import notis from "../../data/notification";
import "./HeaderUser.scss"
import loginUser from "../../data/loginUser";

export default function HeaderUser() {
  const [showNav, setShowNav] = useState(false);
  const items = notis;

  return (
    <>
      <header>
        <div className="header-left">
          <IoMenu
            onClick={() => {
              setShowNav(!showNav);
            }}
            className="icon"
          />
          <h1>User</h1>
        </div>
        <div className="content">
          <div className="content__noti">
            <Dropdown
              menu={{
                items,
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
      </header>
      <SidebarMenu show={showNav} />
    </>
  );
}
