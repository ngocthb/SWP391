/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import subServices from "../data/subServices";
import { Link } from "react-router-dom";
const items = subServices;

const DropdownNav = ({ title }) => (
  <Dropdown
    menu={{
      items,
    }}
  >
<<<<<<< HEAD:src/redux/dropdow.js
    <Link onClick={(e) => e.preventDefault()}>
=======
    <Link to onClick={(e) => e.preventDefault()}>
>>>>>>> 68f8f26741f30052d038f83fa1f5ccef835c314d:src/redux/dropdown.js
      <Space>
        {title}
        <DownOutlined />
      </Space>
    </Link>
  </Dropdown>
);
export default DropdownNav;
