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
import ManagerDashboard from "../Components/Manager/ManagerDashboard/ManagerDashboard";
import ManagerBooking from "../Components/Manager/ManagerBooking/ManagerBooking";
import ManagerCreateStylish from "../Components/Manager/ManagerCreateStylish/ManagerCreateStylish";
import HomePageLayout from "../Layouts/client/HomePageLayout";
import AboutUsPage from "../Components/client/AboutUsPage/AboutUsPage";
import ManageService from "../Components/Manager/ManageService/ManageService";
import ManagerCreateService from "../Components/Manager/ManagerCreateService/ManagerCreateService";

import BookingLayout from "../Layouts/client/BookingLayout";
import Booking from "../Components/client/Booking/Booking";
import ChooseSalon from "../Components/client/Booking/ChooseSalon/ChooseSalon";
import ChooseService from "../Components/client/Booking/ChooseService/ChooseService";
import ChooseDateTime from "../Components/client/Booking/ChooseDateTime/ChooseDateTime";
import ChooseStylist from "../Components/client/Booking/ChooseStylist/ChooseStylist";
import Contact from "../Components/client/Contact/Contact";

export const Routes = [
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/aboutus",
        element: <AboutUsPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedRoute>
        <SigninLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "confirmPassword",
        element: <ConfirmPassword />,
      },
    ],
  },
  {
    path: "user",
    element: (
      <PrivateRoute>
        <UserLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <UserInfor />,
      },
    ],
  },
  {
    path: "manager",
    element: <ManagerLayout />,
    children: [
      {
        path: "stylish",
        element: <ManageEmployee buttonLabel={"+ New Stylish"} />,
      },
      {
        path: "stylish/create",
        element: <ManagerCreateStylish />,
      },
      {
        path: "dashboard",
        element: <ManagerDashboard />,
      },
      {
        path: "booking",
        element: <ManagerBooking />,
      },
      {
        path: "service",
        element: <ManageService />,
      },
      {
        path: "service/create",
        element: <ManagerCreateService />,
      },
    ],
  },
  {
    path: "booking",
    element: <BookingLayout />,
    children: [
      {
        path: "",
        element: <Booking />,
      },
      {
        path: "step1",
        element: <ChooseSalon />,
      },
      {
        path: "step2",
        element: <ChooseService />,
      },
      {
        path: "step3",
        element: <ChooseStylist />,
      },
      {
        path: "step4",
        element: <ChooseDateTime />,
      },
    ],
  },
];
