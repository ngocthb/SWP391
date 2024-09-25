import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import HeaderNormal from "../../Components/HeaderNormal/HeaderNormal";
function SigninLayout() {
  return (
    <>
      <HeaderNormal/>
      <Outlet />
      <Footer />
    </>
  );
}

export default SigninLayout;
