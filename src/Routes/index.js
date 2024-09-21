import ConfirmPassword from "../Components/ConfirmPassword/ConfirmPassword";
import ForgetPassword from "../Components/ForgetPassword/ForgetPassword";
import Signin from "../Components/Signin/Signin";
import Signup from "../Components/Signup/Signup";
import UserInfor from "../Components/UserInfor/UserInfor";
import CustomerLayout from "../Layouts/CustomerLayout";
import SigninLayout from "../Layouts/SigninLayout";
import HomePage from "../Pages/HomePage";
import PrivateRoute from "../Components/PrivateRoute/index";

export const Routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signin',
    element: <SigninLayout />,
    children: [
      {
        path: '',
        element: <Signin />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'forgetPassword',
        element: <ForgetPassword />,
      },
      {
        path: 'confirmPassword',
        element: <ConfirmPassword />,
      },
    ],
  },
  {
    path: 'customer',
    element: <PrivateRoute><CustomerLayout/></PrivateRoute>,
    children: [
      {
        path: 'information',
        element: <UserInfor/>
      }
    ]
  },
];
