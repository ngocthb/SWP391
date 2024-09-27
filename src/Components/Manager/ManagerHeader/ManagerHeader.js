import React from "react";
import logo from "../../../Assets/Logo.png";
import logoFold from "../../../Assets/logo-fold.png";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./ManagerHeader.scss";
import { useDispatch, useSelector } from "react-redux";
import { collapse } from "../../../actions/Collapse";

const ManagerHeader = () => {
  const collapsed = useSelector((state) => state.collapseReducer);
  const dispatch = useDispatch();

  return (
    <header className="header-manager">
      <div
        className={`header-manager__logo ${
          collapsed ? "header-manager__logo--collapsed" : ""
        }`}
      >
        {collapsed ? (
          <img src={logoFold} alt="Logo Fold" />
        ) : (
          <img src={logo} alt="Logo" />
        )}
      </div>
      <div className="header-manager__nav">
        <div className="header-manager__nav-left">
          <div
            className="header-manager__collapse"
            onClick={() => {
              dispatch(collapse());
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            <div className="header-manager__name-page">Stylish</div>
          </div>
        </div>
        <div className="header-manager__nav-right">
          <div className="header-manager__user-info">
            <div className="header-manager__text">
              <div className="header-manager__name">Nabila A.</div>
              <div className="header-manager__role">Admin</div>
            </div>
            <div className="header-manager__avatar">
              <img
                alt="User avatar"
                src="https://enlink.themenate.net/assets/images/avatars/thumb-3.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ManagerHeader;