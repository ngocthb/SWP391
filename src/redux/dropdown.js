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
    <Link to onClick={(e) => e.preventDefault()}>
      <Space>
        {title}
        <DownOutlined />
      </Space>
    </Link>
  </Dropdown>
);
export default DropdownNav;
