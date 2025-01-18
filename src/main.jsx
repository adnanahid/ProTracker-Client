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
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>,
          </PrivateRoute>
        ),
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
        path: "/all-asset",
        element: (
          <HRRoute>
            <AssetList></AssetList>,
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
        path: "/my-employee-list",
        element: (
          <HRRoute>
            <MyEmployeeList></MyEmployeeList>,
          </HRRoute>
        ),
      },
      {
        path: "/assetRequests",
        element: (
          <HRRoute>
            <RequestedAssets></RequestedAssets>,
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
      {
        path: "/myRequestedAssetList",
        element: (
          <EmployeeRoutes>
            <MyRequestedAssets></MyRequestedAssets>
          </EmployeeRoutes>
        ),
      },
      {
        path: "/myTeamMembers",
        element: (
          <EmployeeRoutes>
            <MyTeamMembers></MyTeamMembers>
          </EmployeeRoutes>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
    <Toaster></Toaster>
  </React.StrictMode>
);
