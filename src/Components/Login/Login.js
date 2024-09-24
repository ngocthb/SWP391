import React, { useState } from 'react'
import eyeOff from "../../Assets/eye-off.svg";
import eye from "../../Assets/eye.svg";
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from '../../Assets/GoogleIcon.svg';
import api from "../../config/axios";
import './Login.scss';
import { message, Spin } from 'antd';

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userName = e.target[0].value;
        const password = e.target[1].value;
    
        setLoading(true);
        try {
            const response = await api.post("api/login", {
                username: userName,
                password: password
            });
            const { token } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response);
            
            if(response) {
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            messageApi.open({
                type: 'error',
                content: 'Login failed. Please try again.',
              });
        }  finally {
            setLoading(false)
        }
    };
    

    return (
        <>
        {contextHolder}
            <div className="signin__container">
                <div className="signin__left-side">
                    <div className="signin__logo">
                        <h2>Logo</h2>
                        <img src="arrow.svg" alt="Arrow" />
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun.
                        </p>
                    </div>
                </div>
                <div className="signin__right-side">
                    <h1>Welcome back</h1>
                    <button className="signin__button-google">
                        <GoogleIcon />
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
                                src={passwordVisible ? eyeOff : eye}
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
                        <p className="signin__sign-up">No Account yet? <Link to='/login/register'>REGISTER</Link></p>
                        <p className="signin__forgot-password"><Link to='/login/forgetPassword'>Forgot password?</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
