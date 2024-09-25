import {Layout} from "antd";
import "./ManagerLayout.scss";
import {Outlet} from "react-router-dom";
import ManagerHeader from "../../../Components/manager/ManagerHeader/ManagerHeader";
import MenuSider from "../../../Components/manager/MenuSider";
import { useSelector } from "react-redux";
import ManagerFooter from "../../../Components/manager/ManagerFooter/ManagerFooter";

const { Content, Sider} = Layout;

function ManagerLayout () {
    const collapse = useSelector(state => state.collapseReducer);

    return(
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <ManagerHeader/>
                <Layout>
                    <Sider theme="light" collapsed={collapse} className="sider"><MenuSider/></Sider>
                    <Content className="content">
                        <Outlet/>
                    </Content>
                </Layout>
                <ManagerFooter/>
            </Layout>
        </>
    )
}

export default ManagerLayout;