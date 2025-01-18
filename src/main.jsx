import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ErrorPage from "./Pages/ErrorPage";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/HomePage/Home";
import JoinAsEmployee from "./Pages/JoinAsEmployee";
import AuthProvider from "./Provider/AuthProvider";
import JoinAsHR from "./Pages/JoinAsHR";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Payment from "./Pages/Payment";
import AddAsset from "./Pages/PagesofHR/AddAsset";
import AssetList from "./Pages/PagesofHR/AssetList";
import HRRoute from "./PrivateRoutes/HRRoute";
import AddEmployeeToTeam from "./Pages/PagesofHR/AddEmployeeToTeam";
import MyEmployeeList from "./Pages/PagesofHR/MyEmployeeList";
import EmployeeRoutes from "./PrivateRoutes/EmployeeRoutes";
import RequestForAnAsset from "./Pages/PageforEmployee.jsx/RequestForAnAsset";
import MyRequestedAssets from "./Pages/PageforEmployee.jsx/MyRequestedAssets";
import MyTeamMembers from "./Pages/PageforEmployee.jsx/MyTeamMembers";

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
