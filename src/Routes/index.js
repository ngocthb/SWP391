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
import UserLayout from "../Layouts/UserLayout";
import ManagerDashboard from "../Components/Manager/ManagerDashboard/ManagerDashboard";
import ManagerBooking from "../Components/Manager/ManagerBooking/ManagerBooking";

import HomePageLayout from "../Layouts/client/HomePageLayout";
import AboutUsPage from "../Components/client/AboutUsPage/AboutUsPage";

import BookingLayout from "../Layouts/client/BookingLayout";
import Booking from "../Components/client/Booking/Booking";
import ChooseSalon from "../Components/client/Booking/ChooseSalon/ChooseSalon";
import ChooseService from "../Components/client/Booking/ChooseService/ChooseService";
import ChooseDateTime from "../Components/client/Booking/ChooseDateTime/ChooseDateTime";
import Contact from "../Components/client/Contact/Contact";
import ManagerCreateStylist from "../Components/Manager/ManagerCreateStylist/ManagerCreateStylist";
import ChooseStylist from "../Components/client/Booking/ChooseStylist/ChooseStylist";
import ManagerStaff from "../Components/Manager/ManagerStaff/ManagerStaff";
import ManagerStylist from "../Components/Manager/ManagerStylist/ManagerStylist";
import ManagerService from "../Components/Manager/ManagerService/ManagerService";
import ManagerCustomer from "../Components/Manager/ManagerCustomer/ManagerCustomer";
import ManagerCreateStaff from "../Components/Manager/ManagerCreateStaff/ManagerCreateStaff";

import Services from "../Components/client/Services/Services";
import MyBooking from "../Components/client/MyBooking/MyBooking";
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
        path: "/services",
        element: <Services />,
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
      {
        path: "mybooking",
        element: <MyBooking />,
      },
    ],
  },
  {
    path: "manager",
    element: <ManagerLayout />,
    children: [
      {
        path: "stylist",
        element: <ManagerStylist buttonLabel={"+ New stylist"} />,
      },
      {
        path: "stylist/create",
        element: <ManagerCreateStylist />,
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
        element: <ManagerService/>,
      },
      {
        path: "customer",
        element: <ManagerCustomer/>
      },
      {
        path: "staff/create",
        element: <ManagerCreateStaff/>
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
