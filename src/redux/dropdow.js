/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import subServices from "../data/subServices";
const items = subServices;

const DropdownNav = ({ title }) => (
  <Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        {title}
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default DropdownNav;
