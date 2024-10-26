import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import "./Login.scss";
import { message, Spin } from "antd";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { googleProvider } from "../../../config/firebase";
import { useDispatch } from "react-redux";
import { setRole } from "../../../actions/Role";
import { eye, eye_off, google_icon, logo_blue_noBackground } from "../../../data/image";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const password = e.target[1].value;

    setLoading(true);
    try {
      const response = await api.post("login", {
        username: userName,
        password: password,
      });
      const { token, role } = response.data.result;
      sessionStorage.setItem("token", token);
      dispatch(setRole(role));

      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "BRANCH_MANAGER") {
        navigate("/manager/dashboard");
      } else if (role === "STYLIST") {
        navigate("/stylist/dashboard");
      } else if (role === "STAFF") {
        navigate("/staff/booking/pending");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchLoginGG = async () => {
  
    const auth = getAuth();
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const value = {
        token: idToken
      }
      const response = await api.post("login-gg", value);
      const data = response.data.result;
      
      if (data) {
        const { token, role } = data;
        sessionStorage.setItem("token", token);

        if (role === "ADMIN") {
          navigate("/admin/dashboard");
         }else if (role === "BRANCH_MANAGER"){
          navigate("/manager/dashboard");
         }else if (role === "STYLIST") {
          navigate("/stylist/dashboard")
         }else if (role === "STAFF") {
          navigate("/staff/booking/pending");
        }
        else{
          navigate("/");
         }
      }
    } catch (error) {
      
    }

  }

  const handleLoginGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        fetchLoginGG()

        // The signed-in user info.
        const user = result.user;
        console.log(user);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // // ...
      });
  };

  return (
    <>
      {contextHolder}
      <div className="signin__container">
        <div className="signin__left-side">
          <div className="signin__logo">
            <img src={logo_blue_noBackground} alt="Arrow" />
            <h2>F-salon</h2>
          </div>
          <div className="signin__illustration">
            <img
              src="https://myxteam.vn/wp-content/uploads/2020/08/10.-5-Quy-tri%CC%80nh-thu%CC%9B%CC%A3c-hie%CC%A3%CC%82n-qua%CC%89n-ly%CC%81-du%CC%9B%CC%A3-a%CC%81n-da%CC%82%CC%80u-tu%CC%9B-xa%CC%82y-du%CC%9B%CC%A3ng.png"
              alt="Illustration"
            />
          </div>
          <div className="signin__title">
            <h3>Title</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididun.
            </p>
          </div>
        </div>
        <div className="signin__right-side">
          <h1>Welcome back</h1>
          <button className="signin__button-google" onClick={handleLoginGoogle}>
            <img src={google_icon} alt=""/>
            Sign in with Google
          </button>
          <form className="signin__form" onSubmit={handleSubmit}>
            <label htmlFor="userName">User name</label>
            <input type="text" required id="userName" />
            <label htmlFor="password">Password</label>
            <div className="signin__password-input">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                required
              />
              <img
                src={passwordVisible ? eye_off : eye}
                alt="Eye Icon"
                onClick={handlePasswordVisibility}
              />
            </div>
            <div className="signin__flex-box">
              <div className="signin__checkbox">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <button
                type="submit"
                className="signin__log-in-button"
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : "LOG IN"}
              </button>
            </div>
            <p className="signin__sign-up">
              No Account yet? <Link to="/login/register">REGISTER</Link>
            </p>
            <p className="signin__forgot-password">
              <Link to="/login/forgetPassword">Forgot password?</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
