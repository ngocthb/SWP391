import { Menu } from "antd";
import {PlayCircleOutlined, CheckOutlined, HighlightOutlined, InsertRowAboveOutlined, PlusOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";

function MenuSider() {
    const items = [
        {
            label: "Menu 1",
            icon: <PlayCircleOutlined />,
            key: "menu-1",
            children: [
                {
                    label:<Link to="/">Dashboard</Link>,
                    key: "/"
                },
                {
                    label: "Menu 1-2",
                    key: "menu 1-2"
                },
                {
                    label: "Menu 1-3",
                    key: "menu 1-3"
                }
            ]
        },
        {
            label: "Menu 2",
            icon: <CheckOutlined/>,
            key: "menu-2",
            children: [
                {
                    label: "Menu 2-1",
                    key: "menu 2-1"
                }
            ]
        },
        {
            label: "Menu 3",
            icon: <HighlightOutlined/>,
            key: "menu-3",
        },
        {
            label:<Link to="/book-room">Book room</Link>,
            icon: <InsertRowAboveOutlined/>,
            key: "/book-room",
        },
        {
            label:<Link to="/create-room">Create room</Link>,
            icon: <PlusOutlined />,
            key: "/create-room",
        },
        {
            label:<Link to="/list-room">List room</Link>,
            icon: <PlusOutlined />,
            key: "/list-room",
        }
        
    ]

  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={["/"]}
        defaultOpenKeys={["menu-1"]}
        items={items}
      />
    </>
  );
}

export default MenuSider;
