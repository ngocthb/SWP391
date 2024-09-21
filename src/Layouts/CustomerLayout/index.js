import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import HeaderCustomer from "../../Components/HeaderCustomer/HeaderCustomer";

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
