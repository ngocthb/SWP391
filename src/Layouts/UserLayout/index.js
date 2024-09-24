import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import HeaderUser from "../../Components/HeaderUser/HeaderUser";

function UserLayout () {
    return(
        <>
            <HeaderUser/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default UserLayout;