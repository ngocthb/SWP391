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
import ManagerStylist from "../Components/Manager/ManagerStylist/ManagerStylist";
import ManagerCustomer from "../Components/Manager/ManagerCustomer/ManagerCustomer";
import ManagerCreateStaff from "../Components/Manager/ManagerCreateStaff/ManagerCreateStaff";

import Services from "../Components/client/Services/Services";
import MyBooking from "../Components/client/MyBooking/MyBooking";
import AdminLayout from "../Layouts/admin/AdminLayout";
import AdminService from "../Components/Admin/AdminService/AdminService";
import AdminCreateService from "../Components/Admin/AdminCreateService/AdminCreateService";
import AdminVoucher from "../Components/Admin/AdminVoucher/AdminVoucher";
import AdminCreateVoucher from "../Components/Admin/AdminCreateVoucher/AdminCreateVoucher";
import ManagerStaff from "../Components/Manager/ManagerStaff/ManagerStaff";
import AdminManager from "../Components/Admin/AdminManager/AdminManager";
import AdminCustomer from "../Components/Admin/AdminCustomer/AdminCustomer";
import ManagerBooking from "../Components/Manager/ManagerBooking/ManagerBooking";
import AdminCreateManager from "../Components/Admin/AdminCreateManager/AdminCreateManager";
import ManagerShift from "../Components/Manager/ManagerShift/ManagerShift";
import ManagerCreateShift from "../Components/Manager/ManagerCreateShift/ManagerCreateShift";
import StylistLayout from "../Layouts/stylist";
import StylistSchedule from "../Components/Stylist/StylistSchedule/StylistSchedule";
import StylistFeedback from "../Components/Stylist/StylistFeedback/StylistFeedback";
import StylistDashboard from "../Components/Stylist/StylistDashboard/StylistDashboard";
import StylistSalary from "../Components/Stylist/StylistSalary/StylistSalary";
import StaffLayout from "../Layouts/staff/StaffLayout";
import StaffPayment from "../Components/Staff/StaffPayment/StaffPayment";
import StaffBooking from "../Components/Staff/StaffBooking/StaffBooking";
import StaffCreateBooking from "../Components/Staff/StaffCreateBooking/StaffCreateBooking";
import StaffBookingService from "../Components/Staff/StaffBookingService/StaffBookingService";
import StaffPaymentConfirm from "../Components/Staff/StaffPaymentConfirm/StaffPaymentConfirm";
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
      // <PrivateRoute requiredRole="CUSTOMER">
      //<UserLayout />
      // </PrivateRoute>
      <UserLayout />
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
    element: (
      /*<PrivateRoute requiredRole="BRANCH_MANAGER">
    <ManagerLayout />
  </PrivateRoute>*/ <ManagerLayout />
    ),
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
        path: "staff",
        element: <ManagerStaff buttonLabel={"+ New staff"} />,
      },
      {
        path: "staff/create",
        element: <ManagerCreateStaff />,
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
        path: "customer",
        element: <ManagerCustomer />,
      },
      {
        path: "staff/create",
        element: <ManagerCreateStaff />,
      },
      {
        path: "shift",
        element: <ManagerShift />,
      },
      {
        path: "shift/create",
        element: <ManagerCreateShift />,
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
  {
    path: "admin",
    element: (
      /*<PrivateRoute requiredRole="ADMIN">
      <AdminLayout />
    </PrivateRoute>*/ <AdminLayout />
    ),
    children: [
      {
        path: "dashboard",
        element: <ManagerDashboard />,
      },
      {
        path: "service",
        element: <AdminService />,
      },
      {
        path: "service/create",
        element: <AdminCreateService />,
      },
      {
        path: "voucher",
        element: <AdminVoucher buttonLabel={"New Voucher"} />,
      },
      {
        path: "voucher/create",
        element: <AdminCreateVoucher />,
      },
      {
        path: "manager",
        element: <AdminManager buttonLabel={"New Manager"} />,
      },
      {
        path: "manager/create",
        element: <AdminCreateManager />,
      },
      {
        path: "customer",
        element: <AdminCustomer buttonLabel={"New Customer"} />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      /*<PrivateRoute requiredRole="ADMIN">
      <AdminLayout />
    </PrivateRoute>*/ <AdminLayout />
    ),
    children: [
      {
        path: "dashboard",
        element: <ManagerDashboard />,
      },
      {
        path: "service",
        element: <AdminService />,
      },
      {
        path: "service/create",
        element: <AdminCreateService />,
      },
      {
        path: "voucher",
        element: <AdminVoucher buttonLabel={"New Voucher"} />,
      },
      {
        path: "voucher/create",
        element: <AdminCreateVoucher />,
      },
      {
        path: "manager",
        element: <AdminManager buttonLabel={"New Manager"} />,
      },
      {
        path: "manager/create",
        element: <AdminCreateManager />,
      },
      {
        path: "customer",
        element: <AdminCustomer buttonLabel={"New Customer"} />,
      },
    ],
  },
  {
    path: "stylist",
    element: (
      /*<PrivateRoute requiredRole="ADMIN">
      <AdminLayout />
    </PrivateRoute>*/ <StylistLayout />
    ),
    children: [
      {
        path: "schedule",
        element: <StylistSchedule />,
      },
      {
        path: "feedback",
        element: <StylistFeedback />,
      },
      {
        path: "dashboard",
        element: <StylistDashboard />,
      },
      {
        path: "salary",
        element: <StylistSalary />,
      },
    ],
    path: "staff",
    element: (
      /*<PrivateRoute requiredRole="ADMIN">
      <AdminLayout />
    </PrivateRoute>*/ <StaffLayout />
    ),
    children: [
      {
        path: "payment/:bookingId",
        element: <StaffPayment />,
      },
      {
        path: "booking",
        element: <StaffBooking buttonLabel={"New Booking"} />,
      },
      {
        path: "booking/create",
        element: <StaffCreateBooking />,
      },
      {
        path: "booking-service",
        element: <StaffBookingService />,
      },
    ],
  },
  {
    path: "payment/confirm",
    element: <StaffPaymentConfirm />,
  },
];
