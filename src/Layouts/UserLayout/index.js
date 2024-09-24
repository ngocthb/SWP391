import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import HeaderUser from "../../Components/HeaderUser/HeaderUser";

<<<<<<< HEAD:src/Layouts/UserLayout/index.js
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
=======
function CustomerLayout() {
  return (
    <>
      <HeaderCustomer />
      <Outlet />
      <Footer />
    </>
  );
}

export default CustomerLayout;
>>>>>>> 68f8f26741f30052d038f83fa1f5ccef835c314d:src/Layouts/CustomerLayout/index.js
