import SigninLayout from "../Layouts/SigninLayout";
import HomePage from "../Pages/HomePage";
import PrivateRoute from "../Components/PrivateRoute/index";
import AuthenticatedRoute from "../Components/AuthenticatedRoute";
import Login from "../Components/client/Login/Login";
import Register from "../Components/client/Register/Register";
import ForgetPassword from "../Components/client/ForgetPassword/ForgetPassword";
import ConfirmPassword from "../Components/client/ConfirmPassword/ConfirmPassword";
import UserInfor from "../Components/client/UserInfor/UserInfor";
import ManagerLayout from "../Layouts/manager/ManagerLayout";
import ManageEmployee from "../Components/Manager/ManageEmployee/ManageEmployee";
import UserLayout from "../Layouts/UserLayout";

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
        element: <Login/>
      },
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: 'forgetPassword',
        element: <ForgetPassword/>
      },
      {
        path: 'confirmPassword',
        element: <ConfirmPassword/>
      },
    ],
  },
  {
    path: 'user',
    element: <PrivateRoute><UserLayout/></PrivateRoute>,
    children: [
      {
        path: 'profile',
        element: <UserInfor/>
      }
    ]
  },
  { 
    path: 'manager',
    element: <ManagerLayout/>,
    children: [
      {
        path: 'stylish',
        element: <ManageEmployee buttonLabel={"+ New Stylish"}/>
      }
    ]
  },
];
