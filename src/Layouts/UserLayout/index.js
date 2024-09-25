import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

function UserLayout () {
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default UserLayout;