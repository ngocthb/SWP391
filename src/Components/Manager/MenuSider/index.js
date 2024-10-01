import { Menu } from "antd";
import {
  PlayCircleOutlined,
  CheckOutlined,
  HighlightOutlined,
  InsertRowAboveOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function MenuSider() {
  const items = [
    {
      label: <Link to="/manager/dashboard">Dashboard</Link>,
      icon: <PlayCircleOutlined />,
      key: "Dashboard",
    },
    {
      label: "Employee",
      icon: <CheckOutlined />,
      key: "menu-2",
      children: [
        {
          label: <Link to="/manager/stylish">Stylish</Link>,
          key: "stylish",
        },
        {
          label: "Menu 2-1",
          key: "menu 2-1",
        },
      ],
    },
    {
      label: "Menu 3",
      icon: <HighlightOutlined />,
      key: "menu-3",
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
