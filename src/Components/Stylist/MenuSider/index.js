import React from "react";
import { Menu } from "antd";
import { CalendarOutlined, DashboardOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { MdOutlineFeedback } from "react-icons/md";

function MenuSider() {
  const location = useLocation();
  const currentPath = location.pathname;

  const items = [
    {
      label: <Link to="/stylist/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />,
      key: "/stylist/dashboard",
    },
    {
      label: <Link to="/stylist/schedule">Schedule</Link>,
      icon: <CalendarOutlined />,
      key: "/stylist/schedule",
    },
    {
      label: <Link to="/stylist/salary">Salary</Link>,
      icon: <LiaMoneyCheckAltSolid />,
      key: "/stylist/salary",
    },
    {
      label: <Link to="/stylist/feedback">Feedback</Link>,
      icon: <MdOutlineFeedback />,
      key: "/stylist/feedback",
    },
  ];

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={["Employee"]}
      selectedKeys={[currentPath]}
      items={items}
      style={{ height: "100%", borderRight: 0 }}
    />
  );
}

export default MenuSider;
