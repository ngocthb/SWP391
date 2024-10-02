import { Menu } from "antd";
import {
  PlayCircleOutlined,
  HighlightOutlined,
  InsertRowAboveOutlined,
  PlusOutlined,
  ScissorOutlined,
  ContactsOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function MenuSider() {
  const items = [
    {
      label: <Link to="/manager/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />,
      key: "Dashboard",
    },
    {
      label: "Employee",
      icon: <ContactsOutlined />,
      key: "Employee",
      children: [
        {
          label: <Link to="/manager/stylish">Stylish</Link>,
          icon: <ScissorOutlined />,
          key: "Stylish",
        },
        {
          label: "Menu 2-1",
          key: "menu 2-1",
        },
      ],
    },
    {
      label: <Link to="/manager/service">Service</Link>,
      icon: <HighlightOutlined />,
      key: "Service",
    },
    {
      label: <Link to="/manager/booking">Booking</Link>,
      icon: <InsertRowAboveOutlined />,
      key: "booking",
    },
    {
      label: <Link to="/create-room">Create room</Link>,
      icon: <PlusOutlined />,
      key: "/create-room",
    },
    {
      label: <Link to="/list-room">List room</Link>,
      icon: <PlusOutlined />,
      key: "/list-room",
    },
  ];

  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={["Dashboard"]}
        defaultOpenKeys={["menu-1"]}
        items={items}
        style={{ height: "100%", borderRight: 0 }}
      />
    </>
  );
}

export default MenuSider;
