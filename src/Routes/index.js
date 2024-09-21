import ConfirmPassword from "../Components/ConfirmPassword/ConfirmPassword";
import ForgetPassword from "../Components/ForgetPassword/ForgetPassword";
import Signin from "../Components/Signin/Signin";
import Signup from "../Components/Signup/Signup";
import UserInfor from "../Components/UserInfor/UserInfor";
import CustomerLayout from "../Layouts/CustomerLayout";
import SigninLayout from "../Layouts/SigninLayout";
import HomePage from "../Pages/HomePage";

export const Routes = [
  {
    path: "/", // Root homepage
    element: <HomePage />,
  },
  {
    path: "/signin", // SigninLayout will handle sub-routes
    element: <SigninLayout />,
    children: [
      {
        path: "", // This is relative, so it refers to '/signin'
        element: <Signin />,
      },
      {
        path: "signup", // This will resolve to '/signin/signup'
        element: <Signup />,
      },
      {
        path: "forgetPassword", // This will resolve to '/signin/forgetPassword'
        element: <ForgetPassword />,
      },
      {
        path: "confirmPassword", // This will resolve to '/signin/confirmPassword'
        element: <ConfirmPassword />,
      },
    ],
  },
  {
    path: "customer",
    element: <CustomerLayout />,
    children: [
      {
        path: "information",
        element: <UserInfor />,
      },
    ],
  },
];
