import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import HeaderSignup from "../../Components/HeaderSignup/HeaderSignup";
function SigninLayout() {
  return (
    <>
      <HeaderSignup />
      <Outlet />
      <Footer />
    </>
  );
}

export default SigninLayout;
