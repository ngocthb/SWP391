import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import HeaderSignup from "../../Components/HeaderSignup/HeaderSignup";
import Signin from "../../Components/Signin/Signin";
function SigninLayout() {
  return (
    <>
      <HeaderSignup />
      <Outlet />
      <Signin />
      <Footer />
    </>
  );
}

export default SigninLayout;
