import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ErrorPage from "./Pages/CommonPages/ErrorPage";
import Home from "./Pages/CommonPages/Home";
import JoinAsEmployee from "./Pages/PageofGuest/JoinAsEmployee";
import JoinAsHR from "./Pages/PageofGuest/JoinAsHR";
import Payment from "./Pages/PagesofHR/Payment";
import LoginPage from "./Pages/PageofGuest/LoginPage";
import AddAsset from "./Pages/PagesofHR/AddAsset";
import AssetList from "./Pages/PagesofHR/AssetList";
import AddEmployeeToTeam from "./Pages/PagesofHR/AddEmployeeToTeam";
import HRRoute from "./PrivateRoutes/HRRoute";
import MyEmployeeList from "./Pages/PagesofHR/MyEmployeeList";
import EmployeeRoutes from "./PrivateRoutes/EmployeeRoutes";
import RequestForAnAsset from "./Pages/PageforEmployee.jsx/RequestForAnAsset";
import MyRequestedAssets from "./Pages/PageforEmployee.jsx/MyRequestedAssets";
import MyTeamMembers from "./Pages/PageforEmployee.jsx/MyTeamMembers";
import AuthProvider from "./Provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Profile from "./Pages/CommonPages/Profile";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import RequestedAssets from "./Pages/PagesofHR/RequestedAssets";
import IncreaseMemberLimit from "./Pages/PagesofHR/IncreaseMemberLimit";
import { HelmetProvider } from "react-helmet-async";
import PaymentForIncreaseLimit from "./Pages/PagesofHR/PaymentForIncreaseLimit";
import ContactUs from "./Pages/CommonPages/ContactUs";
import Community from "./Pages/CommonPages/Community";
import Dashboard from "./Pages/CommonPages/Dashboard";
import Overview from "./Pages/CommonPages/Overview";

// Initialize QueryClient
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/join-as-employee",
        element: <JoinAsEmployee></JoinAsEmployee>,
      },
      {
        path: "/join-as-hr",
        element: <JoinAsHR></JoinAsHR>,
      },
      {
        path: "/community",
        element: <Community></Community>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },

      //for hr
      {
        path: "/add-asset",
        element: (
          <HRRoute>
            <AddAsset></AddAsset>,
          </HRRoute>
        ),
      },
      {
        path: "/all-employees",
        element: (
          <HRRoute>
            <AddEmployeeToTeam></AddEmployeeToTeam>,
          </HRRoute>
        ),
      },
      {
        path: "/increaseLimit",
        element: (
          <HRRoute>
            <IncreaseMemberLimit></IncreaseMemberLimit>,
          </HRRoute>
        ),
      },
      {
        path: "/paymentForIncreaseLimit",
        element: (
          <HRRoute>
            <PaymentForIncreaseLimit></PaymentForIncreaseLimit>,
          </HRRoute>
        ),
      },

      //for employee
      {
        path: "/request-for-an-assets",
        element: (
          <EmployeeRoutes>
            <RequestForAnAsset></RequestForAnAsset>
          </EmployeeRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Profile></Profile>,
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/overview",
        element: (
          <PrivateRoute>
            <Overview></Overview>,
          </PrivateRoute>
        ),
      },

      //for employee
      {
        path: "/dashboard/myTeamMembers",
        element: (
          <EmployeeRoutes>
            <MyTeamMembers></MyTeamMembers>
          </EmployeeRoutes>
        ),
      },
      {
        path: "/dashboard/myRequestedAssetList",
        element: (
          <EmployeeRoutes>
            <MyRequestedAssets></MyRequestedAssets>
          </EmployeeRoutes>
        ),
      },

      //for hr
      {
        path: "/dashboard/all-asset",
        element: (
          <HRRoute>
            <AssetList></AssetList>,
          </HRRoute>
        ),
      },
      {
        path: "/dashboard/my-employee-list",
        element: (
          <HRRoute>
            <MyEmployeeList></MyEmployeeList>,
          </HRRoute>
        ),
      },
      {
        path: "/dashboard/assetRequests",
        element: (
          <HRRoute>
            <RequestedAssets></RequestedAssets>,
          </HRRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
    <Toaster></Toaster>
  </React.StrictMode>
);
