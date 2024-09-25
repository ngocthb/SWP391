import React, { useState } from 'react'
import logo from "../../../Assets/logo.png";
import logoFold from "../../../Assets/logo-fold.png";
import {SearchOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import Notify from "../Notify";
import "./Header.scss";

const Header = () => {
    const [collapsed, setCollapsed] = useState(false);
  return (
    <>
        <header className="header-manager">
                    <div className={"header-manager__logo " + (collapsed && ("header-manager__logo--collapsed"))}>
                       {collapsed ? ( <img src={logoFold} alt="Logo Fold"/>) : ( <img src={logo} alt="Logo"/>)}
                    </div>
                    <div className="header-manager__nav">
                        <div className="header-manager__nav-left">
                            <div className="header-manager__collapse" onClick={() => setCollapsed(!collapsed)}>
                                <MenuUnfoldOutlined />
                            </div>
                        </div>
                        <div className="header-manager__nav-right">
                            <Notify/>
                        </div>
                    </div>
                </header>
    </>
  )
}

export default Header
