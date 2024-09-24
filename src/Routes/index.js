import ConfirmPassword from "../Components/ConfirmPassword/ConfirmPassword";
import ForgetPassword from "../Components/ForgetPassword/ForgetPassword";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import UserInfor from "../Components/UserInfor/UserInfor";
import CustomerLayout from "../Layouts/UserLayout";
import SigninLayout from "../Layouts/SigninLayout";
import HomePage from "../Pages/HomePage";
import PrivateRoute from "../Components/PrivateRoute/index";
import AuthenticatedRoute from "../Components/AuthenticatedRoute";

export const Routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: (
      <AuthenticatedRoute>
        <SigninLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        path: '',
        element: <Login/>,
      },
      {
        path: 'register',
        element: <Register />,
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
    path: 'user',
    element: <PrivateRoute><CustomerLayout /></PrivateRoute>,
    children: [
      {
        path: 'information',
        element: <UserInfor />
      }
    ]
  },
];
