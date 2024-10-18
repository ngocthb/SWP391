import React from "react";
import { Menu } from "antd";
import {
  InsertRowAboveOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

function MenuSider() {
  const location = useLocation();
  const currentPath = location.pathname;

  const items = [
    {
      label: <Link to="/staff/booking">Booking</Link>,
      icon: <InsertRowAboveOutlined />,
      key: "/staff/booking",
    },
    {
      label: <Link to="/staff/booking-service">Booking Service</Link>,
      icon: <PlusOutlined />,
      key: "/staff/booking-service",
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
