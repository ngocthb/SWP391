import React from "react";
import { Menu } from "antd";
import {
  InsertRowAboveOutlined,
  PlusOutlined,
  ScissorOutlined,
  ContactsOutlined,
  DashboardOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { RiCustomerService2Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

function MenuSider() {
  const location = useLocation();
  const currentPath = location.pathname;

  const items = [
    {
      label: <Link to="/manager/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />,
      key: "/manager/dashboard",
    },
    {
      label: "Employee",
      icon: <ContactsOutlined />,
      key: "Employee",
      children: [
        {
          label: <Link to="/manager/stylist">Stylist</Link>,
          icon: <ScissorOutlined />,
          key: "/manager/stylist",
        },
        {
          label: <Link to="/manager/staff">Staff</Link>,
          icon: <RiCustomerService2Line />,
          key: "/manager/staff",
        },
      ],
    },
    {
      label: <Link to="/manager/booking">Booking</Link>,
      icon: <InsertRowAboveOutlined />,
      key: "/manager/booking",
    },
    {
      label: <Link to="/manager/customer">Customer</Link>,
      icon: <PlusOutlined />,
      key: "/manager/customer",
    },
    {
      label: <Link to="/manager/shift">Shift</Link>,
      icon: <ScheduleOutlined />,
      key: "/manager/shift",
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
